import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET;
const TOKEN_EXPIRY = "24h";

export const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "strict",
  maxAge: 24 * 60 * 60 * 1000, // 24 horas en ms
  path: "/",
};

export const signToken = (payload) => {
  return jwt.sign(payload, SECRET, { expiresIn: TOKEN_EXPIRY });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET);
  } catch {
    return null;
  }
};
