import { authenticateUser } from "../services/auth.service.js";
import { COOKIE_OPTIONS } from "../helpers/jwt.js";

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await authenticateUser(username, password);

    if (result.error) {
      const status =
        result.error === "username and password are required" ? 400 : 401;
      return res.status(status).json({ message: result.error });
    }

    res.cookie("token", result.token, COOKIE_OPTIONS);
    res.status(200).json({ message: "login success" });
  } catch (error) {
    console.error("Error en login:", error.message);
    res.status(500).json({ message: "internal server error" });
  }
};

export const logout = (_req, res) => {
  res.clearCookie("token", COOKIE_OPTIONS);
  res.status(200).json({ message: "logout success" });
};
