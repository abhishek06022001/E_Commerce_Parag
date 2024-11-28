const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use(express.json());
const dotenv = require("dotenv");

dotenv.config();

// app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
app.get("/hello", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});
app.use(express.static("uploads"));
app.use("/api", require("./routes/users/user.route"));
app.use("/api", require("./routes/products/product.route"));
app.use("/api", require("./routes/order/order.route"));
// app.use(express.static("public")); // serve static files
// sql connection for the project
const db = require("./models/index");

db.sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });
