const users = require("../../controller/userController");
const auth = require("../../middleware/auth");
const authorization = require("../../middleware/authorization");
const upload = require("../../middleware/multer");
var router = require("express").Router();
router.post("/register", users.register);
router.post("/login", users.login);
// router.post("/test", auth, authorization, users.test);
// router.post("/test", users.test);
router.post(
  "/create_user",
  auth,
  authorization,
  upload.single("file"),
  users.create_user
);
router.post("/update_user/:id", auth, upload.single("file"), users.update_user);
router.get("/get_user/:id", auth, users.get_user_byId);
router.get("/get_users", auth, authorization, users.get_users);
router.get("/test", auth, users.test);
router.delete("/delete_user/:id", auth, authorization, users.delete_user);
module.exports = router;
