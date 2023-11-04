import { Router } from "express";
import { deleteRoom, findRoom } from "../controllers/roomController.js";
const router = new Router();

router.get("/:room", findRoom);
router.delete("/:room", deleteRoom);

export { router };
