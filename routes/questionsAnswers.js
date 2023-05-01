import express from 'express';
const router = express.Router();
import { addQA, getAll, deleteQAById, getById, editQAById } from '../controllers/questionsAnswers.js';
router.get("/", getAll);
router.post("/add", addQA);
router.get("/:id", getById);
router.put("/:id", editQAById);
router.delete("/:id", deleteQAById);

export default router;
