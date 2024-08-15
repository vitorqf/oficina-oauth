import { prisma } from "@/lib/prisma";
import { setCookie } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";

var jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  const { code } = req.query;
  const githubResponse = await fetch(
    "https://github.com/login/oauth/access_token",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: process.env.GITHUB_ID,
        client_secret: process.env.GITHUB_SECRET,
        code,
      }),
    }
  ).then((res) => res.json());

  if (!githubResponse.access_token) {
    return res.status(400).json({ message: "Invalid or expired code" });
  }

  const user = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${githubResponse.access_token}`,
    },
  }).then((res) => res.json());

  const localUser = await prisma.githubUser.upsert({
    where: { githubId: user.id },
    update: { login: user.login },
    create: {
      githubId: user.id,
      login: user.login,
      name: user.name,
      avatarUrl: user.avatar_url,
      bio: user.bio,
      company: user.company,
      email: user.email,
      location: user.location,
    },
  });

  const accessToken = jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7, // 1 week
    },
    JWT_SECRET
  );

  if (!accessToken) {
    return res.status(500).json({ message: "Failed to generate token" });
  }

  const session = JSON.stringify({
    accessToken,
    user: localUser,
  });

  setCookie("session", encodeURIComponent(session), {
    req,
    res,
    httpOnly: false,
  });
  res.redirect("/");
}
