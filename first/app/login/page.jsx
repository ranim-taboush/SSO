"use client"
import { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import { useSearchParams } from 'next/navigation'

function SearchParamsComponent({setToken}) {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

    if(token){
      console.log('token2: ', token)
      setCookie('token2: ', token)
      setToken(token)
    }

  return (
    <div></div>
  )
}

export default function Home() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [token, setToken] = useState(getCookie('token'))
  const [isLoading, setIsLoading] = useState(false)
  
  let baseUrl = "https://sso-2.vercel.app/"
  let timing = 5000

  useEffect(()=>{
    const iframe = document.getElementById('iframe1')
    iframe.contentWindow.postMessage({ token: 'testing post method' }, `${baseUrl}/login`);
    if(token) {
      window.setTimeout(()=>{
        router.push('/')
        setIsLoading(false)
      }, timing)
    }
  }, [token])

  const handleClick = () => {
    if(name =='') alert('name is required')
    else {
      setIsLoading(true)
      setToken(name)
      setCookie('token', `${name}`, {
        secure: true,
        sameSite: 'None',
      })
      // router.push('/')
    }
  }

  return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-10 p-24">
        <Suspense fallback={<div>Loading...</div>}>
          <SearchParamsComponent setToken={setToken} />
        </Suspense>
        {isLoading &&
        <iframe name="iframe1" src={`${baseUrl}/login?token=shazaTest`}
        sandbox="allow-same-origin allow-scripts"
        className="hidden"></iframe>}
        <h1 className="text-4xl font-bold tracking-tighter text-center">First Domain</h1>
        <input type="text" id="name" name="name" placeholder="your username" onChange={(e)=>setName(e.target.value)}
        className="border-black border-2 rounded-md p-2" />
        <button className="bg-black rounded-md text-white text-3xl py-2 px-6"
        onClick={handleClick}>
          {isLoading? 'sending...': 'LOGIN'}
        </button>
      </main>
  );
}
