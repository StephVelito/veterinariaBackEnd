import { Router } from "express";
import * as citasController from "../controllers/citas.controller.js";

export const citasRouter = Router();

citasRouter
  .route("/citas")
  .get(citasController.devolverCitas)
  .post(citasController.crearCitas);

citasRouter
  .route("/citas/:id")
  .put(citasController.actualizarCitas)
  .delete(citasController.eliminarCitas);
