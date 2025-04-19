import React, { useState, useEffect } from 'react'
import axios from 'axios'

import NewsGrid from './NewsGrid'
import NewsModal from './NewsModal'
import Weather from './Weather'
import Calendar from './Calendar'

import noImg from '../assets/image-block_15841194.png'

const News = () => {
    const [headline, setHeadline] = useState(null);
    const [newGrid, setNewsGrid] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedArt, setSelectedArt] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            const url = `https://gnews.io/api/v4/top-headlines?category=general&lang=en&apikey=${import.meta.env.VITE_NEWS_KEY}`
            try {
                const response = await axios.get(url)
                const fetchedNews = response.data.articles

                fetchedNews.forEach(element => {
                    if (!element.image) {
                        element.image = noImg
                    }
                });

                setHeadline(fetchedNews[0])
                setNewsGrid(fetchedNews.slice(1, 7))
                console.log(newGrid)
            } catch (error) {
                console.error('Failed to fetch news:', error)
            }
        };
        fetchNews()
    }, [newGrid]);


    function handleArticleClick(article) {
        setSelectedArt(article);
        setShowModal(true);
    }

    return <div className="text-[2rem] text-[#fff] w-full h-full flex-col justify-between gap-x-8 gap-y-4 shadow-2xl">
        {/* HEADER */}
        <header header className="flex flex-row justify-between w-full min-h-[7rem] bg-[#111214] rounded-tl-2xl rounded-br-[0] rounded-tr-2xl rounded-bl-[0]" >
            <h1 className="text-5xl font-bold uppercase bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent px-8 py-[2rem]">Write &amp; Read</h1>
            <div className='px-8 py-[2rem]'>
                <form className="flex items-center max-w-md mx-auto ">
                    <label className="sr-only">Search</label>
                    <div className=" flex items-center bg-gray-800 rounded-full px-3 py-1 w-full max-w-md">
                        <input type='email' placeholder='Search' className="w-full outline-none bg-gray-800 pl-4 text-md" />
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
                </form>
            </div>
        </header >
        <div className="flex gap-x-8 gap-y-4 h-[calc(100%-16rem)] px-8 py-[2rem]">
            {/* SIDE BAR */}

            <div className="w-[18rem] h-full flex flex-col gap-y-8">
                {/* USER */}
                <div className="flex flex-col w-full h-1/4 bg-[#111214] rounded-2xl">
                    <div className="place-items-center p-1 m-2 ">
                        <img
                            src="https://images.unsplash.com/photo-1592621385612-4d7129426394?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="User avatar"
                            className='flex w-20 h-20 rounded-full object-cover ring-2 ring-purple-500 ' />
                    </div>
                    <div className="text-center">
                        <h2 className="text-md font-semibold">Mary Stone</h2>
                    </div>
                    <div className="w-full border-t border-gray-700 pt-2 text-sm text-gray-500 text-center">
                        Last Login: 2h ago
                    </div>
                </div>

                {/* CATEGORIES */}
                <div className="w-full h-[calc(80%-2rem)] bg-[#111214] rounded-2xl">
                    <h2 className='text-md font-extrabold text-gray-300 uppercase tracking-wider text-center m-4'>Categories</h2>
                    <ul className='text-gray-400 m-5 p-5 border-t space-y-5'>
                        <li className=" text-[1.5rem] hover:text-purple-400 cursor-pointer">General</li>
                        <li className="text-[1.5rem] hover:text-purple-400 cursor-pointer ">World</li>
                        <li className="text-[1.5rem] hover:text-purple-400 cursor-pointer">Business</li>
                        <li className="text-[1.5rem] hover:text-purple-400 cursor-pointer">Technology</li>
                        <li className="text-[1.5rem] hover:text-purple-400 cursor-pointer">Entertainment</li>
                        <li className="text-[1.5rem] hover:text-purple-400 cursor-pointer">Sports</li>
                        <li className="text-[1.5rem] hover:text-purple-400 cursor-pointer">Science</li>
                        <li className="text-[1.5rem] hover:text-purple-400 cursor-pointer">Health</li>
                        <li className="text-[1.5rem] hover:text-purple-400 cursor-pointer">Nation</li>
                        <li className="text-[1.5rem] flex items-center gap-2 hover:text-purple-400 cursor-pointer">
                            Bookmarks
                            <svg
                                className="w-4 h-4 text-gray-400 group-hover:text-purple-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M5 2a2 2 0 00-2 2v14l7-4 7 4V4a2 2 0 00-2-2H5z" />
                            </svg>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="w-custom h-full rounded-2xl">
                {/* HEADLINE */}
                {headline && <div className="h-[calc(50%-2rem)] bg-[#111214] rounded-2xl mb-8 overflow-hidden transition relative"
                    onClick={() => handleArticleClick(headline)}>
                    <img src={headline.image} alt={headline.description} className='relative w-full h-full object-cover border-inherit rounded-2xl' />
                    <h3 className="absolute w-full px-[1rem] py-[1rem] pr-[4rem] font-['Bebas Neue','sans-serif'] text-headline tracking-[0.1rem] text-white bg-black/70 rounded-md -translate-y-[7.5rem]">
                        {headline.title}
                        <svg
                            className="absolute top-2 right-2 p-2 bg-black/60 rounded-full hover:bg-black/80 transition w-10 h-10"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M5 2a2 2 0 00-2 2v14l7-4 7 4V4a2 2 0 00-2-2H5z" />
                        </svg>
                    </h3>
                </div>}

                {/* NEWS GRID */}
                <div className="w-full h-1/2 bg-[#111214] rounded-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {
                        newGrid && newGrid.map((news, index) => (
                            <NewsGrid key={index} image={news.image} title={news.title} onClick={() => handleArticleClick(news)} />
                        ))}
                </div>
            </div>
            <NewsModal show={showModal} article={selectedArt} onClose={() => { setShowModal(false) }} />

            {/* BLOG PLACE */}
            <div className="w-blog h-full bg-[#111214] rounded-2xl">
                My Blogs
            </div>

            {/* WIDGETS */}
            <div className="flex-[1] flex flex-col gap-y-8">
                <Weather />
                <Calendar />
            </div>
        </div>

        {/* FOOTER */}
        <footer className='w-full min-h-[8.5rem] bg-[#111214] rounded-tl-[0] rounded-br-2xl rounded-tr-[0] rounded-bl-2xl'>
            Footer
        </footer>
    </div >

}


export default News;