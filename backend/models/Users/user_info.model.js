module.exports = (sequelize, Sequelize) => {
  const UserInfo = sequelize.define("user_info", {
    name: {
      type: Sequelize.STRING,
    },
    address: {
      type: Sequelize.STRING,
    },
    age: {
      type: Sequelize.INTEGER,
    },
    user_id: {
      type: Sequelize.INTEGER,
      unique: true,
    },
    dob: {
      type: Sequelize.DATEONLY,
    },
    image: {
      type: Sequelize.STRING,
    },
  });
  return UserInfo;
};
