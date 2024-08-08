"use client"
import { useState, useEffect, Suspense, useRef } from "react";
import { useRouter } from "next/navigation";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import { useSearchParams } from 'next/navigation'
import $ from 'jquery';
import axios from "axios";

function SearchParamsComponent({setToken}) {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

    if(token){
      console.log('token2: ', token)
      sessionStorage.setItem('token', token);
      // setCookie('token ', token, {
      //   secure: true,
      //   sameSite: 'None',
      // })
      setToken(token)
    }

  return (
    <div></div>
  )
}

export default function Home() {
  const router = useRouter()
  const iframe1 = useRef(null)
  const [name, setName] = useState('')
  const [token, setToken] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [ahwSession, setAhwSession] = useState(getCookie('arabhardware_session'))
  
  let baseUrl = "https://sso-2.vercel.app/"
  let timing = 5000
  // console.log('getCookie', getCookie("jwt_token", { secure: true, sameSite: 'None', domain: "localhost"}))
  // console.log('getCookie1', getCookie("jwt_token", { secure: true, sameSite: 'None', domain: "arabhardware.com"}))

  useEffect(()=>{
    // document.cookie = "arabhardware_session" + ""+ "; Domain=localhost; path=/; SameSite=None; Secure";
    setAhwSession(getCookie('arabhardware_session', { secure: true, sameSite: 'None',}))
    // const getMessage = event => {
    //   console.log('event.origin', event.origin)
    //   if (event.origin === 'https://myaccount.arabhardware.com') {
    //       console.log(event.data);
    //   } else {
    //       return;
    //   }
    // }
    // window.addEventListener('message', getMessage(event))

    // return () => {
    //   window.removeEventListener('message', getMessage(event))
    // }
  }, [getCookie('arabhardware_session')])

  useEffect(()=>{
      // console.log('iframe1.current', iframe1.current)
    if(iframe1.current){
      // console.log('sending', sending)
      iframe1.current?.contentWindow?.postMessage({ token: name }, `${baseUrl}/login`);
    }
  }, [iframe1?.current])

  const gettingData = async() => {
    // console.log('getting data...')
    if(window){
      // setTimeout(()=>{
      //     window.frames[0].document.getElementById('token')
      // }, [1000])
    }
    // console.log('done data...')
  }

  const getDataFromMyAccount = async() => {
    console.log('getting data from myaccount')
    await axios.get('https://myaccount.arabhardware.com/api/refresh')
    .then(res=>console.log('res', res))
    .catch(e=>console.log('e', e))
  }

  useEffect(()=>{
    gettingData()
    // console.log('sessionStorage1: ', sessionStorage.getItem('token'))
    setToken(sessionStorage.getItem('token'))
    getDataFromMyAccount()
  }, [])

  useEffect(()=>{
    // trying to fetch user and token from user_profile
    window.addEventListener('message', (event) => {
      // console.log('event.origin', event.origin)
      if (event.origin === 'https://user-profile-lyart.vercel.app') {
        console.log(event.data)
        // setCookie('user', event.data.user)
        // setCookie('token', event.data.token)
      }
    });
    return () => {}
  }, [])
  

  const handleClick = () => {
    if(name =='') alert('name is required')
    else {
      setIsLoading(true)
      setToken(name)
      sessionStorage.setItem('token', name);
      // setCookie('token', `${name}`, {
      //   secure: true,
      //   sameSite: 'None',
      // })
      setTimeout(() => {
        const iframe = document.getElementById('iframe1')
        console.log('iframe', iframe)
        if(iframe){
          console.log('sending...')
          iframe?.contentWindow?.postMessage({ token: name }, `${baseUrl}/login`);
            // console.log('name', name)
            window.setTimeout(()=>{
              router.push('/')
              setIsLoading(false)
            }, 2000)
        }
      }, timing);
    }
  }

  return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-10 p-24">
        <Suspense fallback={<div>Loading...</div>}>
          <SearchParamsComponent setToken={setToken} />
        </Suspense>
        {/* {isLoading &&
        <iframe ref={iframe1} id="iframe1" name="iframe1" src={`${baseUrl}/login?token=${name}`}
        sandbox="allow-same-origin allow-scripts"
        className="hidden"></iframe>}
        <p className="text-3xl text-red-700">
          {ahwSession}
        </p> */}
        <iframe id="iframe4" name="iframe4" src={`https://myaccount.arabhardware.com/refresh/cookie`}
        sandbox="allow-same-origin allow-scripts"
        className=""></iframe>
        <iframe id="iframe4" name="iframe4" src={`https://myaccount.arabhardware.com/api/refresh`}
        sandbox="allow-same-origin allow-scripts"
        className=""></iframe>
        {/* <h1 className="text-4xl font-bold tracking-tighter text-center">First Domain</h1>
        <input type="text" id="name" name="name" placeholder="your username" onChange={(e)=>setName(e.target.value)}
        className="border-black border-2 rounded-md p-2" />
        <button className="bg-black rounded-md text-white text-3xl py-2 px-6"
        onClick={handleClick}>
          {isLoading? 'sending...': 'LOGIN'}
        </button> */}
      </main>
  );
}
