import { PetModel } from "../models/pet.models.js";
import { UsuarioModel } from "../models/usuarios.models.js"; 


export const devolverPet = async (req, res) => {
  console.log (req.user.nombre);
  const re = await PetModel.find( {"usuario" : req.user._id} );
 
  return res.json({
    content: re
  });
};

export const crearPet = async (req, res) => {
  const data = req.body;
  

  const pet_creada = await PetModel.create({
    ...data,
    
  });

  return res.json({
    message: "Mascota creada exitosamente",
    content: pet_creada,
  });
};

export const devolverPetPorId = async (req,res)=> {
  const {id} = req.params;
  try {
      const PetEncontrado = await PetModel.findById(
        id
      )
      if (!PetEncontrado){
        return res.status(400).json({
          message:"No se encontro la mascota",
        })
      }

      return res.json({
        mesagge:PetEncontrado,
      })

  } catch (error) {
    return res.json({
      mesagge:"Error al obtener mascota",
    })
  }
}

export const eliminarPet = async ( req , res ) => {
    const {id} = req.params;
    try {
        const resultado = await PetModel.deleteOne(
            {
                _id : id ,
                pet : req.citas._id,
            }
        )
        if(resultado.deletedCount === 0){
            return res.json({
                message:"Mascota no existe",
            })
        }
        else { return res.json({
            message:"Mascota eliminada exitosamente",
            content:resultado,
        })} 
    } catch (error) {
        return res.status(400).json({
            message:"Error al eliminar mascota",
        })
    }
}