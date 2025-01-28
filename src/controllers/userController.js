const { obtenerTodos, crearUsuario } = require("../modules/usuarios");
const bcrypt = require("bcrypt");
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

module.exports = { obtenerUsuarios, crearUsuarios };
