export const login = async (req, res) => {
  const { username, password } = req.body;

  // Verificar que username y password estén presentes
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "username and password are required" });
  }

  // Verificar que el usuario sea admin
  if (username !== "admin") {
    return res.status(401).json({ message: "unauthorized" });
  }

  // Si el usuario es admin puede continuar
  res.status(200).json({ message: "login success" });
};
