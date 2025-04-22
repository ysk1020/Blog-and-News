import React from 'react';

const BlogModal = ({ show, blog, onClose }) => {
    if (!show || !blog) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
            <div className="relative w-[90%] max-w-3xl bg-[#111214] text-white rounded-2xl p-6 space-y-6 shadow-lg">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white hover:text-purple-400 text-2xl"
                >
                    <i className="bx bx-x"></i>
                </button>

                {/* Blog Content */}
                {blog.img && (
                    <img
                        src={blog.img}
                        alt="Blog Visual"
                        className="w-full h-64 object-cover rounded-xl"
                    />
                )}
                <h2 className="text-3xl font-bold font-['Bebas Neue','sans-serif'] tracking-wide">
                    {blog.title}
                </h2>
                <p className="text-lg leading-relaxed text-gray-300 whitespace-pre-wrap">
                    {blog.content}
                </p>
            </div>
        </div>
    );
};

export default BlogModal;
