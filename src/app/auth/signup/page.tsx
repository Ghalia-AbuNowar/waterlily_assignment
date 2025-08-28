'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";


export default function signup() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: ''
    });


    const handleSubmit = async () => {
        setError('')
        setIsLoading(true)

        // basic validation
        if (!formData.email || !formData.password || !formData.confirmPassword || !formData.firstName || !formData.lastName) {
            setError('All fields are required');
            setIsLoading(false);
            return;
        }

        if (formData.confirmPassword !== formData.password){
            setError('Passwords do not match');
            setIsLoading(false);
            return;
        }

        try{
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },  
                body: JSON.stringify({
                    email:formData.email.trim(),
                    password: formData.password,
                    firstName: formData.firstName.trim(),
                    lastName: formData.lastName.trim()
                })
            });

            const data = await response.json();

            if (!response.ok){
                throw new Error(data.error || 'Something went wrong');
            }

            // store token and user

            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            router.push('/survey');

        } catch (error) {
            setError(error instanceof Error ? error.message : 'Something went wrong');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-8">

            <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
                {/* header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        Create your account
                    </h1>
                    <p className="text-gray-600">
                        Join Waterlily to start planning your long-term care
                    </p>

                </div>

                {error && (
                    <div className="mb-4">
                        <p className="text-red-500 text-sm">{error}</p>
                    </div>
                )}

                {/*  input fields */}

                <div className="mb-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <label className="block">
                            <span className="block text-sm font-medium text-gray-800">
                                First Name*
                            </span>
                            <input
                            type="text"
                            value= {formData.firstName}
                            onChange={(e)=> setFormData(prev => ({...prev, firstName: e.target.value}))}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Enter first name"
                            />
                        </label>

                         <label className="block mb-3">
                            <span className="block text-sm font-medium text-gray-800">
                                Last Name*
                            </span>
                            <input
                            type="text"
                            value= {formData.lastName}
                            onChange={(e)=> setFormData(prev => ({...prev, lastName: e.target.value}))}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Enter last name"
                            />
                        </label>
                    </div>

                     <label className="block mb-3">
                            <span className="block text-sm font-medium text-gray-800">
                                Email*
                            </span>
                            <input
                            type="text"
                            value= {formData.email}
                            onChange={(e)=> setFormData(prev => ({...prev, email: e.target.value}))}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Enter first name"
                            />
                        </label>

                             <label className="block mb-3">
                            <span className="block text-sm font-medium text-gray-800">
                                Password*
                            </span>
                            <input
                            type="password"
                            value= {formData.password}
                            onChange={(e)=> setFormData(prev => ({...prev, password: e.target.value}))}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Enter password"
                            />
                        </label>

                             <label className="block mb-3">
                            <span className="block text-sm font-medium text-gray-800">
                                Confirm Password*
                            </span>
                            <input
                            type="password"
                            value= {formData.confirmPassword}
                            onChange={(e)=> setFormData(prev => ({...prev, confirmPassword: e.target.value}))}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="re-enter password"
                            />
                        </label>

                        <button
                        onClick={handleSubmit}
                        className="w-full bg-purple-500 text-white py-2 rounded-md hover:bg-purple-600 transition-colors disabled:bg-gray-400 mt-3"
                        >
                            Sign Up
                        </button>
                     
                </div>
            </div>
        </div>
    )

}