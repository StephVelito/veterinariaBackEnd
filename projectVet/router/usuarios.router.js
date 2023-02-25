import {Router} from "express"
import * as usuarioController from "../controllers/usuarios.controllers.js"


export const usuarioRouter = Router();

//Creamos la constrante usuarioRouter para poder acceder a todo los metodos de la interfaz Router()
//Router.post('/registrio'),usuarioController.registroUsuario)
usuarioRouter.post('/registro',usuarioController.registroUsuario)
usuarioRouter.post('/login',usuarioController.login)

usuarioRouter
.get("/usuarios",usuarioController.devolverUsuario)
usuarioRouter
.route("/usuarios/:id")
.get(usuarioController.devolverUsuarioPorId)
.put(usuarioController.actualizarUsuario)
.delete(usuarioController.eliminarUsuario)