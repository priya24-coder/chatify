import jwt from "jsonwebtoken";
import { ENV } from "./env.js";

export const generateToken = (userId, res) => {
  const { JWT_SECRET } = ENV;
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured");
  }

  // Create a token
  const token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: "7d",
  });

  // Set the token as an HTTP-only cookie
  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true, // Prevent XSS attacks
    sameSite: "strict", // Corrected key: "sameSite" not "sameSites"
    secure: NODE_ENV === "development" ? false : true,
  });

  return token;
};



//http://localhost - Local 
//https://dsmalml.com - Production