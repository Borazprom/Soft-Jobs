const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

module.exports = () => {
  router.get("/", (req, res) => {
    res.send("Bienvenido");
  });

  router.get("/obtener_usuarios", userController.obtenerUsuarios);
  router.post("/crear_usuarios", userController.crearUsuarios);
  return router;
};
