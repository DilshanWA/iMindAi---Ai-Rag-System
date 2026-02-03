'use client';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/chat');
  };

  return <button onClick={handleClick}>Go to About</button>;
}
