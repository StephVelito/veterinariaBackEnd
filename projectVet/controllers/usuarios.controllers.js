import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UsuarioModel } from "../models/usuarios.models.js";
const usuarios = [];

export const registroUsuario = async (req, res) => {
  const data = req.body;
  try{
  const nuevoUsuario = await UsuarioModel.create(data);

  return res
    .json({
      mesagge: "Usuario registrado exitosamente",
      content: nuevoUsuario.toJSON(),
    })
    .status(201);
}catch(error){
  if(error.name==="MongoServerError" && error.code===11000){
    return res.json({
      mesagge : "El usuario ya esiste",
    })
  }
  return res.json({
    mesagge:"Error al crear usuario",
  }).status(400);
}
};

export const login = async (req, res) => {
  const data = req.body;

const usuarioEncontrado = await UsuarioModel.findOne({correo: data.correo});


  if (!usuarioEncontrado) {
    return res.status(404).json({
      message: "Usuario no existe",
    });
  }


  const resultado = bcrypt.compareSync(
    data.password,
    usuarioEncontrado.password
  );

  if (resultado) {

    const payload = {
      correo: usuarioEncontrado.correo,
      mensaje: "Hola",
    };

    const token = jwt.sign(payload,"ultramegasecreto", { expiresIn: "1h" });

    return res.json({
      mesagge: "Bienvenido",
      content: token,
    });

  } else {
    return res.status(403).json({
      message: "Usuario no existe",
    });
  }

};
