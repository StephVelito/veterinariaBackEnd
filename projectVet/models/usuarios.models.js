import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const usuarioSchema = new mongoose.Schema(
  {
    nombre: {
      type: mongoose.Schema.Types.String,
      required: true,
      maxLength: 100,
    },
    apellido: {
      type: mongoose.Schema.Types.String,
      required: true,
      maxLength: 100,
    },
    correo: {
      type: mongoose.Schema.Types.String,
      required: true,
      index: true,
      unique: true,
    },
    password: {
      type: mongoose.Schema.Types.String,
      required: true,
      set: (valor) => {
        const passwordHashed = bcrypt.hashSync(valor, 10);
        return passwordHashed;
      },
    },

    petName: {
      type: mongoose.Schema.Types.String,
      required: true,
      mexLength: 50,
    },
    petAge: {
      type: mongoose.Schema.Types.String,
      required: true,
      maxLength: 50,
    },
    pet: {
      type: mongoose.Schema.Types.String,
      required: true,
      maxLength: 50,
    },
    distrito: {
      type: mongoose.Schema.Types.String,
      required: true,
      maxLength: 50,
    },
    citas: {
      type: [mongoose.Schema.Types.ObjectId],
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);

export const UsuarioModel = mongoose.model("usuarios", usuarioSchema);