'use client'
import React,{useCallback} from 'react'
import { FaPlus } from "react-icons/fa6";
import { IoSend } from "react-icons/io5";
import HeaderTitle from '@/components/ui/Headertitles';
import ChatInterface from '@/components/ChatInterface';

export default function Page() {
  const fileInputRef = React.useRef<HTMLInputElement | null>(null)
  const [message, setMessage] = React.useState("");
  const [file, setFile] = React.useState<File | null>(null);
  const [chatMessages, setChatMessages] = React.useState<{ sender: string; text: string }[]>([]); 
  const [isTyping, setIsTyping] = React.useState(false);


  // Send message handler
  const handleSend = async () => {
    const trimmed = message.trim();
    if (trimmed === "") return;
    
    // Add user message
    setChatMessages(prev => [...prev, { sender: "user", text: trimmed }]);
    setMessage("");
    setIsTyping(true);

    try{
      const response = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: trimmed }),
      });
      const data = await response.json();
      console.log(data);
      setChatMessages(prev => [...prev, { sender: "bot", text: data.response }]);
      setIsTyping(false);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      setChatMessages(prev => [...prev, { sender: "bot", text: "Error: " + "Something went wrongPlease start new conversation" }]);
      setIsTyping(false);
    }
  };

  const handleFileUpload = async(e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setChatMessages(prev => [...prev, { sender: "user", text: `Uploaded file: ${uploadedFile.name}` }]);
      try{
         const forData = new FormData();
         forData.append('file', uploadedFile);
         const response = await fetch('http://localhost:8000/upload', {
          method: 'POST',
          body: forData,
         });
         const data = await response.json();
         console.log(data);
         setChatMessages(prev => [...prev, { sender: "bot", text: data.response }]);
         // You can handle the response as needed
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        setChatMessages(prev => [...prev, { sender: "bot", text: "Error: " + "Something went wrongPlease start new conversation" }]);
      }
     
      
    }
  };

  const handleClickupload = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center px-3 sm:px-6">
      <div className="flex flex-col w-full max-w-3xl mt-10">
        {chatMessages.length === 0 ? (
          <div className='flex flex-col items-center justify-center flex-grow'>
            <HeaderTitle />
          </div>
        ) : (
          <ChatInterface messages={chatMessages} isTyping={isTyping} />
        )}

        <div className="flex items-center gap-3 px-3 sm:px-4 py-3 sm:py-2 rounded-full shadow-md bg-primary text-white mt-9">
          <FaPlus 
          className="text-lg sm:text-xl text-gray-400 hover:text-gray-400 cursor-pointer" 
          onClick={handleClickupload}
          />
          <input 
          ref={fileInputRef}
          type="file"
          onChange={handleFileUpload}
          accept='.txt,.doc,.pdf'
          className="hidden"

           />
          <input 
            type="text"
            placeholder="Type your message..."
            className="flex-grow bg-transparent outline-none text-white placeholder:text-white/70 py-2 overflow-y-auto max-h-24"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSend();
              }
            }}
          />
            <IoSend className="text-lg sm:text-xl" size={25} color='white'  onClick={handleSend}/>
        </div>
      </div>
    </div>
  );
}
