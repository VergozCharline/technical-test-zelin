const express = require('express')
const router = express.Router()

const { getAllBooks, createBook, updateBook, getOneBook, deleteBook } = require('../controllers/books.js')

router.post("/", createBook)
router.get("/", getAllBooks);
router.get("/:bookID", getOneBook);
router.put("/:bookID", updateBook);
router.delete("/:bookID", deleteBook);

module.exports = router;