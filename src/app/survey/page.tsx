'use client'

import { useRouter } from "next/navigation";
import { parse } from "path";
import { useEffect, useState } from "react";


export default function Survey(){
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        age: '',
        location: '',
        maritalStatus: '',
        householdSize: '',
        employmentStatus: '',
        hasAgingParents: '',
        overallHealth: '',
        chronicConditions: '',
        mobilityLevel: '',
        hasLongTermCareNeeds: '',
        annualIncome: '',
        insuranceCoverage: '',
        monthlyExpenses: ''
    })


    // check if user is logged in

    useEffect(() =>
    {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/');
            return
    }

    //  load existing data if it exists
    loadExistingData(token)


    }, [router])
   


    const loadExistingData = async (token: string) => { 
        try {
            const response = await fetch('/api/survey', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if(response.ok) {
                const result = await response.json();
                 if(result.data) {
                    setFormData({
                        age: result.data.age || '',
                        location: result.data.location || '',
                        maritalStatus: result.data.maritalStatus || '',
                        householdSize: result.data.householdSize || '',
                        employmentStatus: result.data.employmentStatus || '',
                        hasAgingParents: result.data.hasAgingParents || '',
                        overallHealth: result.data.overallHealth || '',
                        chronicConditions: result.data.chronicConditions || '',
                        mobilityLevel: result.data.mobilityLevel || '',
                        hasLongTermCareNeeds: result.data.hasLongTermCareNeeds || '',
                        annualIncome: result.data.annualIncome || '',
                        insuranceCoverage: result.data.insuranceCoverage || '',
                        monthlyExpenses: result.data.monthlyExpenses || ''
                    })
                 }
            }
        } catch (error) {
            console.error(error);
            setError('Failed to load existing data');
        } 
    }

    const handleSubmit = async () => {
        setError('');
        setIsLoading(true);

        const token = localStorage.getItem('token');
        if(!token){
            router.push('/');
            return;     
        }

        // validation
        if (!formData.age || !formData.location || !formData.maritalStatus || !formData.householdSize || !formData.employmentStatus || !formData.hasAgingParents || !formData.overallHealth || !formData.chronicConditions || !formData.mobilityLevel || !formData.hasLongTermCareNeeds || !formData.annualIncome || !formData.insuranceCoverage || !formData.monthlyExpenses){
            setError('Please fill in all fields');
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/survey', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    age: parseInt(formData.age),
                    location: formData.location,
                    maritalStatus: formData.maritalStatus,
                    householdSize: formData.householdSize,
                    employmentStatus: formData.employmentStatus,
                    hasAgingParents: formData.hasAgingParents,
                    overallHealth: formData.overallHealth,
                    chronicConditions: formData.chronicConditions,
                    mobilityLevel: formData.mobilityLevel,
                    hasLongTermCareNeeds: formData.hasLongTermCareNeeds,
                    annualIncome: parseInt(formData.annualIncome),
                    insuranceCoverage: formData.insuranceCoverage,
                    monthlyExpenses: parseInt(formData.monthlyExpenses)
                })
            });
          
            const data = await response.json();
            if(!response.ok) {
                throw new Error(data.error || 'Failed to submit survey');
            }

            // got to review 
            router.push('/review');
        } catch (error) {
            setError((error as Error).message || 'Failed to submit survey');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-8">
            <div className="max-w-2xl mx-auto text-center">
                <div className="mb-6">
                {/* header */}

                    <h1 className="text-3xl font-bold text-center mb-2">
                        Care Planning Survey
                    </h1>
                    <p className="text-gray-600 mb-2">
                        Help us understand your needs 
                    </p>

                </div>
                    {error && <p className="text-red-500 mb-4">{error}</p>}

                {/* input */}
                <div className="bg-white rounded-lg shadow-md p-8">
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold mb-2 flex items-center justify-center">
                            <span className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mr-3 text-sm font-bold "> 
                                1
                            </span>
                            Demographics

                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            <label className="block">
                                <span className="flex text-sm mb-2 mt-6">Age*</span>
                                <input
                                type="number"
                                min='18'
                                value={formData.age}
                                placeholder="What is your age"
                                onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                                className="w-full border border-gray-300 rounded-md p-2"
                                >

                                </input>

                            </label>

                             <label className="block">
                                <span className="flex text-sm mb-2 mt-6">Location*</span>
                                <input
                                type="text"
                                value={formData.location}
                                placeholder="Where do you live?"
                                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                                className="w-full border border-gray-300 rounded-md p-2"
                                >

                                </input>

                            </label>

                            <label className="block">
                                <span className="flex text-sm mb-2 mt-6">Martial Status*</span>
                                <select
                                value= {formData.maritalStatus}
                                onChange={(e) => setFormData(prev => ({ ...prev, maritalStatus: e.target.value }))}
                                className="w-full border border-gray-300 rounded-md p-2"
                                >
                                    <option value="">Select an option</option>
                                    <option value="single">Single</option>
                                    <option value="married">Married</option>
                                    <option value="divorced">Divorced</option>
                                    <option value="widowed">Widowed</option>

                                </select>                              

                            </label>

                             <label className="block">
                                <span className="flex text-sm mb-2 mt-6">Household Size*</span>
                                <input
                                type="number"
                                min='1'
                                value={formData.householdSize}
                                placeholder="How many People are in the household?"
                                onChange={(e) => setFormData(prev => ({ ...prev, householdSize: e.target.value }))}
                                className="w-full border border-gray-300 rounded-md p-2"
                                >

                                </input>

                            </label>

                            

                            <label className="block">
                                <span className="flex text-sm mb-2 mt-6">employment Status*</span>
                                    <select
                                    value= {formData.employmentStatus}
                                    onChange={(e) => setFormData(prev => ({ ...prev, employmentStatus: e.target.value }))}
                                    className="w-full border border-gray-300 rounded-md p-2"
                                    >
                                        <option value="">Select an option</option>
                                        <option value="employed">Employed</option>
                                        <option value="unemployed">Unemployed</option>
                                        <option value="student">Student</option>
                                        <option value="retired">Retired</option>

                                    </select>
                            </label>

                            <label className="block">
                                <span className="flex text-sm mb-2 mt-6">Do you have Aging Parents?*</span>
                                    <select
                                    value= {formData.hasAgingParents}
                                    onChange={(e) => setFormData(prev => ({ ...prev, hasAgingParents: e.target.value }))}
                                    className="w-full border border-gray-300 rounded-md p-2"
                                    >
                                        <option value="">Select an option</option>
                                        <option value="yes">Yes</option>
                                        <option value="no">No</option>

                                    </select>
                            </label>

                            </div>

                        
                         <div className="mb-8 mt-12">
                        <h2 className="text-2xl font-bold mb-2 flex items-center justify-center">
                            <span className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center mr-3 text-sm font-bold "> 
                                2
                            </span>
                            Health

                        </h2>

                           


                            {/* health */}

                            <label className="block">
                                <span className="flex text-sm mb-2 mt-6">How do you rank your health*</span>
                                    <select
                                    value= {formData.overallHealth}
                                    onChange={(e) => setFormData(prev => ({ ...prev, overallHealth: e.target.value }))}
                                    className="w-full border border-gray-300 rounded-md p-2"
                                    >
                                        <option value="">Select an option</option>
                                        <option value="excellent">Excellent</option>
                                        <option value="good">Good</option>
                                        <option value="fair">Fair</option>
                                        <option value="poor">Poor</option>

                                    </select>
                            </label>

                            <label className="block">
                                <span className="flex text-sm mb-2 mt-6">Mobility Levels*</span>
                                    <select
                                    value= {formData.mobilityLevel}
                                    onChange={(e) => setFormData(prev => ({ ...prev, mobilityLevel: e.target.value }))}
                                    className="w-full border border-gray-300 rounded-md p-2"
                                    >
                                        <option value="">Select an option</option>
                                        <option value="excellent">Excellent</option>
                                        <option value="good">Good</option>
                                        <option value="fair">Fair</option>
                                        <option value="poor">Poor</option>

                                    </select>
                            </label>


                            <label className="block">
                                <span className="flex text-sm mb-2 mt-6">Chronic Conditions*</span>
                                <input
                                type="text"
                                value={formData.chronicConditions}
                                placeholder="List any chronic conditions"
                                onChange={(e) => setFormData(prev => ({ ...prev, chronicConditions: e.target.value }))}
                                className="w-full border border-gray-300 rounded-md p-2"
                                >

                                </input>

                            </label>

                             <label className="block">
                                <span className="flex text-sm mb-2 mt-6">Do you have long term care needs?*</span>
                                    <select
                                    value= {formData.hasLongTermCareNeeds}
                                    onChange={(e) => setFormData(prev => ({ ...prev, hasLongTermCareNeeds: e.target.value }))}
                                    className="w-full border border-gray-300 rounded-md p-2"
                                    >
                                        <option value="">Select an option</option>
                                        <option value="yes">Yes</option>
                                        <option value="no">No</option>

                                    </select>
                            </label>

                            </div>

                        <div className="mb-8 mt-12">
                        <h2 className="text-2xl font-bold mb-2 flex items-center justify-center">
                            <span className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center mr-3 text-sm font-bold "> 
                                3
                            </span>
                            Finances

                        </h2>

                            {/* finances */}

                             <label className="block">
                                <span className="flex text-sm mb-2 mt-6">Annual Income Range*</span>
                                    <select
                                    value= {formData.annualIncome}
                                    onChange={(e) => setFormData(prev => ({ ...prev, annualIncome: e.target.value }))}
                                    className="w-full border border-gray-300 rounded-md p-2"
                                    >
                                        <option value="">Select an option</option>
                                        <option value="under_25k">Under $25,000</option>
                                        <option value="25k_50k">$25,000 - $50,000</option>
                                        <option value="50k_75k">$50,000 - $75,000</option>
                                        <option value="75k_100k">$75,000 - $100,000</option>
                                        <option value="over_100k">Over $100,000</option>
                                     

                                    </select>
                            </label>


                             <label className="block">
                                <span className="flex text-sm mb-2 mt-6">Monthly Expensses*</span>
                                    <select
                                    value= {formData.monthlyExpenses}
                                    onChange={(e) => setFormData(prev => ({ ...prev, monthlyExpenses: e.target.value }))}
                                    className="w-full border border-gray-300 rounded-md p-2"
                                    >
                                        <option value="">Select an option</option>
                                        <option value="under_5k">Under $2,000</option>
                                        <option value="5k_10k">$5,000 - $10,000</option>
                                        <option value="10k_15k">$10,000 - $15,000</option>
                                        <option value="15k_20k">$15,000 - $20,000</option>
                                        <option value="over_20k">Over $20,000</option>
                            

                                    </select>
                            </label>

                             <label className="block">
                                <span className="flex text-sm mb-2 mt-6">Are you currently covered by long-term care insurance?*</span>
                                    <select
                                    value= {formData.insuranceCoverage}
                                    onChange={(e) => setFormData(prev => ({ ...prev, insuranceCoverage: e.target.value }))}
                                    className="w-full border border-gray-300 rounded-md p-2"
                                    >
                                        <option value="">Select an option</option>
                                        <option value="yes">Yes</option>
                                        <option value="no">No</option>

                                    </select>
                            </label>

                            <button
                            onClick={handleSubmit}
                         className="w-full bg-purple-500 text-white py-2 rounded-md hover:bg-purple-600 transition-colors disabled:bg-gray-400 mt-6"
                            >
                                Submit
                            </button>


                           

                        
                        </div>

                    </div>

                </div>

  

            </div>

        </div>
    )

}