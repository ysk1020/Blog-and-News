import React from 'react'

function NewsGrid({ image, title, onClick }) {
    return (

        <div className="bg-[#111214] rounded-xl overflow-hidden shadow-md hover:shadow-lg transition"
            onClick={onClick}>
            <img src={image} alt={title} className="w-full h-40 object-cover" />
            <div className="p-4 text-white">
                <h3 className="text-lg font-semibold mb-2">{title}</h3>
            </div>
        </div>
    );

}

export default NewsGrid
