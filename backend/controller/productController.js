const db = require("../models/index");
const Products = db.products;
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
const productController = {
  create_product: async (req, res) => {
    try {
      if (req.file) {
        req.body.image = req.file.filename;
      }
      const new_product = await Products.create(req.body);
      return res
        .status(200)
        .json({ product: new_product, msg: "product created successfully" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  delete_product: async (req, res) => {
    try {
      const product_id = req.params.id;
      await Products.update({ is_deleted: 1 }, { where: { id: product_id } });
      return res.status(200).json({ success: true, msg: "deleted Success" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  update_product: async (req, res) => {
    try {
      const product_id = req.params.id;
      const product = await Products.findByPk(product_id);

      if (!product) {
        removeTemp(process.pwd() + "/uploads/" + req.file.filename);
        return res.status(400).json({ msg: "product doesnt exist" });
      }
      if (req.file) {
        if (product.image) {
          let path = process.cwd() + "/uploads/" + product.image;
          removeTemp(path);
        }
        req.body.image = req.file.filename;
      }
      await Products.update(req.body, {
        where: { id: product_id },
      });
      const updated_product = await Products.findOne({
        where: { id: product_id },
      });
      return res
        .status(200)
        .json({ product: updated_product, msg: "Updated successfully" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  get_products: async (req, res) => {
    try {
      const limit = 6;
      const skip = (parseInt(req.query.skip) - 1) * 6 || 0;
      const count = await Products.count({
        where: {
          is_deleted: 0,
        },
      });
      const query = req.query.name;
      const category = req.query.category;

      let mini_query = query == '' ? `` : `AND products.name like '${query}%'`;
     
      let category_query =
        category == "none" ? `` : `AND products.category = '${category}'`;
      const products = await db.sequelize.query(
        `SELECT * FROM products where is_deleted = 0  ${category_query}  ${mini_query} LIMIT ${limit} offset ${skip} `
      );
      const total_products = await db.sequelize.query(
        `SELECT * FROM products where is_deleted = 0  ${category_query}  ${mini_query} `
      );
      return res.status(200).json({
        success: true,
        msg: products[0],
        count: count,
        total_products: total_products[0].length,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  get_product: async (req, res) => {
    try {
      const products = await Products.findOne({
        where: { is_deleted: 0, id: req.params.id },
      });

      return res.status(200).json({ success: true, msg: products });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};
module.exports = productController;
