import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URL as string;

if (!uri) {
  throw new Error('Please define the MONGO_URL environment variable in .env');
}

const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;


declare global {
  let _mongoClientPromise: Promise<MongoClient> | undefined;
}

const globalForMongo = globalThis as typeof globalThis & {
  _mongoClientPromise?: Promise<MongoClient>;
};

if (process.env.NODE_ENV === 'development') {
  if (!globalForMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalForMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalForMongo._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;

