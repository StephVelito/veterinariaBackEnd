import mongoose from "mongoose";

export const petSchema = new mongoose.Schema(
  {
    petname: {
      type: mongoose.Schema.Types.String,
      required: true,
      maxLength: 50,
    },
    petage: {
      type: mongoose.Schema.Types.String,
      required: true,
      maxLength: 50,
    },
    raza: {
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
      type: [mongoose.Schema.Types.ObjectId]
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

export const PetModel = mongoose.model("pet", petSchema);
