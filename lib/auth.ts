import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { openDb, Users } from "./database";



//  jwt secret
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// hash password
export async function hashPassword(password: string): Promise<string> {
    const saltRounds = 12;
    return await bcrypt.hash(password, saltRounds);
}

// verify password 
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
}

//  Generate the jwt token
export function generateToken(userId: number): string {
    return jwt.sign(
        {userId, iat: Math.floor(Date.now() / 1000)}, JWT_SECRET, {expiresIn:'1h'}  )

}

// verify token 
export function verifyToken(token: string): {userId: number} | null {
    try { 
        const decoded = jwt.verify(token, JWT_SECRET) as {userId: number};
        return decoded;
    } catch (error) {
        return null;
    }
}

// create new user
export async function createUser(email: string, password: string, firstName: string, lastName: String ): Promise<Users> {
    const db = await openDb();

    // check if the user already exists

    const existingUser = await db.get(
        'SELECT id FROM users WHERE email = ?', email
    )

    if (existingUser){
        throw new Error('User already exists');
    }

    const passwordHash = await hashPassword(password);

    const result = await db.run(
        'INSERT INTO users (email, passwordHash, firstName, lastName) VALUES (?, ?, ?, ?)',
        email, passwordHash, firstName, lastName
    )

    if (!result.lastID){
        throw new Error('Failed to create user');
    }

    //  we return the user without the hash password
    const user = await db.get('SELECT id, email, firstName, lastName FROM users WHERE id = ?', result.lastID);

    return user;
}

// authenticating user
export async function authenticateUser(email: string, password: string): Promise<User|null> {

    const db = await openDb()

    const user = await db.get(
        'SELECT * FROM users WHERE email = ?', email
    )

    if (!user){
        return null
    }

    const isValidPassword = await verifyPassword(password, user.passwordHash)

    if (!isValidPassword){
        return null
    }

    // return user without password hash
    const { passwordHash, ...userWithoutPassword } = user;
    return userWithoutPassword;
}

//  get user by ID 

export async function getUserById(userId: number): Promise<Users | null> {
    const db = await openDb();
    const user = await db.get('SELECT id, email, firstName, lastName FROM users WHERE id = ?', userId);
    return user || null;
}