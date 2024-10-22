const products = require("../../controller/productController");
const auth = require("../../middleware/auth");
const authorization = require("../../middleware/authorization");
const upload = require("../../middleware/multer");
var router = require("express").Router();
router.post(
  "/create_product",
  auth,
  authorization,
  upload.single("file"),
  products.create_product
);
router.put(
  "/update_product/:id",
  auth,
  authorization,
  upload.single("file"),
  products.update_product
);
router.delete(
  "/delete_product/:id",
  auth,
  authorization,
  products.delete_product
);
router.get("/get_product/:id", auth, products.get_product);
router.get("/get_products", products.get_products);
module.exports = router;
