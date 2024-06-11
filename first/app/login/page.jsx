"use client"
import { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import { useSearchParams } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [name, setName] = useState('')
  const [token, setToken] = useState(getCookie('token'))
  const [isLoading, setIsLoading] = useState(false)


  useEffect(()=>{
    // if(token) deleteCookie('token')
    if(token) {
      console.log('token :>> ', token);
      window.setTimeout(()=>{
        router.push('/')
      }, 3000)
    }
  }, [token])

  const handleClick = () => {
    if(name =='') alert('name is required')
    else {
      setToken(name)
      setCookie('token', name)
      router.push('/')
    }
  }

  return (
    <Suspense>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        {token &&
        <iframe name="iframe1" src={`http://localhost:3001/login?token=${token}`}
        className="hidden"></iframe>}
        <input type="text" id="name" name="name" placeholder="your username" onChange={(e)=>setName(e.target.value)}
        className="border-black border-2 rounded-md p-2" />
        <button className="bg-black rounded-md text-white text-3xl py-2 px-6"
        onClick={handleClick}>
          {isLoading? 'sending...': 'LOGIN'}
        </button>
      </main>
    </Suspense>
  );
}
