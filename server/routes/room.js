import { Router } from "express";
import { deleteRoom } from "../controllers/roomController.js";
import { verifyJWT } from "../middleware/verifyJWT.js";
const router = new Router();

router.delete("/:room", deleteRoom);

export { router };
