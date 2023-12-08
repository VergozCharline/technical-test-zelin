const MongoClient = require('mongodb').MongoClient;
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const dotenv = require("dotenv");
const booksRouter = require('./routes/books');

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

const PORT = process.env.PORT || 8000;

app.use('/api/books', booksRouter)

    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

