const express = require('express')
const router = express.Router()

const { getAllBooks, createBook, updateBook } = require('../controllers/books.js')

router.get("/", getAllBooks);
router.post("/", createBook)
router.put("/:bookID", updateBook);


module.exports = router;