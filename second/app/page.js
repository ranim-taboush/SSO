"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { setCookie, getCookie } from 'cookies-next';

export default function Home() {
  const router = useRouter()
  const [token, setToken] = useState(getCookie('token'))

  useEffect(()=>{
    if(!token) router.push(`/login`)
    
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-24 text-white bg-black">
      {token && <>
        <h1>Welcome home {token}</h1>
        <h2>happy to see you again</h2>
      </>}
    </main>
  );
}
