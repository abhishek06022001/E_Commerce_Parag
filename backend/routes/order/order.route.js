const orders = require("../../controller/orderController");
const auth = require("../../middleware/auth");
const authorization = require("../../middleware/authorization");
const upload = require("../../middleware/multer");
var router = require("express").Router();
router.post("/submit_order/:id", auth, orders.submitOrder);
router.get("/get_orders/:id", auth, orders.getOrders);
module.exports = router;
