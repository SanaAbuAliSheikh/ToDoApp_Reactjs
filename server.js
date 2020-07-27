const express = require("express");
const connectDB = require("./config/db");
const app = express();

connectDB();

const PORT = process.env.PORT || 5000;

app.use(
  express.json({
    extended: false,
  })
);

app.get("/", (req, res) => {
  res.send("API Running");
});

app.use("/api/user", require("./routes/api/user"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/user", require("./routes/api/task"));
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
app.listen(PORT, () => {
  console.log(`Server Started on Port ${PORT}`);
});
