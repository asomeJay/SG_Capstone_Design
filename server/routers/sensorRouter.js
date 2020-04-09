import express from "express";
import { routes } from "../routes.js";
import { sensorGet, sensorPost } from "../controllers/sensorController.js";

const sensorRouter = express.Router();

sensorRouter.get(routes.sensor, sensorGet);
sensorRouter.post(routes.sensor, sensorPost);

export default sensorRouter;
