const express = require('express')
const router = express.Router()

const { getAllBooks, createBook, updateBook, getOneBook } = require('../controllers/books.js')

router.get("/", getAllBooks);
router.get("/:bookID", getOneBook);
router.post("/", createBook)
router.put("/:bookID", updateBook);


module.exports = router;