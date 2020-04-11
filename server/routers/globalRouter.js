import express from "express";
import routes from "../routes.js";
import { sensorGet, sensorPost } from "../controllers/sensorController.js";
import { graphGet } from "../controllers/mysqlController.js";

const globalRouter = express.Router();

globalRouter.get(routes.home, () => console.log("hi"));
globalRouter.post(routes.home,() => console.log('hi mr'));

globalRouter.get(routes.mask, ()=>console.log("mask GET") );
globalRouter.post(routes.mask, ()=> console.log("mask POST"));

globalRouter.get(routes.mysql, graphGet);
globalRouter.post(routes.mysql, ()=>console.log("graph Post"));

globalRouter.get(routes.sensor, sensorGet);
globalRouter.post(routes.sensor, sensorPost);

export default globalRouter;