const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  const authHeader = req.get("authorization");
  if (!authHeader) {
    res.status(401).send("No hay token");
  }
  const token = authHeader.split(" ")[1];
  let revisaToken;
  try {
    revisaToken = jwt.verify(token, "super_secreta");
  } catch (error) {
    res.status(401).send("token invalido");
  }

  if (!revisaToken) {
    res.status(402).send("No autenticado");
  }
  next();
};
