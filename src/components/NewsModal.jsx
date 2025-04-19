import React from 'react'

const NewsModal = ({ show, article, onClose }) => {
    if (!show) {
        return null;
    }
    return (
        <div className='fixed inset-0 bg-black/70 flex items-center justify-center z-[1000]'>
            <div className="w-[90%] max-w-[60rem] max-h-full bg-[#111214] p-16 rounded-xl shadow-[0_0_5rem_4rem_rgba(0,0,0,0.5)] relative">
                <span className="absolute top-4 right-8 text-white text-3xl cursor-pointer hover:ring-2 hover:ring-purple-500 rounded-full"
                    onClick={onClose}
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
                {article && (
                    <>
                        <img src={article.image} alt={article.title} className="w-full h-auto max-h-[30rem] object-cover rounded-xl opacity-50" />
                        <h2 className="font-['Bebas Neue','sans-serif'] text-2xl text-white tracking-[0.1rem] mt-8">
                            {article.title}
                        </h2>
                        <p className="font-['Comfortaa','sans-serif'] text-[1.4rem] text-[#bbb] mt-4">
                            Source: {article.source.name}
                        </p>
                        <p className="text-[1.6rem] mt-8 leading-[2.7rem] text-[#ddd]">
                            {new Date(article.publishedAt).toLocaleString('en-US', { month: 'short', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </p>
                        <p className="text-[1.6rem] mt-8 leading-[2.7rem] text-[#ddd]">
                            {article.content}
                        </p>
                        <a href={article.url} target="_blank" rel="noopener noreferrer"
                            className="inline-block w-[15rem] mt-8 px-8 py-4 text-white bg-gradient-to-r from-[#b88efc] to-[#6877f4] rounded-[5rem] text-[1.6rem] text-center uppercase tracking-[0.1rem] active:translate-y-[0.1rem] transition">
                            Read More
                        </a>
                    </>
                )}
            </div>
        </div >
    )
}

export default NewsModal