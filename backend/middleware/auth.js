// get id from token
const jwt = require("jsonwebtoken");

//  if yes then next or else return
const auth = async (req, res, next) => {
  try {
    const token = req.headers.token;
    if (token) {
      const { id } = jwt.verify(token, "JWT_SECRET_KEY");
      console.log(id);
      req.id = id;
      next();
    } else {
      return res.status(400).json({ login: false, msg: "No token" });
    }
  } catch (error) {
    return res.status(500).json({ login: false, msg: error.message });
  }
};
module.exports = auth;
