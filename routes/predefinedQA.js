import express from 'express';
const router = express.Router();
import { addPreQA, getAll, deletePreQAById, getById, editPreQAById } from '../controllers/predefinedQA.js';
router.get("/", getAll);
router.post("/add", addPreQA);
router.get("/:id", getById);
router.put("/:id", editPreQAById);
router.delete("/:id", deletePreQAById);

export default router;
