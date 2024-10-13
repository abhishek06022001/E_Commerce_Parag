module.exports = (sequelize, Sequelize) => {
  const Order = sequelize.define("orders", {
    product_id: {
      type: Sequelize.INTEGER,
    },
    user_id: {
      type: Sequelize.INTEGER,
    },
    quantity: {
      type: Sequelize.INTEGER,
    },
    order_id: {
      type: Sequelize.INTEGER,
    },
  });
  return Order;
};
