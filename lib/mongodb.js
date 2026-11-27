import { MongoClient } from 'mongodb';

const options = {
  serverSelectionTimeoutMS: 8000,
};

let clientPromise = null;

if (process.env.MONGODB_URI) {
  const client = new MongoClient(process.env.MONGODB_URI, options);
  if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {
      global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
  } else {
    clientPromise = client.connect();
  }
}

export function mongoConfigured() {
  return Boolean(process.env.MONGODB_URI);
}

export async function getColumnsCollection() {
  if (!clientPromise) return null;
  const client = await clientPromise;
  const dbName = process.env.MONGODB_DB || 'risteard';
  return client.db(dbName).collection('columns');
}
