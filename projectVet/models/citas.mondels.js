import mongoose from "mongoose";

export const citasSchema = new mongoose.Schema(
  {
    name: {
      type: mongoose.Schema.Types.String,
      required: true,
      maxLength: 100,
    },
    email: {
      type: mongoose.Schema.Types.String,
      required: true,
      maxLength: 100,
    },
    fecha: {
      type: mongoose.Schema.Types.String,
      required: true,
      maxLength: 50,
    },
    hora: {
      type: mongoose.Schema.Types.String,
      required: true,
      maxLength: 50,
      validate: {
        validator: (valor) => {
          return /([0-2][0-9]:[0-5][0:9])/.test(valor);
        },
        message: "El formato valido es 00:00 hasta 23:59",
      },
    },
    petname: {
      type: mongoose.Schema.Types.String,
      required: true,
      maxLength: 50,
    },
    petplace: {
      type: mongoose.Schema.Types.String,
      required: true,
      maxLength: 50,
    },
    especialidad: {
      type: mongoose.Schema.Types.String,
      required: true,
      maxLength: 50,
    },
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timeslaps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);

export const citasModel = mongoose.model("citas", citasSchema);
