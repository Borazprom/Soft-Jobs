const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../midlewares/auth");

module.exports = () => {
  router.get("/", (req, res) => {
    res.send("Bienvenido");
  });

  router.get("/usuarios", auth, userController.obtenerUsuarios);
  router.post("/usuarios", auth, userController.crearUsuarios);
  router.post("/login", userController.autenticarUsuario);
  router.delete("/eliminar_usuario:id", auth, userController.eliminarUsuarios);
  return router;
};
