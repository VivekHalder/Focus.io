import { connectDB, query } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
// import { sendEmail } from "@/helper/mailer";

connectDB();

async function POST(request: NextRequest) {
    try {
        const requestBody = await request.json();
        const { username, email } = requestBody;

        const userAlreadyExistsQuery = `SELECT id FROM users WHERE username = $1 AND email = $2;`;
        const values = [username, email];
        const result = await query(userAlreadyExistsQuery, values);

        if (result && result.rows.length > 0) {
            return NextResponse.json(
                {
                    message: "User already exists.",
                },
                {
                    status: 400
                }
            );
        }

        const insertQuery = `INSERT INTO users(username, email) VALUES ($1, $2) RETURNING *;`;
        const user = await query(insertQuery, values);

        if (!user || user.rows.length === 0) {
            return NextResponse.json(
                {
                    message: "Couldnot create the user",
                },
                {
                    status: 400
                }
            );
        }

        return NextResponse.json(
            {
                message: 'User created successfully',
                user: user.rows[0]
            },
            {
                status: 200
            }                
        )

        // await sendEmail({ email: email, emailType: "VERIFY", userId: user.rows[0].id });

    } catch (error) {
        return NextResponse
            .json(
                {
                    message: error.message
                },
                {
                    status: 500
                }
            );
    }
}

export { POST };