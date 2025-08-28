
import sqlite3 from "sqlite3";
import {open, Database} from 'sqlite';
import path from "path";

let db: Database<sqlite3.Database, sqlite3.Statement> | null = null;

export async function openDb(): Promise<Database<sqlite3.Database, sqlite3.Statement>> {
    if (db) return db;

    const dbPath = path.join(process.cwd(), 'database', 'waterlily.db')

    db = await open({
        filename: dbPath,
        driver: sqlite3.Database
    })

    return db;
}

// create interfaces for type safty

export interface Users{
    id: number
    email: string
    passwordHash: string
    firstName: string
    lastName: string
    createdAt: Date
    updatedAt: Date
}

// survey data
export interface SurveyResponse{
    id?: number
    userId: number
    age?: number
    location?: string
    maritalStatus?: string
    householdSize?: number
    employmentStatus?: string
    hasAgingParents?: string

    // Health
    overallHealth?: string
    chronicConditions?: string
    mobilityLevel?: string
    hasLongTermCareNeeds?: string

    // finances
    annualIncome?: number
    insuranceCoverage?: string
    monthlyExpenses?: number

    createdAt?: Date
    updatedAt?: Date
}