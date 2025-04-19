import React from 'react'
import News from './components/News'

function App() {

  return (
    <div className='w-full h-screen bg-gradient-to-r from-[#b88efc] to-[#6877f4] grid place-items-center'>
      <div className='w-[95vw] h-[95vmin] bg-[#060709] shadow-2xl rounded-lg'>
        <News />
      </div>
    </div>
  )
}

export default App
