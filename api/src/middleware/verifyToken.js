const firebaseAdmin = require("firebase-admin");

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Token no proporcionado o inválido" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verificamos el token con Firebase Admin SDK
    const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);
    req.user = decodedToken; // Lo agregamos a la solicitud
    next(); // Continuamos con la siguiente función de middleware
  } catch (error) {
    console.error("Error al verificar el token:", error);
    return res.status(403).json({ message: "Token inválido o expirado" });
  }
};

module.exports = { verifyToken };
