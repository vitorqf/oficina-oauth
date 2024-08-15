import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { redirect_uri } = req.query;

  const clientId = process.env.GITHUB_ID;
  const scope = "user"; // Adjust scopes as needed

  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirect_uri}&scope=${scope}`
  );
}
