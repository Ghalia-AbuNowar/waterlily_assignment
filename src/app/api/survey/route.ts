import { NextResponse } from "next/server";
import { verifyToken } from "../../../../lib/auth";
import { openDb, SurveyResponse } from "../../../../lib/database";


export async function POST(request: Request) {
    try {
        const authHeader = request.headers.get('Authorization');
        if(!authHeader || !authHeader.startsWith('Bearer ')){
            return new Response("Unauthorized", {status: 401});
        }

        const token = authHeader.substring(7);
        const decoded = verifyToken(token);

        if(!decoded){
            return NextResponse.json({error: "Invalid token"}, {status: 401});
        }

        // use the interface to type data
        const surveyData: SurveyResponse = await request.json();
        console.log("Received survey data:", surveyData);

        const db = await openDb();

        // check for existing data
        const existingData = await db.get(
            'SELECT id FROM survey_responses WHERE userId = ?',
            decoded.userId
        )

        if (existingData){
            await db.run(
                'UPDATE survey_responses SET age= ?, location= ?, maritalStatus = ?, householdSize =?, employmentStatus = ?, hasAgingParents =?, overallHealth = ?, chronicConditions = ?, mobilityLevel = ?, hasLongTermCareNeeds = ?, annualIncome = ?, insuranceCoverage = ?, monthlyExpenses = ?, updatedAt = CURRENT_TIMESTAMP WHERE userId = ?',
                [surveyData.age || null,
                surveyData.location || null,
                surveyData.maritalStatus || null,
                surveyData.householdSize || null,
                surveyData.employmentStatus || null,
                surveyData.hasAgingParents || null,
                surveyData.overallHealth || null,
                surveyData.chronicConditions || null,
                surveyData.mobilityLevel || null,
                surveyData.hasLongTermCareNeeds || null,
                surveyData.annualIncome || null,
                surveyData.insuranceCoverage || null,
                surveyData.monthlyExpenses || null,
                decoded.userId]
            );

            return NextResponse.json({message: "Survey data updated successfully"});
        }

        else{
            //  insert new row
            await db.run(
                'INSERT INTO survey_responses (userId, age, location, maritalStatus, householdSize, employmentStatus, hasAgingParents, overallHealth, chronicConditions, mobilityLevel, hasLongTermCareNeeds, annualIncome, insuranceCoverage, monthlyExpenses) VALUES(?,?,?, ?,?,?,?,?,?,?,?,?,?,?) ',
                [
                    decoded.userId,
                    surveyData.age || null,
                    surveyData.location || null,
                    surveyData.maritalStatus || null,
                    surveyData.householdSize || null,
                surveyData.employmentStatus || null,
                surveyData.hasAgingParents || null,
                surveyData.overallHealth || null,
                surveyData.chronicConditions || null,
                surveyData.mobilityLevel || null,
                surveyData.hasLongTermCareNeeds || null,
                surveyData.annualIncome || null,
                surveyData.insuranceCoverage || null,
                surveyData.monthlyExpenses || null]
            );

            return NextResponse.json({message: "Survey data saved successfully"});
        }
      

    } catch (error) {
        console.error("Error processing survey data:", error);
        return NextResponse.json({error: "Internal Server Error"}, {status: 500});
    }
}


export async function GET(request: Request) {
    try {
         const authHeader = request.headers.get('Authorization');
        if(!authHeader || !authHeader.startsWith('Bearer ')){
            return new Response("Unauthorized", {status: 401});
        }

        const token = authHeader.substring(7);
        const decoded = verifyToken(token);

        if(!decoded){
            return NextResponse.json({error: "Invalid token"}, {status: 401});
        }

    const db = await openDb();
    const data = await db.get(
        'SELECT * FROM survey_responses WHERE userId = ?',
        decoded.userId
    );


    return NextResponse.json({data: data || null});
    

} catch(error) {
    console.error("Error fetching survey data:", error);
    return NextResponse.json({error: "Internal Server Error"}, {status: 500});
}
}