'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [status, setStatus] = useState('not registered');

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setStatus(data.status);
    };

    return () => {
      ws.close();
    };
  }, []);

  const updateStatus = (newStatus) => {
    const ws = new WebSocket('ws://localhost:8080');
    ws.onopen = () => {
      ws.send(JSON.stringify({ type: 'updateStatus', status: newStatus }));
    };
  };

  return (
    <div className='w-screen h-screen flex items-center justify-around flex-col text-2xl'>
      <h1>Status: {status}</h1>
      <div className="space-y-4 w-1/4">
        <button 
        className='p-4 bg-rose-200 cursor-pointer w-full block'
        onClick={() => updateStatus('registered')}>
            Register
        </button>
        <button 
        className='p-4 bg-rose-200 cursor-pointer w-full block'
        onClick={() => updateStatus('not registered')}>
            Unregister
        </button>
      </div>
    </div>
  );
}
