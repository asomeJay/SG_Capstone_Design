import express from "express";
import {routes} from "../routes.js";

const maskRouter = express.Router();

maskRouter.get(routes.mask);
maskRouter.post(routes.mask);

export default maskRouter;