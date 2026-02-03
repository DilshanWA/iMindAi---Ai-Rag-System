import React from 'react'

const Cards = [
  {
    title: "Smart Analysis",
    description: "Intelligent content understanding",
    icon: './star.png',
  },
  {
    title: "Natural Q&A",
    description: "Ask in plain English",
    icon: './chat.png',
  },
  {
    title: "Get Insights",
    description: "Real-time responses",
    icon: './lightning.png',
  },
];

function Headertitles() {
  return (
    <div className='w-full mx-auto px-3 sm:px-6 '>
      <div className='mt-5 w-full'>
        <h1 className="text-5xl font-bold text-center mb-4">
          Welcome to
          <span className='font-bold bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent'> iMind.Ai</span>
        </h1>
        <p className="text-center text-gray-400 text-lg max-w-2xl mx-auto">
          Your AI-powered document intelligence platform. Upload documents, <br /> ask questions, and get instant insights powered by advanced AI.
        </p>
      </div>

      <div className='hidden md:flex mt-10 flex-col sm:flex-row justify-center items-center sm:space-x-6 space-y-6 sm:space-y-0'>
        {Cards.map((card, index) => (
          <div
            key={index}
            className="bg-card-background backdrop-blur border border-gray-800 rounded-lg shadow-md p-4 w-44 sm:w-48 h-40 flex flex-col justify-center items-center hover:shadow-xl transition-shadow"
          >
            <img src={card.icon} alt={card.title} className='w-8 mb-2' />
            <h2 className="text-sm font-semibold mb-2 text-white text-center">{card.title}</h2>
            <p className="text-gray-300 text-center text-[12px]">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Headertitles
