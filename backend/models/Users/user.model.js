module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    name: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
    },
    is_deleted: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      comment: "0 => not deleted, 1=> deleted",
    },
    role: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      comment: "0 => user, 1=> admin",
    },
  });
  return User;
};
