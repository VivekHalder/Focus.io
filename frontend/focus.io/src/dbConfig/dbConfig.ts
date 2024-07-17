import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const requiredEnvVars = ['DB_USER', 'DB_HOST', 'DB_NAME', 'DB_PASS', 'DB_PORT'];
for (const varName of requiredEnvVars) {
    if (!process.env[varName]) {
        throw new Error(`Missing required environment variable: ${varName}`);
    }
}

const pool = new Pool(
    {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: String(process.env.PASSWORD),
        port: Number(process.env.DB_PORT),
    }
)

const connectDB = async () => {
    try {
        await pool.connect();
        console.log('connected to postgres');
    } catch (error) {
        console.log(error);
    }
}

const query = async (text, params) => {
    const client = await pool.connect();

    try {
        const res = await client.query(text, params);
        return res;
    } catch(error) {
        client.release();
    }
}

export { connectDB, query };