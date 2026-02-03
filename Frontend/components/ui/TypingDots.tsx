import React from 'react'

export default function TypingDots() {
  return (
    <div className="flex space-x-1">
      <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce animation-delay-200"></span>
      <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce animation-delay-400"></span>
      <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce animation-delay-600"></span>
      <style jsx>{`
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-400 { animation-delay: 0.4s; }
        .animation-delay-600 { animation-delay: 0.6s; }
      `}</style>
    </div>
  )
}
