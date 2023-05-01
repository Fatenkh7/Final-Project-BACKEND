import adminModel from "../models/Admin.js";
import bcrypt from "bcryptjs";
import salt from "salt";
/**
 * @description get all admins
 * @param {object} req
 */
export async function getAll(req, res, next) {
  try {
    const response = await adminModel.find({});
    return res.status(200).send({ success: true, response });
  } catch (err) {
    return next(err);
  }
}

/**
 * @description get admin by id
 * @param {object} req
 */
export async function getById(req, res, next) {
  try {
    const { id } = req.params;
    const admin = await adminModel.findById(id);
    if (!admin) {
      return res
        .status(404)
        .send({ success: false, message: "Admin not found" });
    }
    res.status(200).send({ success: true, admin });
  } catch (error) {
    next(error);
  }
}
/**
 * @description add a new admin
 * @param {object} req
 */
const saltRounds = 10; 
export async function addAdmin(req, res, next) {
  try {
    const { firstName, lastName, email, password, phone } =
      req.body;

    const salt = await bcrypt.genSalt(saltRounds); // Generate the salt value
    const hashedPassword = await bcrypt.hash(password, salt); // Hash the password with the salt

    const admin = new adminModel({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await admin.save();

    res.status(201).json({ message: "Admin created successfully", admin });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

/**
 * @description update admin by id
 * @param {object} req
 */
export async function editAdminById(req, res) {
  try {
    let filter = { _id: req.params.id };
    let update = req.body;

    const salt = await bcrypt.genSaltSync(10);
    const hash = await bcrypt.hashSync(req.body.password, salt);
    update.password = hash;
    const updateAdmin = await adminModel.findOneAndUpdate(filter, update, {
      //for save it in the database
      new: true,
    });
    res.status(200).json({ message: "Update successfully", data: updateAdmin });
  } catch (err) {
    res.status(404).json({ message: err });
  }
}
/**
 * @description delete admin by id
 * @param {object} req
 */
export async function deleteaAminById(req, res, next) {
  try {
    const removeAdmin = await adminModel.findOneAndDelete({
      _id: req.params.id,
    });
    res
      .status(200)
      .json({ data: removeAdmin, message: "This admin has been deleted" });
  } catch (err) {
    res.status(404).json({ message: err });
  }
}

const controller = { addAdmin, getAll, deleteaAminById, getById, editAdminById };
export default controller;
