import React, { useEffect, useState } from 'react'
import News from './components/News'
import Blogs from './components/Blogs'

import bgimage from './assets/neoclassical-medieval-portrait-knight-illustration.jpg'

function App() {
  const [showNews, setShowNews] = useState(true)
  const [showBlogs, setShowBlogs] = useState(false)
  const [blogs, setBlogs] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null)
  const [isEdit, setIsEdit] = useState(false)

  useEffect(() => {
    const savedBlogs = JSON.parse(localStorage.getItem('blogs')) || []
    setBlogs(savedBlogs)
  }, [])

  const handleCreateBlog = (newBlog, isEdit) => {

    setBlogs((prevBlogs) => {

      const updatedBlogs = isEdit ? prevBlogs.map((blog) => (blog === selectedPost ? newBlog : blog)) : [...prevBlogs, newBlog]
      localStorage.setItem('blogs', JSON.stringify(updatedBlogs))
      return updatedBlogs
    });
    setIsEdit(false)
    setSelectedPost(null)
  };

  const handleEditBlog = (blog) => {
    setSelectedPost(blog)
    setIsEdit(true)
    setShowNews(false)
    setShowBlogs(true)
  }

  const handleDeletBlog = (blogToDelete) => {
    setBlogs((prevBlogs) => {
      const updateBlogs = prevBlogs.filter((blog) => blog !== blogToDelete)
      localStorage.setItem('blogs', JSON.stringify(updateBlogs))
      return updateBlogs
    })
  }

  const handleShowBlogs = () => {
    setShowBlogs(true);
    setShowNews(false);
  }

  const handleBackToNews = () => {
    setShowBlogs(false);
    setShowNews(true);
    setIsEdit(false)
    setSelectedPost(null)
  }

  return (
    <div className='w-screen h-screen bg-no-repeat bg-cover grid place-items-center'
      // style={{
      //   backgroundImage: `linear - gradient(rgba(184, 142, 252, 0.3), rgba(184, 119, 244, 0.2)), url(${bgimage})`
      // }}
      style={{
        backgroundImage: `linear-gradient(rgba(6,7,9,0.7), rgba(6,7,9,0.2)), url(${bgimage})`
      }}
    >
      <div className='w-[95vw] h-[95vmin] bg-[#060709] bg-opacity-20 shadow-2xl rounded-[2rem]'>
        {showNews && <News onShowBlogs={handleShowBlogs} blogs={blogs} onEdit={handleEditBlog} onDelete={handleDeletBlog} />}
        {showBlogs && < Blogs onBackToNews={handleBackToNews} onCreateBlog={handleCreateBlog} editPost={selectedPost} isEdit={isEdit} />}
      </div>
    </div>
  )
}

export default App
