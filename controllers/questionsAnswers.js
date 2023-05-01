import QAModel from "../models/QuestionsAnswers.js";

/**
 * @description get all questions & answers
 * @param {object} req
 */
export async function getAll(req, res, next) {
  try {
    const response = await QAModel.find({});
    return res.status(200).send({ success: true, response });
  } catch (err) {
    return next(err);
  }
}

/**
 * @description get questions & answers by id
 * @param {object} req
 */
export async function getById(req, res, next) {
  try {
    const { id } = req.params;
    const QA = await QAModel.findById(id);
    if (!QA) {
      return res
        .status(404)
        .send({
          success: false,
          message: "The question or this answer are not found",
        });
    }
    res.status(200).send({ success: true, QA });
  } catch (error) {
    next(error);
  }
}
/**
 * @description add a new question & answer
 * @param {object} req
 */
export async function addQA(req, res, next) {
  try {
    const { type, question, answer, approved, idUser } = req.body;
    const QA = new QAModel({
      type,
      question,
      answer,
      approved,
      idUser,
    });

    await QA.save();

    res.status(201).json({ message: "The QA created successfully", QA });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
/**
 * @description update questions & answers by id
 * @param {object} req
 */
export async function editQAById(req, res) {
  try {
    let filter = { _id: req.params.id };
    let update = req.body;

    const updateQA = await QAModel.findOneAndUpdate(filter, update, {
      //for save it in the database
      new: true,
    });
    res.status(200).json({ message: "Update successfully", data: updateQA });
  } catch (err) {
    res.status(404).json({ message: err });
  }
}
/**
 * @description delete questions & answers by id
 * @param {object} req
 */
export async function deleteQAById(req, res, next) {
  try {
    const removeQA = await QAModel.findOneAndDelete({
      _id: req.params.id,
    });
    res
      .status(200)
      .json({
        data: removeQA,
        message: "This question and this answer has been deleted",
      });
  } catch (err) {
    res.status(404).json({ message: err });
  }
}

const controller = { addQA, getAll, deleteQAById, getById, editQAById };
export default controller;
