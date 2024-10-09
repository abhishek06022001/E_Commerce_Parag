const db = require("../models/index");
const Users = db.users;

const authorization = async (req, res, next) => {
  try {
    const user = await Users.findOne({ where: { id: req.id } });
    if (user.role == 0) {
      return res.status(400).json({ login: true, msg: "Unauthorised" });
    }
    next();
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
module.exports = authorization;
