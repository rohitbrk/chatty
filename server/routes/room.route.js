import { Router } from "express";
import {
  deleteRoom,
  findRoomMembers,
  getSuggestions,
} from "../controllers/room.controller.js";
import { verifyJWT } from "../middleware/jwt.js";

const router = new Router();

router.get("/", getSuggestions);
router.get("/:room", verifyJWT, findRoomMembers);
router.delete("/", verifyJWT, deleteRoom);

export { router };
