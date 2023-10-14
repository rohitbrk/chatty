import { Router } from "express";
import { deleteRoom, findRoom } from "../controllers/roomController.js";
const router = new Router();

router.get("/:room", async (req, res) => {
  const foundRoom = await findRoom(req.params.room);
  res.json(foundRoom);
});

router.delete("/:room", async (req, res) => {
  const roomDeleted = await deleteRoom(req.params.room);
  res.json(roomDeleted);
});

export { router };
