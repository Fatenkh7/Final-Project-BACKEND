import express from "express";
const router = express.Router();
import {
  addAdmin,
  getAll,
  deleteaAminById,
  getById,
  editAdminById,
} from "../controllers/admin.js";
router.get("/", getAll);
router.post("/add", addAdmin);
router.get("/:id", getById);
router.put("/:id", editAdminById);
router.delete("/:id", deleteaAminById);

export default router;
