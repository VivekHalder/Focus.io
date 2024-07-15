import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// if any required env field is missing throw error
const requiredEnvVars = ['DB_USER', 'DB_HOST', 'DB_NAME', 'DB_PASS', 'DB_PORT'];
for (const varName of requiredEnvVars) {
    if (!process.env[varName]) {
        throw new Error(`Missing required environment variable: ${varName}`);
    }
}

// every field of config object (the one to be accepted in the Client) is optional
const client = new Client(
    {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.PASSWORD,
        port: Number(process.env.DB_PORT),
    }
)

const connectDB = async () => {
    // client.connect()
    // .then(() => {

    // })
    // .catch((error: Error) => {
    //     console.log(error)
    // });

    try {
        await client.connect();
        console.log('Connect successfully to the database.');
    } catch (error) {
        
    }
}

export default connectDB;