'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Review() {

    const router = useRouter();
    const [data, setData] = useState<any>(null)

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(!token) {
            router.push('/');
            return;
        }

        // load data

        fetch('api/survey', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
       .then(res => res.json())
       .then(result => setData(result.data))
       .catch(err => console.error(err))
   }, [router]);

   const handleLogOut = () => {
       localStorage.removeItem('token');
       router.push('/');
   }

    return (
 <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-8">
    <div className="max-w-3xl mx-auto px-4">            
        <div className="text-center mb-8">
            <h1 className="text-4xl font-bold">Survey Complete!</h1>
            <p className="text-gray-600"> Here is your review</p>

        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
            <div className="mb-6">
                <h2 className="text-xl font-semibold text-blue-600 mb-3"> Demographic Responses</h2>
                <div className="text-gray-700">
                    <p><strong>Age:</strong> {data?.age}</p>
                    {/* <p><strong>Gender:</strong> {data?.gender}</p> */}
                    <p><strong>Location:</strong> {data?.location}</p>
                    <p><strong>Marital Status:</strong> {data?.maritalStatus}</p>
                    <p><strong>Household Size:</strong> {data?.householdSize}</p>
                    <p><strong>Employment Status:</strong> {data?.employmentStatus}</p>
                    <p><strong>Has Aging Parents:</strong> {data?.hasAgingParents ? 'Yes' : 'No'}</p>


                </div>
              

                

            </div>


             <div className="mb-6">
                <h2 className="text-xl font-semibold text-green-600 mb-3"> Health Responses</h2>
                <div className="text-gray-700">
                    <p><strong>Overall Health:</strong> {data?.overallHealth}</p>
                    <p><strong>Chronic Conditions:</strong> {data?.chronicConditions}</p>
                    <p><strong>Mobility Level:</strong> {data?.mobilityLevel}</p>
                    <p><strong>Has Long Term Care Needs:</strong> {data?.hasLongTermCareNeeds || 'Not Provided'}</p>



                </div>

            </div>


            <div className="mb-6">
                <h2 className="text-xl font-semibold text-orange-600 mb-3"> Financial Responses</h2>
                <div className="text-gray-700">
                    <p><strong>Income Range:</strong> {data?.incomeRange}</p>
                    <p><strong>Insurance Coverage:</strong> {data?.insuranceCoverage}</p>
                    <p><strong>Monthly Expensses:</strong> {data?.monthlyExpenses || 'Not Provided'}</p>

                </div>

            </div>

        </div>
        
    </div>
</div>

);
}