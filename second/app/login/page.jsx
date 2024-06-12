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
        setIsLoading(false)
      }, 5000)
    }else if(searchParams.token){
      setCookie('token', searchParams.token)
      setToken(searchParams.token)
    }
  }, [token])

  const handleClick = () => {
    if(name =='') alert('name is required')
    else {
      setIsLoading(true)
      setToken(name)
      setCookie('token', name)
      // router.push('/')
    }
  }
  console.log('token :>> ', token);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <main className="flex min-h-screen flex-col items-center justify-center gap-10 p-24">
        {setIsLoading &&
        <iframe name="iframe1" src={`https://sso-1.vercel.app/login?token=${name}`}
        className="hidden"></iframe>}
        <h1 className="text-4xl font-bold tracking-tighter text-center">Second Domain</h1>
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
