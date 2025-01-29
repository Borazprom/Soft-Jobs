const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../midlewares/auth");

module.exports = () => {
  router.get("/", (req, res) => {
    res.send("Bienvenido");
  });

  router.get("/obtener_usuarios", auth, userController.obtenerUsuarios);
  router.post("/crear_usuarios", auth, userController.crearUsuarios);
  router.post("/iniciar_sesion", userController.autenticarUsuario);
  router.delete("/eliminar_usuario:id", auth, userController.eliminarUsuarios);
  return router;
};
