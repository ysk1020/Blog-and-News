import React, { useState, useEffect } from 'react'
import axios from 'axios'

import NewsGrid from './NewsGrid'
import NewsModal from './NewsModal'
import Weather from './Weather'
import Calendar from './Calendar'
import BlogModal from './BlogModal'

import noImg from '../assets/No-image-available.png'
import github from '../assets/github-mark-white.svg'
import knight from '../assets/knight.jpg'

const News = ({ onShowBlogs, blogs, onEdit, onDelete }) => {
    const [headline, setHeadline] = useState(null);
    const [newGrid, setNewsGrid] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedArt, setSelectedArt] = useState(null);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [showBlogModal, setShowBlogModal] = useState(false);

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

            } catch (error) {
                console.error('Failed to fetch news:', error)
            }
        };
        fetchNews()
    }, []);


    function handleArticleClick(article) {
        setSelectedArt(article);
        setShowModal(true);
    }

    return <div className="text-[2rem] text-[#fff] w-full h-full flex-col justify-between gap-x-8 gap-y-4 ">
        {/* HEADER */}
        <header header className="flex flex-row justify-between w-full min-h-[7rem] bg-[#111214] bg-opacity-25 rounded-tl-[2rem] rounded-tr-[2rem]" >
            <h1 className="text-5xl font-bold uppercase bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent px-8 py-[2rem]">
                Write &amp; Read
            </h1>
            <div className='px-8 py-[2rem]'>
                <form className="flex items-center max-w-md mx-auto ">
                    <label className="sr-only">Search</label>
                    <div className=" flex items-center bg-gray-800 bg-opacity-25 rounded-full px-3 py-1 w-full max-w-md">
                        <input type='text' placeholder='Search' className="w-full outline-none bg-gray-800 bg-opacity-5 pl-4 text-md" />
                        <button type='button' className="p-2 text-gray-400 hover:text-gray-200 cursor-pointer hover:ring-2 hover:ring-purple-500 rounded-full">
                            <i className='bx bx-search-alt-2 '></i>
                        </button>
                    </div>
                </form>
            </div>
        </header >
        <div className="flex lg:flex-row gap-x-8 gap-y-4 h-[calc(100%-12rem)] px-8 py-[2rem]">
            {/* SIDE BAR */}

            <div className="w-full lg:w-[18rem] flex-shrink-0 h-full flex flex-col gap-y-8">
                {/* USER */}
                < div className="flex flex-col p-4 w-full h-1/4 bg-[#111214] bg-opacity-25 rounded-2xl items-center shadow">
                    <img
                        src={knight}
                        alt="User avatar"
                        className='flex w-20 h-20 rounded-full object-cover ring-2 ring-purple-500 m-3'
                        onClick={onShowBlogs} />
                    <h2 className="text-md font-semibold">Mary Stone</h2>
                    <div className="w-full border-t border-gray-700 pt-2 text-sm text-gray-200 ">
                        Last Login: 2h ago
                    </div>
                </div>

                {/* CATEGORIES */}
                <div className="w-full h-[calc(75%-2rem)] bg-[#111214] bg-opacity-25 rounded-2xl">
                    <h2 className='text-md font-extrabold text-gray-300 uppercase tracking-wider text-center m-4'>Categories</h2>
                    <ul className="text-gray-400 px-6 py-4 space-y-4">
                        {[
                            'General',
                            'World',
                            'Business',
                            'Technology',
                            'Entertainment',
                            'Sports',
                            'Science',
                            'Health',
                            'Nation'
                        ].map((cat) => (
                            <li
                                key={cat}
                                className="text-[1.5rem] hover:text-purple-400 cursor-pointer transition-colors"
                            >
                                {cat}
                            </li>
                        ))}
                        <li className="flex items-center gap-2 text-[1.5rem] hover:text-purple-400 cursor-pointer transition-colors">
                            Bookmarks
                            <i className='bx bxs-bookmarks' ></i>
                            {/* <svg
                                className="w-5 h-5 text-gray-400 group-hover:text-purple-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M5 2a2 2 0 00-2 2v14l7-4 7 4V4a2 2 0 00-2-2H5z" />
                            </svg> */}
                        </li>
                    </ul>
                </div>
            </div>

            <div className="w-custom h-full rounded-2xl">
                {/* HEADLINE */}
                <div className="h-[calc(50%-2rem)] bg-[#111214] bg-opacity-25 rounded-2xl mb-8 overflow-hidden transition relative cursor-pointer"
                    onClick={() => handleArticleClick(headline)}>
                    {
                        headline ? <>
                            <img src={headline.image || noImg} alt={headline.description} className='relative w-full h-full object-cover border-inherit rounded-2xl' />
                            <h3 className="absolute w-full px-[1rem] py-[1rem] pr-[4rem] font-['Bebas Neue','sans-serif'] text-headline tracking-[0.1rem] text-white bg-black/70 rounded-md -translate-y-[7.5rem]">
                                {headline.title}
                                <i className='bx bx-bookmark'></i>
                                {/* <svg
                                    className="absolute top-2 right-2 p-2 bg-black/60 rounded-full hover:bg-black/80 transition w-10 h-10"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M5 2a2 2 0 00-2 2v14l7-4 7 4V4a2 2 0 00-2-2H5z" />
                                </svg> */}
                            </h3>
                        </>
                            : <div className="text-white text-[1.5rem] animate-pulse px-[22rem] py-[12rem]">Loading...</div>
                    }
                </div>

                {/* NEWS GRID */}
                <div className="w-full h-1/2 bg-[#111214] bg-opacity-25 rounded-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {
                        newGrid ? newGrid.map((news, index) => (
                            <NewsGrid key={index} image={news.image || noImg} title={news.title} onClick={() => handleArticleClick(news)} />
                        )) : <div className="text-white text-xl animate-pulse">Loading...</div>
                    }
                </div>
            </div>
            <NewsModal show={showModal} article={selectedArt} onClose={() => { setShowModal(false) }} />

            {/* BLOG PLACE */}
            <div className="flex flex-col gap-x-[3rem] pb-[2rem] w-blog h-full bg-[#111214] bg-opacity-25 rounded-2xl">
                <h1 className=" font-['Bebas Neue','sans-serif'] font-[3rem] text-[#ddd] p-[2rem] ">
                    My Blogs
                </h1>
                <div className=" flex flex-wrap justify-between gap-[1.2rem] p-[1.2rem]">
                    {blogs.map((blog, index) => (
                        <div key={index} className="relative w-[calc(50%-0.6rem)] h-[12rem] rounded-[1rem] group " onClick={() => {
                            setSelectedBlog(blog);
                            setShowBlogModal(true);
                        }}>
                            <img src={blog.img || noImg} alt="Post" className='w-full h-full object-cover rounded-[1rem] opacity-75' />
                            <h3 className='absolute w-full bottom-0 left-0 p-[1rem] bg-[rgba(0,0,0,0.7)] rounded-bl-[1rem] rounded-br-[1rem] text-[1.6rem] uppercase font-semibold text-[#ddd] break-words'>
                                {blog.title}
                            </h3>

                            <div className="post-buttons absolute top-[1rem] right-[1rem] flex justify-right gap-[2rem] opacity-0 invisible transition-all duration-300 group-hover:opacity-100 group-hover:visible">
                                <button className='bg-transparent border-none text-[2.5rem] cursor-pointer'
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onEdit(blog)
                                    }}>
                                    <i className="bx bxs-edit"></i>
                                </button>
                                <button className='bg-transparent border-none text-[2.5rem] cursor-pointer '
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onDelete(blog)
                                    }}>
                                    <i className="bx bxs-x-circle"></i>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <BlogModal
                show={showBlogModal}
                blog={selectedBlog}
                onClose={() => setShowBlogModal(false)} />

            {/* WIDGETS */}
            <div className="flex flex-col gap-y-8 ">
                <Calendar />
                <Weather />
            </div>
        </div>

        {/* FOOTER */}
        <footer className="w-full bg-[#111214]  bg-opacity-25  rounded-br-[2rem] rounded-bl-[2rem] py-4">
            <div className="max-w-7xl mx-auto flex md:flex-wrap sm:flex-row items-center justify-center sm:justify-between text-sm gap-4">
                <a href="https://github.com/ysk1020/Blog-and-News" className="inline-block hover:text-white">
                    <img src={github} alt="GitHub logo" className="w-6 h-6 sm:mx-0" />
                </a>
                <p>&copy; 2025 Write & Read. All rights reserved.</p>
                <p>Created by <span className="text-purple-400 font-semibold">Yussuf Uali</span></p>
            </div>
        </footer>
    </div >

}


export default News;