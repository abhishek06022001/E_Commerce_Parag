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
      const random_order_id = Math.floor(Math.random() * 1000); //A random order_id which is common for all the products
      // return res.status(200).json({...req.body});

      let order_array = req.body;

      // return res.status(200).json({...req.body});
      const promises = order_array.map((element) => {
        let order = {
          product_id: element.id,
          user_id: user_ka_id,
          quantity: element.quantity,
          order_id: random_order_id,
        };
        return order;
      });
      // return res.status(200).json(promises);
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
      //   must do await because it is still a promise dude
      let order_history = [];
      let promises = [];

      // return the quantity from order and product from the id and product table and group them by order and then send
      const result = await db.sequelize.query(
        `select * from products inner join orders  on products.id = orders.product_id where user_id=${user_id} 
        order by orders.order_id `
      );

      return res.status(200).json({ success: true, msg: result[0] });
      //
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = orderController;
