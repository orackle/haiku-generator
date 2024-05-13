// util/mongodb.js
import { MongoClient } from 'mongodb';

let cachedDb = null;

export async function connectToDatabase(uri) {
  if (cachedDb) {
    return { db: cachedDb };
  }

  const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  const db = client.db();

  cachedDb = db;

  return { db };
}
