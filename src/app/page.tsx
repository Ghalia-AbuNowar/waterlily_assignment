import Link from "next/link";


export default function Home(){
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-8">
            <div className="max-w-2xl mx-auto text-center">
                <div className="mb-10">
                    <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
                        Welcome To Waterlily
                    </h1>
                    <p className="text-xl text-gray-600">
                        Help us understand your needs by completing this survey
                    </p>

                </div>

                {/* survey steps */}
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">
                        What to expect
                    </h2>

                    <div className="grid grid-cols-3  gap-6">
                        <div className="bg-white rounded-lg p-6 shadow-md">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-blue-500 font-bold">
                                    1
                                </span>   

                            </div>
                             <h3 className="text-lg font-semibold text-gray-800 mb-1">
                                    Demographic Information
                            </h3>
                            <p className="text-gray-600 text-sm">
                                Basic Demographic Information about you
                            </p>

                        </div>

                        <div className="bg-white rounded-lg p-6 shadow-md">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-green-500 font-bold">
                                    2
                                </span>   

                            </div>
                             <h3 className="text-lg font-semibold text-gray-800 mb-1">
                                    Health Information
                            </h3>
                            <p className="text-gray-600 text-sm">
                                Basic Health Information about you
                            </p>

                        </div>

                        <div className="bg-white rounded-lg p-6 shadow-md">
                            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-orange-500 font-bold">
                                    3
                                </span>   

                            </div>
                             <h3 className="text-lg font-semibold text-gray-800 mb-1">
                                    Financial Information
                            </h3>
                            <p className="text-gray-600 text-sm">
                                Basic Financial Information about you
                            </p>

                        </div>

                    </div>

                    

                </div>

                <div className="mt-4">
                    <Link href="/auth/signup">
                        <button className="w-full bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
                            Start Survey
                        </button>
                    </Link>

            </div>
            
            </div>

 
           
        </div>
    )
}