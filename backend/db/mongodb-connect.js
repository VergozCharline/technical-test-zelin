const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();
const uri = process.env.ATLAS_URI;

async function connectToMongoDB() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connexion réussie à MongoDB !");
    return client;
  } catch (error) {
    console.error("Erreur MongoDB :", error);
    throw error;
  }
}

module.exports = connectToMongoDB;
