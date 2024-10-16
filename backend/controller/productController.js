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
      await Products.create(req.body);
      return res.status(200).json({ msg: "product created successfully" });
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
      await Products.update(req.body, { where: { id: product_id } });
      return res.status(200).json({ msg: "Updated successfully" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  get_products: async (req, res) => {
    try {
      const products = await Products.findAll({ where: { is_deleted: 0 } });
      return res.status(200).json({ success: true, msg: products });
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
