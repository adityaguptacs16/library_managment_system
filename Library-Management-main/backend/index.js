const express = require('express'); 
const app = express(); 
const cors = require('cors'); 
const mongoose = require("mongoose");
require('dotenv').config();

const users = require("./routes/user.js"); 
const books = require("./routes/books.js");
const admin = require("./routes/admin.js");
const librarian = require("./routes/librarian.js");
const home = require("./routes/home.js");

const allowedOrigins = [
  "http://localhost:5173",
  "https://library-managment-system-4uy5.vercel.app",
];

app.use(express.json()); 

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("❌ Blocked by CORS:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,POST,PUT,PATCH,DELETE",
  credentials: true,
}));

app.use("/users", users);
app.use("/books", books);
app.use("/admin", admin);
app.use("/librarian", librarian);
app.use("/home", home);

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
const uri = process.env.MONGO_URI;

mongoose.connect(uri)
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log("DB Error:", err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
