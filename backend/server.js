const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use(express.json());
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
dotenv.config();
app.use(bodyParser());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
app.get("/hello", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});
app.use("/api", require("./routes/users/user.route"));
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
