import { Router } from "express";
import { deleteRoom, findRoomMembers } from "../controllers/roomController.js";
import { verifyJWT } from "../middleware/jwt.js";

const router = new Router();

router.get("/:room", verifyJWT, findRoomMembers);
router.delete("/", verifyJWT, deleteRoom);

export { router };
