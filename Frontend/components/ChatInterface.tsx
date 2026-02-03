// ChatInterface.jsx
import React, { useEffect, useRef } from 'react';
import TypingDots from './ui/TypingDots';
import { Brain } from 'lucide-react';
import TypingMessage from '@/components/ui/TypingMessage';

type Message = {
  sender: string;
  text: string;
};

interface ChatInterfaceProps {
  messages: Message[];
  isTyping: boolean;
}

export default function ChatInterface({ messages, isTyping }: ChatInterfaceProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div 
      ref={containerRef}
      className="flex flex-col gap-3 p-4 rounded-md overflow-y-auto flex-grow max-h-[80vh] min-h-[70vh]
      [scrollbar-color:black_#e5e7eb] [scrollbar-width:thin] [scrollbar-background:#e5e7eb]"
    >
      {messages.map((msg, idx) => (
        <div 
          key={idx} 
          className={`max-w-[100%] p-3  
            ${msg.sender === "user" ? "bg-primary text-white self-end rounded-full" : "text-white self-start rounded-lg"}`}
        >
          {msg.sender === "bot" ? <TypingMessage text={msg.text} speed={20} /> : msg.text}
        </div>
      ))}
       {isTyping && (
          <div className="p-1 bg-primary rounded-full flex items-center space-x-2 auto w-max">
            <TypingDots />
          </div>
        )}
    </div>
  );
}
