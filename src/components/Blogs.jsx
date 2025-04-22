import React, { useEffect, useState } from 'react'
import knight from '../assets/knight.jpg'
import demo from '../assets/demo.jpg'

const Blogs = ({ onBackToNews, onCreateBlog, editPost, isEdit }) => {
    const [seeButton, setSeeButton] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [img, setImg] = useState(null)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [submitted, setSubmitted] = useState(false)

    useEffect(() => {
        if (isEdit && editPost) {
            setImg(editPost.img)
            setTitle(editPost.title)
            setContent(editPost.content)
            setShowForm(true)
            setSeeButton(false)
        } else {
            setImg(null)
            setTitle('')
            setContent('')
            setShowForm(false)
            setSeeButton(true)
        }
    }, [isEdit, editPost])

    const handleImgChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setImg(reader.result)
            }
            reader.readAsDataURL(e.target.files[0])
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!title.trim()) {
            alert("Please enter a title for your blog post.");
            return;
        }

        if (!content.trim()) {
            alert("Please enter content for your blog post.");
            return;
        }
        const newBlog = {
            img,
            title,
            content
        }
        onCreateBlog(newBlog, isEdit)
        setImg(null)
        setTitle('')
        setContent('')
        setShowForm(false)
        setSeeButton(true)
        setSubmitted(true)
        setTimeout(() => setSubmitted(false), 3000)
    }

    const handleFormButtonVisibility = () => {
        setShowForm(true);
        setSeeButton(false);
    }

    const handleClose = () => {
        setShowForm(false)
        setSeeButton(true)
    }

    return (
        <div className='w-full h-full flex'>
            <div className="w-[50%] h-full bg-cover bg-center bg-no-repeat rounded-bl-[2rem] rounded-tl-[2rem] relative"
                style={{
                    backgroundImage: `linear-gradient(rgba(184, 142, 252, 0.3), rgba(184, 119, 244, 0.2)), url(${demo})`
                }}>
                <img src={knight}
                    alt="user avatar"
                    className=' flex w-[20rem] h-[20rem] aspect-auto rounded-full object-cover ring-2 ring-[#6877f4]-500 relative top-[40%] left-[85%] ' />
            </div>
            <div className="relative w-[50%] h-full flex justify-center items-center">

                {
                    seeButton && <button
                        className="inline-block w-createBlogButton py-5 aspect-[4/1] bg-gradient-to-r from-[#b88efc] to-[#6877f4] rounded-[5rem] text-[1.6rem] text-center uppercase tracking-[0.1rem] active:translate-y-[0.1rem] transition"
                        onClick={handleFormButtonVisibility}>
                        <span className="font-['Bebas Neue','sans-serif'] text-[#ddd]">
                            Create New Post
                        </span>
                    </button>
                }
                {
                    showForm && <>
                        <div className="w-full max-w-lg mx-auto p-6 bg-[#111214] bg-opacity-50 rounded-2xl text-white space-y-6">
                            <h1 className="text-4xl text-transparent font-bold text-center bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 uppercase">
                                {isEdit ? 'Edit Post' : "New Post"}</h1>
                            <span className="absolute top-[30%] right-[30%] text-[#ddd] text-3xl cursor-pointer hover:ring-2 hover:ring-purple-500 rounded-full"
                                onClick={handleClose}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="24px"
                                    viewBox="0 0 24 24"
                                    width="24px"
                                    fill="currentColor"
                                >
                                    <path d="M0 0h24v24H0V0z" fill="none" />
                                    <path
                                        d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
                                    />
                                </svg>
                            </span>
                            <label className="flex items-center gap-2 cursor-pointer text-purple-400 hover:text-purple-300">
                                <i className='bx bx-upload text-xl'></i>
                                <span>Upload Image</span>
                                <input type="file" className="hidden" onChange={handleImgChange} />
                            </label>
                            <input
                                type="text"
                                maxLength="60"
                                placeholder="Add Title (Max 60 characters)"
                                className="w-full bg-transparent border-b-2 border-purple-500 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-400 py-2"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <textarea
                                rows="6"
                                placeholder="Add Text"
                                className="w-full bg-transparent border-b-2 border-purple-500 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-400 py-2 resize-none"
                                value={content}
                                onChange={(e) => setContent(e.target.value)} />
                            <button
                                type="submit"
                                className="w-full py-3 text-white font-semibold rounded-full bg-gradient-to-r from-purple-400 to-indigo-500 hover:from-purple-500 hover:to-indigo-600 transition"
                                onClick={handleSubmit}
                            >
                                {isEdit ? 'Update Post' : 'Submit Post'}
                            </button>
                        </div>
                    </>
                }
                {submitted && (
                    <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg text-lg z-50">
                        🎉 Blog post submitted successfully!
                    </div>
                )}

                <button className="absolute top-12 right-10 flex items-center gap-2 font-['Bebas Neue','sans-serif'] font-bold text-4xl text-[#ddd] hover:text-purple-500 transition uppercase"
                    onClick={onBackToNews} >
                    <span>Back</span>
                    <i className='bx bx-chevron-right'></i>
                </button>
            </div>
        </div >
    )
}

export default Blogs