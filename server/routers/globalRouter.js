import express from "express";
import routes from "../routes.js";
import { sensorGet, sensorPost } from "../controllers/sensorController.js";

const globalRouter = express.Router();

globalRouter.get(routes.home, () => console.log("hi"));
globalRouter.post(routes.home,() => console.log('hi mr'));

globalRouter.get(routes.mask );
globalRouter.post(routes.mask);

globalRouter.get(routes.mysql);
globalRouter.post(routes.mysql);

globalRouter.get(routes.sensor, sensorGet);
globalRouter.post(routes.sensor, sensorPost);

export default globalRouter;