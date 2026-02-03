import { useEffect, useState } from "react";

interface TypingMessageProps {
  text: string;
  speed?: number; // milliseconds per character
}

export default function TypingMessage({ text, speed = 20 }: TypingMessageProps) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (!text) return;

    let index = 0;
    setDisplayedText("");

    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText((prev) => prev + text.charAt(index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return <span className="leading-3">{displayedText}</span>;
}
