import { Router } from "express";
import { deleteRoom, findRoomMembers } from "../controllers/roomController.js";
// import { verifyJWT } from "../middleware/verifyJWT.js";

const router = new Router();

router.get("/:room", findRoomMembers);
router.post("/", deleteRoom);

export { router };
