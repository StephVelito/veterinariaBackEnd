import {Router} from "express";
import * as citasController from "../controllers/citas.controller.js"
import { validarToken } from "../utils/validador.js";

export const citasRouter = Router();

citasRouter.get(
    "/citas",
    validarToken,
    citasController.devolverCitas,
)