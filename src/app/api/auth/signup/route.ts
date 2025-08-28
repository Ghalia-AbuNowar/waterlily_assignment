import { NextResponse } from "next/server";
import { createUser, generateToken } from "../../../../../lib/auth";

export async function POST(request: Request) {
    try {
        const {email, password, firstName, lastName} = await request.json();

        //  basic validation 
        if(!email || !password || !firstName || !lastName){
            return new Response("Missing required fields", {status: 400});
        }

        const user = await createUser(email, password, firstName, lastName)

        //  generate token 
        const token = generateToken(user.id)

        return NextResponse.json({
            message: 'User created successfully',
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            },
            token
        })
        
    } catch (error) {
       if (error instanceof Error && error.message === 'User already exists'){
        return NextResponse.json({
            message: 'User already exists',
        }, { status: 409 });
    }
    console.error('signup error:', error);
    return NextResponse.json({
        message: 'Internal server error',
    }, { status: 500 });
    }
}