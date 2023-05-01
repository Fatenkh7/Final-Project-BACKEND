import adminModel from "../models/Admin.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();
/**
 * @description admin sign up
 * @param {Object} req.body
 */
const createAdmin = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    let newAdmin;
    if (req.body.password) {
      let hashed = await bcrypt.hashSync(req.body.password, 10);
      newAdmin = new adminModel({
        firstName,
        lastName,
        email,
        password:hashedPassword,
      });
    } else {
      newAdmin = new adminModel({
        firstName,
        lastName,
        email,
        password:hashedPassword,
      });
    }
    await newAdmin.save();
    res
      .status(201)
      .send({ success: true, message: "Admin added successfully" });
  } catch (error) {
    console.log(error);
    res.status(410).send({
      error: true,
      message: "There is a problem with Saving the data",
      data: error,
    });
  }
};

/**
 * @description update admin information by id
 * @param {String} req.params.id
 * @param {Object} req.body
 */
const updateAdminMById = async (req, res) => {
  try {
    let updatedAdmin = await adminModel.updateOne(
      { _id: req.params.id },
      { $set: req.body },
      {
        runValidators: true,
      }
    );
    res.status(200).send({ success: true, message: "Admin data updated" });
  } catch (error) {
    res.status(412).send({
      error: true,
      message: "There was a problem updating the data",
      data: error,
    });
  }
};

/**
 * @description delete admin by id
 * @param {String} req.params.id
 */
const deleteAdminById = async (req, res) => {
  try {
    await adminModel.findByIdAndDelete({ _id: req.params.id }).then(
      function (response) {
        res
          .status(200)
          .send({ success: true, message: "Admin deleted successfully" });
      },
      function (reject) {
        res.status(412).send({
          error: true,
          message: "There was a problem deleting this admin",
          data: reject,
        });
      }
    );
  } catch (error) {
    res.status(412).send({
      error: true,
      message: "There was a problem delete the admin",
      data: error,
    });
  }
};

/**
 * @description get all adminModels
 */
const getAllAdmin = async (req, res) => {
  try {
    await adminModel.find({}).then(
      function (response) {
        res.status(200).send({
          success: true,
          message: "Admin data retrieved Successfully",
          data: response,
        });
      },
      function (reject) {
        res.status(412).send({
          error: true,
          message: "There was a problem getting the adminModels data",
          data: reject,
        });
      }
    );
  } catch (error) {
    res.status(412).send({
      error: true,
      message: "There was a problem getting the adminModels data",
      data: error,
    });
  }
};
/**
 * @description get one adminModel by id
 * @param {string} req.params.id
 */
const getAdminByParam = async (req, res) => {
  try {
    adminModel.find({ _id: req.params.id }).then(
      function (response) {
        res.status(200).send({
          success: true,
          message: "Admin data retrieved Successfully",
          data: response,
        });
      },
      function (reject) {
        res.status(412).send({
          error: true,
          message: "There was a problem getting the adminModel data",
          data: reject,
        });
      }
    );
  } catch (error) {
    res.status(412).send({
      error: true,
      message: "There was a problem getting the adminModels data",
    });
  }
};
export default {
    createAdmin,
    updateAdminMById,
    deleteAdminById,
    getAllAdmin,
    getAdminByParam,
};
