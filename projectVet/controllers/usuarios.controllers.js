import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UsuarioModel } from "../models/usuarios.models.js";
const usuarios = [];

export const devolverUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const usuariosEncontrados = await UsuarioModel.find();
    return res.json({
      content: usuariosEncontrados,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error al obtener los usuarios",
    });
  }
};

export const devolverUsuarioPorId = async (req,res)=> {
  const {id} = req.params;
  try {
      const usuarioEncontrado = await UsuarioModel.findById(
 id
      )
      if (!usuarioEncontrado){
        return res.status(400).json({
          message:"El usuario no se encontro",
        })
      }

      return res.json({
        mesagge:usuarioEncontrado,
      })

  } catch (error) {
    return res.json({
      mesagge:"Error al obtener usuario",
    })
  }
}

export const registroUsuario = async (req, res) => {
  const data = req.body;
  try {
    const nuevoUsuario = await UsuarioModel.create(data);

    return res
      .json({
        mesagge: "Usuario registrado exitosamente",
        content: nuevoUsuario.toJSON(),
      })
      .status(201);
  } catch (error) {
    if (error.name === "MongoServerError" && error.code === 11000) {
      return res.json({
        mesagge: "El usuario ya esiste",
      });
    }
    return res
      .json({
        mesagge: "Error al crear usuario",
      })
      .status(400);
  }
};

export const login = async (req, res) => {
  const data = req.body;

  const usuarioEncontrado = await UsuarioModel.findOne({ correo: data.correo });

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

    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });

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

export const actualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const usuario = await UsuarioModel.findOne({
      _id: id,
    });

    if (!usuario) {
      return res.status(404).json({
        message: "No existe usuario",
      });
    }

    const usuario_actualizado = await UsuarioModel.findOneAndUpdate(
      { _id: usuario._id },
      data,
      { new: true }
    );

    return res.json({
      message: "Usuario actualizado exitosamente",
      content: usuario_actualizado,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error al actualizar",
    });
  }
};

export const eliminarUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const resultado = await UsuarioModel.deleteOne({
      _id: id,
    });
    if (resultado.deletedCount === 0) {
      return res.json({
        message: "Usuario no existe",
      });
    } else {
      return res.json({
        message: "Usuario eliminada exitosamente",
        content: resultado,
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: "Error al eliminar usuario",
    });
  }
};