const db = require("../models/index");
const Order = db.orders;
const User = db.users;
const Products = db.products;
const Product = db.products;
const Op = db.Sequelize.Op;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const { where } = require("sequelize");
const { log } = require("console");
// return res.status(200).json({ msg: "endpoint hit" });
const removeTemp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};
const orderController = {
  submitOrder: async (req, res) => {
    try {
      const user_ka_id = parseInt(req.params.id);
      let random_order_id = 1;
      const orderss = await db.sequelize.query(
        `select * from orders where user_id =${user_ka_id} order by order_id DESC limit 1 `
      );
      if (orderss[0].length) {
        random_order_id = orderss[0][0].order_id + 1;
      }
      let order_array = req.body;

      const promises = order_array.map((element) => {
        let order = {
          product_id: element.id,
          product_price_at_order: element.price,
          product_name: element.name,
          user_id: user_ka_id,
          quantity: element.quantity,
          order_id: random_order_id,
        };

        return order;
      });

      await Order.bulkCreate(promises);
      return res.status(200).json({ success: true, msg: "order submitted" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getOrders: async (req, res) => {
    try {
      // return res.status(200).json("get ordered called");
      const user_id = req.params.id;
      const auth_id = req.id;
      const user = await User.findByPk(auth_id);
      if (user.role == 0 && auth_id != user_id) {
        return res
          .status(400)
          .json({ success: true, msg: "Unauthenticated redirect... " });
      }
      const orders = await Order.findAll({
        where: {
          user_id: user_id,
        },
      });
      let order_history = [];
      orders.forEach((order) => {
        let key = order.dataValues["order_id"];
        if (!order_history[key]) {
          order_history[key] = [];
        }
        order_history[key].push(order);
      });

      return res
        .status(200)
        .json({ success: true, msg: order_history.reverse() });
      //
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = orderController;
