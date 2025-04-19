import React from 'react'

function Weather() {
    return (
        <div className='w-full h-[calc(55%-2rem)] bg-[#111214] rounded-2xl'>
            <div className="search-top">
                <div className="location">
                    Vilnius
                </div>
                <div className="seach-location">
                    <input type="text" placeholder='Tell me where' className="search-input" />
                    <button type='button' className=" p-2  text-gray-400 hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-full">
                        <svg className='w-10 h-10'
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fill="currentColor"
                                d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14"
                            ></path>
                        </svg>
                    </button>
                </div>
            </div>
            <div className="weather-data">

            </div>
        </div>
    )
}

export default Weather