const {
  obtenerTodos,
  crearUsuario,
  usuarioEmail,
  eliminarUsuario,
} = require("../modules/usuarios");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await obtenerTodos();
    res.status(200).send(usuarios);
  } catch (error) {
    res.status(500).send("No se pudieron obtener los usuarios");
  }
};

const crearUsuarios = async (req, res) => {
  try {
    // console.log(req.body);
    let { email, password, rol, lenguaje } = req.body;
    password = await bcrypt.hash(password, 12);
    await crearUsuario(email, password, rol, lenguaje);
    res.status(201).send("Usuario creado con exito");
  } catch (error) {
    res.status(500).send("No se pudo crear el usuario");
  }
};

const autenticarUsuario = async (req, res) => {
  try {
    const { email, password } = req.body;
    const usuario = await usuarioEmail(email);
    if (!usuario) {
      res.status(401).json({ message: "Usuario no registrado" });
    } else {
      if (!bcrypt.compareSync(password, usuario.password)) {
        res.status(401).json({ message: "Contraseña invalida" });
      } else {
        const token = jwt.sing(
          {
            email: usuario.email,
            id: usuario.id,
          },
          process.env.JWT_KEY
        );
        return res.status(200).json({
          message: "Usuario idenificado con éxito",
          token,
          usuario: { id: usuario.id, email: usuario.email },
        });
      }
    }
  } catch (error) {
    res.status(500).send("Error de autenticación");
  }
};

const eliminarUsuarios = async (re, res) => {
  try {
    await eliminarUsuario(req.params.id);
    res.status(200).send("Usuario eliminado");
  } catch (error) {
    res.status(500).send("No se pudo eliminar");
  }
};

module.exports = {
  obtenerUsuarios,
  crearUsuarios,
  autenticarUsuario,
  eliminarUsuarios,
};
