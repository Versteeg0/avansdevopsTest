const { MongoClient } = require('mongodb')

const uri = process.env.MONGO_URL
console.log(uri);
const client = new MongoClient(uri)

const db = client.db(process.env.DB_NAME)
console.log(db);

module.exports = {
  db,
  client
}
