const db = require("../models/index");
const Users = db.users;
const UserInfo = db.user_info;
const Op = db.Sequelize.Op;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { where } = require("sequelize");
const cloudinary = require("cloudinary").v2;
const bodyParser = require("body-parser");
cloudinary.config({
  cloud_name: "dvly2e0ir",
  api_key: "337169325583842",
  api_secret: "KjD3gGWrAFfBm9j0eypQCTLswxw",
});

const userController = {
  // user basic login logout register
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const users = await Users.findAll({
        where: {
          email: email,
        },
      });
      if (users.length > 0) {
        return res.status(400).json({ msg: "User already exists!" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new Users({
        ...req.body,
        password: hashedPassword,
      });
      const reg_user = await newUser.save();

      await UserInfo.create({
        ...req.body,
        password: hashedPassword,
        user_id: reg_user.id,
      });
      return res.status(200).json({ msg: "New User Created " });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await Users.findOne({
        where: {
          email: email,
        },
      });
      if (user == null) {
        return res.status(400).json({ msg: "Wrong Email" });
      }
      bcrypt.compare(password, user.password, function (err, response) {
        if (err) {
          throw err;
        }
        if (response) {
          const payload = {
            id: user.id,
          };
          const token = jwt.sign(payload, "JWT_SECRET_KEY", {
            expiresIn: "3h",
          });
          return res.status(200).json({
            success: true,
            message: token,
          });
        } else {
          return res.status(400).json({
            success: false,
            message: "passwords do not match",
          });
        }
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  // for testing normally
  test: async (req, res) => {
    return res.send("This is a test route");
  },

  // create user by admin
  create_user: async (req, res) => {
    try {
      const pass = req.body.password ? req.body.password : "root";
      const hashedPassword = await bcrypt.hash(pass, 10);
      let newUser = { ...req.body, password: hashedPassword };
      const is_duplicate = await Users.findOne({
        where: { email: req.body.email },
      });
      if (is_duplicate) {
        return res
          .status(400)
          .json({ msg: "User Already exists for the email" });
      }
      const user = await Users.create(newUser);
      newUser = { ...newUser, user_id: user.id };
      await UserInfo.create(newUser);

      return res.status(200).json({ msg: "SuccessFully created" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  //  update the user by both admin and user
  update_user: async (req, res) => {
    try {
      const id = req.params.id;
      const { name, image, age, dob, address } = req.body;
      let userInfoUpdateData = {};
      let usersUpdateData = {};
      if (image) userInfoUpdateData.image = image;
      if (name) {
        userInfoUpdateData.name = name;
        usersUpdateData.name = name;
      }
      if (age) userInfoUpdateData.age = age;
      if (dob) userInfoUpdateData.dob = dob;
      if (address) userInfoUpdateData.address = address;
      await UserInfo.update(userInfoUpdateData, {
        where: { user_id: id },
      });
      await Users.update(usersUpdateData, {
        where: {
          id: id,
        },
      });
      return res.status(200).json({ msg: "User Updated SuccessFully" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  // get all user data by user
  get_users: async (req, res) => {
    try {
      Users.findAll({
        where: {
          is_deleted: 0,
        },
      }).then((data) => {
        return res.status(200).json(data);
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  // user profile page
  get_user_byId: async (req, res) => {
    try {
      const id = req.params.id;
      const user = await Users.findByPk(id, { where: { is_deleted: 0 } });
      const user_same = await UserInfo.findOne({ where: { user_id: id } });
      const user_information = {
        name: user.name,
        email: user.email,
        address: user_same.address,
        dob: user_same.dob,
        image: user_same.image,
      };
      return res.status(200).json(user_information);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  // delete user by admin
  delete_user: async (req, res) => {
    try {
      const id = req.params.id;
      await Users.update({ is_deleted: 1 }, { where: { id: id } });

      return res.status(200).json({ msg: "updated successFully" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};
const uploadImage = (req, res) => {
  return "uploadImage";
};
const editImage = (req, res) => {
  return "editImage";
};
module.exports = userController;
