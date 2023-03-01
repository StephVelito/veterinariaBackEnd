import { Router } from "express";
import * as petController from "../controllers/pet.controller.js";

export const petRouter = Router();

petRouter
  .route("/pet")
  .get(petController.devolverPet)
  .post(petController.crearPet);

petRouter
  .route("/pet/:id")
  .delete(petController.eliminarPet);
