const db = require("../models/index");
const Order = db.orders;
const Product = db.products;
const Op = db.Sequelize.Op;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
// return res.status(200).json({ msg: "endpoint hit" });
const removeTemp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};
const orderController = {
  submitOrder: async (req, res) => {
    try {
      const order_id = Math.floor(Math.random() * 1000); //A random order_id which is common for all the products
      const promises = req.body.products.map((element) => {
        let order = {
          ...element,
          user_id: req.params.id,
          order_id: order_id,
        };
        Order.create(order);
      });
      await Promise.all(promises);
      return res.status(200).json({ success: true, msg: "order submitted" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getOrders: async (req, res) => {
    try {
      const user_id = req.params.id;
      const orders = await Order.findAll({
        where: {
          user_id: user_id,
        },
      });
      //   must do await because it is still a promise dude
      let orders_bycategory = await orders.reduce(
        async (accpromise, product) => {
          const acc = await accpromise;
          if (!acc[product.order_id]) {
            acc[product.order_id] = [];
          }
          const prod = await Product.findOne({
            where: { id: product.product_id },
          });
          acc[product.order_id].push({
            ...prod.dataValues,
            quantity: product.quantity,
          });
          return acc;
        },
        {}
      );

      return res.status(200).json({ success: true, msg: orders_bycategory });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};
module.exports = orderController;
