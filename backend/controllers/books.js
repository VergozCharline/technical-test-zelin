const { ObjectId } = require("mongodb");
const connectToMongoDB = require("../db/mongodb-connect");

async function getCollection() {
    const client = await connectToMongoDB();
    return client.db("technicaltestzelin").collection("books");
  }
  
  async function createBook(req, res) {
    try {
      const { title, picture, author, date, note, genre, rate, lastModification } = req.body;

      if (!title || !author || !date || !note || !genre || !picture) {
        return res.status(400).json({ message: "Please complete all fields" });
      }
  
      const collection = await getCollection(); 
      const result = await collection.insertOne({
        title,
        picture,
        author,
        date,
        publicationDate: new Date(),
        note,
        genre,
        rate: Number(rate),
        lastModification: null,
      });
  
      const createdBook = {
        _id: result.insertedId,
        title,
        picture,
        author,
        date,
        publicationDate: new Date(),
        note,
        genre,
        rate: Number(rate),
        lastModification: null,
      };

      res.status(201).json({ message: 'Book create successfully', book: createdBook });
      console.log(result);
    } catch (error) {
      console.error("Error ", error);
      res.status(500).json({ message: "Error when creating the book" });
    }
  }
  
  

async function getAllBooks(req, res) {
    try {
      const collection = await getCollection();
      const books = await collection.find({}).toArray();
      res.json(books);
    } catch (error) {
      console.error("Error retrieving all books", error);
      res.status(500).json({ message: "Erreur server" });
    }
  }

  async function getOneBook(req, res) {
    try {
      const collection = await getCollection();
      const bookID = req.params.bookID;
      console.log(bookID);
      const result = await collection.findOne({
        _id: ObjectId.createFromHexString(bookID),
      });
      if (result) {
        res.json(result);
      } else {
        res.status(404).json({ message: "Book not found" });
      }
    } catch (error) {
      console.error("Error retrieving a book", error);
      res.status(500).json({ message: "Server error" });
    }
  }

  async function updateBook(req, res) {
    try {
      const collection = await getCollection();
      const bookID = req.params.bookID;
      const updatedData = req.body;

      updatedData.lastModification = new Date();
  
      delete updatedData._id;
  
      const result = await collection.updateOne(
        { _id: ObjectId.createFromHexString(bookID) },
        { $set: updatedData }
      );
      console.log(result);
  
      if (result.matchedCount > 0) {
        const updatedBook = await collection.findOne({ _id: ObjectId.createFromHexString(bookID) });
  
        res.status(200).json({ message: "Book updated successfully", book: updatedBook });
      } else {
        res.status(404).json({ message: "Book not found" });
      }
    } catch (error) {
      console.error("Error updating a book", error);
      res.status(500).json({ message: "Server error" });
    }
  }
  

  async function deleteBook(req, res) {
    try {
      const collection = await getCollection();
      const bookID = req.params.bookID;
      result = await collection.deleteOne({
        _id: ObjectId.createFromHexString(bookID),
      });
      if (result.deletedCount === 1) {
        res.status(200).json({ message: "Book deleted succefullly" });
      } else {
        res.status(404).json({ message: "Book not found" });
      }
    } catch (error) {
      console.error("Error deleting book", error);
      res.status(500).json({ message: "Server error" });
    }
  }
  

  module.exports = { getAllBooks, createBook, updateBook, getOneBook, deleteBook };
  