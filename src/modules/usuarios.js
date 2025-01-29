const { pool } = require("../config/db");

const obtenerTodos = async () => {
  try {
    const result = await pool.query("SELECT * FROM usuarios");
    return result.rows;
  } catch (error) {
    throw new Error("Error al obtener los usuarios");
  }
};

const crearUsuario = async (email, password, rol, lenguaje) => {
  try {
    const SQLQuery =
      "INSERT INTO usuarios(email,password,rol,lenguaje) VALUES ($1,$2,$3,$4)";
    const SQLValues = [email, password, rol, lenguaje];
    const result = await pool.query(SQLQuery, SQLValues);
    return result.rows[0];
  } catch (error) {
    throw new Error("Error al crear el usuario");
  }
};

const usuarioEmail = async (email) => {
  try {
    const SQLQuery = "SELECT * FROM usuarios WHERE email = $1";
    const SQLValues = [email];
    const result = await pool.query(SQLQuery, SQLValues);
    return result.rows[0];
  } catch (error) {
    throw new Error("Error no registrado");
  }
};

const eliminarUsuario = async (id) => {
  try {
    const SQLQuery = "DELETE * FROM usuarios WHERE id = $1";
    const SQLValues = [id];
    const result = await pool.query(SQLQuery, SQLValues);
    return result.rows[0];
  } catch (error) {
    throw new Error("No se pudo eliminar el usuario");
  }
};
module.exports = { obtenerTodos, crearUsuario, usuarioEmail, eliminarUsuario };
