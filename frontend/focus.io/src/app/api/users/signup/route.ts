import { connectDB, query } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
// import { sendEmail } from "@/helper/mailer";

connectDB();

interface User {
    id: number,
    username: string,
    email: string,
    created_at: Date
}

interface RequestBody {
    username: string,
    email: string
}

interface Result<T> {
    command: string,
    rowCount: number,
    old: number,
    rows: T[],
    fields: any[]
}

async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        const requestBody: RequestBody = await request.json();
        const { username, email } = requestBody;

        const userAlreadyExistsQuery: string = `SELECT id FROM users WHERE username = $1 AND email = $2;`;
        const values: string[] = [username, email];
        const result: Result<User> = await query(userAlreadyExistsQuery, values);

        console.log("Existing Users are: ", result);

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

        const insertQuery: string = `INSERT INTO users(username, email) VALUES ($1, $2) RETURNING *;`;
        const userResult: Result<User> = await query(insertQuery, values);

        console.log("New Users are: ", userResult);

        if (!userResult || userResult.rows.length === 0) {
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
                user: userResult.rows[0]
            },
            {
                status: 200
            }                
        )

        // await sendEmail({ email: email, emailType: "VERIFY", userId: user.rows[0].id });

    } catch (error: any) {
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