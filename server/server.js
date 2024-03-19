require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connect = require("./dbConfig/dbConfig");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

connect();

// import routes
const userRouter = require("./routes/user.routes.js")
const adminRouter = require("./routes/admin.routes.js")

// routes
app.use("/api", userRouter)
app.use("/api", adminRouter)



app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
