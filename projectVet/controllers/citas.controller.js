import { citasModel } from "../models/citas.mondels.js";
import { UsuarioModel } from "../models/usuarios.models.js";
import { PetModel } from "../models/pet.models.js";

export const devolverCitas = async (req, res) => {
  const respuestaPromesas = req.user.citas.map(async (citaId) => {
    const citaEncontrada = await citasModel.findById(citaId);
    return citaEncontrada;
  });

  const resultado = await Promise.all(respuestaPromesas);

  return res.json({
    content: resultado,
  });
};

export const crearCitas = async (req, res) => {
  console.log (req.body);
  const data = req.body;
  const idUsuario = req.user._id;
  const idPet = req.body.pet;


  const cita_creada = await citasModel.create({
    ...data,
    usuario: idUsuario,
  });

  const usuario_encontrado = await UsuarioModel.findById(idUsuario);
  usuario_encontrado.citas.push(cita_creada._id);
  await usuario_encontrado.save();

  const pet_encontrado = await PetModel.findById(idPet);
  pet_encontrado.citas.push(cita_creada._id);
  await pet_encontrado.save();

  return res.json({
    message: "Cita creada exitosamente",
    content: cita_creada,
  });
};

export const actualizarCitas = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  console.log(id);

  try {
    const cita = await citasModel.findOne({
      _id: id,
      usuario: req.user._id,
    });

    if (!cita) {
      return res.status(404).json({
        message: "No existe la cita",
      });
    }

    const cita_actualizada = await citasModel.findOneAndUpdate(
      { _id: cita._id },
      data,
      { new: true }
    );

    console.log(cita);
    return res.json({
      message: "Cita actualizada exitosamente",
      content: cita_actualizada,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error al actualizar",
    });
  }
};


export const eliminarCitas = async ( req , res ) => {
    const {id} = req.params;
    try {
        const resultado = await citasModel.deleteOne(
            {
                _id : id ,
                usuario : req.user._id,
            }
        )
        if(resultado.deletedCount === 0){
            return res.json({
                message:"Cita no existe",
            })
        }
        else { return res.json({
            message:"Cita eliminada exitosamente",
            content:resultado,
        })} 
    } catch (error) {
        return res.status(400).json({
            message:"Error al eliminar la cita",
        })
    }
}