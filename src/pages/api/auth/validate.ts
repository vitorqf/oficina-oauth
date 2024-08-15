import { NextApiRequest, NextApiResponse } from "next";
var jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

export default function POST(req: NextApiRequest, res: NextApiResponse) {
  const { token } = req.body;

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.json({ message: "Invalid token", error: err.message });
    }

    return res.json({ message: "Valid token" });
  });

  return res.json({ message: "Invalid token" });
}
