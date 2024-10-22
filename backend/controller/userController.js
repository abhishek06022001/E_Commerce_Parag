const db = require("../models/index");
const Users = db.users;
const UserInfo = db.user_info;
const Op = db.Sequelize.Op;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const { where } = require("sequelize");
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
            expiresIn: "12h",
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
    return res.status(200).json({ success: true });
  },
  // create user by admin
  create_user: async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      let newUser = {
        ...req.body,
        password: hashedPassword,
        image: req.file.filename,
      };
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
      const user_obj = await UserInfo.findOne({
        where: { user_id: id },
      });
      // return res.status(200).json({ msg: req.file });
      const user = await Users.findByPk(id);
      if (req.file) {
        if (user_obj.image) {
          //
          fs.unlink(process.cwd() + "/uploads/" + user_obj.image, (err) => {
            if (err) throw err;
          });
        }
        req.body.image = req.file.filename;
      }
      await Users.update({ ...req.body }, { where: { id: id } });
      await UserInfo.update({ ...req.body }, { where: { user_id: id } });
      return res.status(200).json({ ...req.body });
      
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
      const id = req.id;

      const user = await Users.findByPk(id, { where: { is_deleted: 0 } });
      const user_same = await UserInfo.findOne({ where: { user_id: id } });
      const user_information = {
        role: user.role,
        name: user.name,
        email: user.email,
        address: user_same.address,
        dob: user_same.dob,
        age: user_same.age,
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
      return res
        .status(200)
        .json({ success: true, msg: "deleted successFully" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = userController;
