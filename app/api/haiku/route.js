// get and post
// pages/api/route.js
import { MongoClient } from 'mongodb';
export async function GET(request) {
    console.log('im in get');
    const uri = process.env.MONGODB_URI; // MongoDB URI from .env.local
    console.log(uri);

    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    try {
        await client.connect(); // Connect to MongoDB
        const database = client.db('haiku'); // Specify the database name 'haiku'
        
        const url = new URL(request.url);
        console.log(url);
        const userId = url.searchParams.get('userId'); // Extract userId from the query parameters

        const collection = database.collection('saved_haikus');
        // Retrieve all records with the specified userId
        const records = await collection.find({ userId }).toArray();
        console.log(records);
        // Return the records as a JSON response
        return new Response(JSON.stringify(records), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.error('Error retrieving records:', error);
        // Return an error response
        return new Response('Error retrieving records', { status: 500 });
    } finally {
        await client.close(); // Close the MongoDB connection
    }
}


export async function DELETE(request) {
    console.log('im in delete');

    const uri = process.env.MONGODB_URI; // MongoDB URI from .env.local
    console.log(uri);

    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    
    try {
        await client.connect(); // Connect to MongoDB
        const database = client.db('haiku'); // Specify the database name 'haiku'
        const requestBody = await request.json(); // Parse the JSON body of the request
        console.log(requestBody);
        const { userId, haiku } = requestBody; // Extract userId and haiku from the request body

        const collection = database.collection('saved_haikus');
        // Delete the haiku from MongoDB
        await collection.deleteOne({ userId, haiku });

        // Return a success response

        return new Response('Haiku deleted successfully', { status: 200 });
    } catch (error) {
        
        console.error('Error deleting haiku:', error);
        // Return an error response
        return new Response('Error deleting haiku', { status: 500 });
    }
    }



  export async function POST(request) {
    console.log('im in get');

    const uri = process.env.MONGODB_URI; // MongoDB URI from .env.local
    console.log(uri);

    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    try {
        await client.connect(); // Connect to MongoDB
        const database = client.db('haiku'); // Specify the database name 'haiku'
        const requestBody = await request.json(); // Parse the JSON body of the request
        const { userId, haiku } = requestBody; // Extract userId and haiku from the request body

        const collection = database.collection('saved_haikus');
        // Save the haiku to MongoDB
        await collection.insertOne({ userId, haiku, created_at: new Date() });

        // Return a success response
        return new Response('Haiku saved successfully', { status: 200 });
    } catch (error) {
        console.error('Error saving haiku:', error);
        // Return an error response
        return new Response('Error saving haiku', { status: 500 });
    } finally {
        await client.close(); // Close the MongoDB connection
    }
}