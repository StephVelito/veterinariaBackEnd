import express from "express";
import { usuarioRouter } from "./router/usuarios.router.js";
import { citasRouter } from "./router/citas.router.js";
import mongoose from "mongoose";
const server = express();

server.use(express.json());
server.use(usuarioRouter);
server.use(citasRouter)  



const puerto = 3000;


server.listen(3000,()=>{
    console.log(`Servidor corriendo correctamente en el puerto ${puerto}`)
    mongoose.set("strictQuery",true);
    mongoose.connect("mongodb://127.0.0.1:27017/veterinaria").then((valor)=>{
        console.log("Se conecto exitosamente a la base de datos")
    }).catch((error)=>{
        console.log("Error al conectarse")
    })
})