import jwt from "jsonwebtoken";
import {UsuarioModel} from  "../models/usuarios.models.js"

export const validarToken = async( req, res , next ) => {
    
    console.log(req.headers.authorization)
    if(!req.headers.authorization){
        
        return res.status(401).json({
            message:"Se necesita una token para realizar esta petición",
        })
    }

    const token = req.headers.authorization.split(" ")[1];

    if (!token){
        return res.status(401).json({
            message:"Formato de token invalidor, formato requerido : BEAR <TOKEN>"
        })
    }


    try {
        const payload = jwt.verify(token,process.env.JWT_SECRET_KEY);
        const usuario = await UsuarioModel.findOne({correo:payload.correo});
        console.log(payload.correo)
        console.log(usuario)
        if(!usuario) {
            return res.json({
                message:"El usuario no tiene permisos",
            })
        }
        req.user = usuario ; 
        next();
    } catch (error) {   
            return res.status(401).json({
                message:"Error en la token",
                content:error.message
            })
    }

}