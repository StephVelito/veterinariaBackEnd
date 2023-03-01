import express from "express";
import { usuarioRouter } from "./router/usuarios.router.js";
import { citasRouter } from "./router/citas.router.js";
import { petRouter } from "./router/pet.router.js";
import mongoose from "mongoose";
import { validarToken } from "./utils/validador.js";
const server = express();

server.use(express.json());

server.all("/citas",validarToken)
server.all("/citas/:id",validarToken)
server.all("/usuarios",validarToken)
server.all("/usuarios/:id",validarToken)
server.all("/pet",validarToken)
server.all("/pet/:id",validarToken)

server.use(usuarioRouter);
server.use(citasRouter);
server.use(petRouter);  


const puerto = process.env.PORT ?? 3000;


server.listen(3000,()=>{
    console.log(`Servidor corriendo correctamente en el puerto ${puerto}`)
    mongoose.set("strictQuery",true);
    mongoose.connect(process.env.MONGO_URL).then((valor)=>{
        console.log("Se conecto exitosamente a la base de datos")
    }).catch((error)=>{
        console.log("Error al conectarse")
    })
})