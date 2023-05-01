import PreQAModel from "../models/PredefinedQA.js";

/**
 * @description get all pre-data (questions & answers)
 * @param {object} req
 */
export async function getAll(req, res, next) {
  try {
    const response = await PreQAModel.find({});
    return res.status(200).send({ success: true, response });
  } catch (err) {
    return next(err);
  }
}

/**
 * @description get pre-data (questions & answers) by id
 * @param {object} req
 */
export async function getById(req, res, next) {
  try {
    const { id } = req.params;
    const PreQA = await PreQAModel.findById(id);
    if (!PreQA) {
      return res
        .status(404)
        .send({ success: false, message: "This pre-data is not found" });
    }
    res.status(200).send({ success: true, PreQA });
  } catch (error) {
    next(error);
  }
}
/**
 * @description add a new pre-data (questions & answers)
 * @param {object} req
 */
export async function addPreQA(req, res, next) {
  try {
    const {question, answer, idAdmin } = req.body;
    const PreQA = new PreQAModel({question, answer, idAdmin
    });

    await PreQA.save();

    res.status(201).json({ message: "This pre-data created successfully", PreQA });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
/**
 * @description update pre-data (questions & answers) by id
 * @param {object} req
 */
export async function editPreQAById(req, res) {
  try {
    let filter = { _id: req.params.id };
    let update = req.body;

    const updateQA = await PreQAModel.findOneAndUpdate(filter, update, {
      //for save it in the database
      new: true,
    });
    res.status(200).json({ message: "Update successfully", data: updateQA });
  } catch (err) {
    res.status(404).json({ message: err });
  }
}
/**
 * @description delete the pre-data (questions & answers) by id
 * @param {object} req
 */
export async function deletePreQAById(req, res, next) {
  try {
    const removeQA = await PreQAModel.findOneAndDelete({
      _id: req.params.id,
    });
    res
      .status(200)
      .json({
        data: removeQA,
        message: "This pre-data has been deleted",
      });
  } catch (err) {
    res.status(404).json({ message: err });
  }
}

const controller = { addPreQA, getAll, deletePreQAById, getById, editPreQAById };
export default controller;
