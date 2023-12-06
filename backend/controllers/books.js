const { ObjectId } = require("mongodb");
const connectToMongoDB = require("../db/mongodb-connect");

async function getCollection() {
    const client = await connectToMongoDB();
    return client.db("technicaltestzelin").collection("books");
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

  module.exports = { getAllBooks };
  