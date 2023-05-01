import express from "express";
const router = express.Router();
import {
  createAdmin,
  updateAdminMById,
  deleteAdminById,
  getAllAdmin,
  getAdminByParam,
} from "../controllers/admin.js";
router.get("/", getAllAdmin);
router.post("/add", createAdmin);
router.get("/:id", getAdminByParam);
router.put("/:id", updateAdminMById);
router.delete("/:id", deleteAdminById);

export default router;
