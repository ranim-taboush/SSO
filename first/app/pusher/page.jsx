"use client"
import { useEffect,useState } from 'react'
import Pusher from 'pusher-js';

function Page() {
    const [userId, setUserId] = useState('')

    useEffect(()=>{
        console.log('process.env.NEXT_PUBLIC_PUSHER_APP_KEY', process.env.NEXT_PUBLIC_PUSHER_APP_KEY)
        console.log('process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER', process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER)
          // Enable pusher logging - don't include this in production
          Pusher.logToConsole = true;

          var pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY, {
            cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER
          });

          var channel = pusher.subscribe('arabhardware');
          channel.bind('login', function(data) {
            const notifi = `User login updated: ${data.userId}`
            console.log(notifi);
          });
  
        channel.bind(`logout`, (data) => {
            const notifi = `User logout updated: ${data.userId}`
            console.log(notifi);
        });
    
        channel.bind(`profileUpdate`, (data) => {
            const notifi = `profileUpdate updated: ${data.userId}`
            console.log(notifi);
        });
        
        // const beamsClient = new PusherPushNotifications.Client({
        //     instanceId: 'a3c296d7-7af1-49c2-96bb-18be6ab688b2',
        // });
        // beamsClient.start()
        //     .then(() => beamsClient.addDeviceInterest('hello'))
        //     .then(() => console.log('Successfully registered and subscribed!'))
        //     .catch(console.error);
    
        return () => {
            pusher.unsubscribe('arabhardware');
        };
    }, [])

    const loginUser = async () => {
        await fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId }),
        });
    };
    const logoutUser = async () => {
        await fetch('/api/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId }),
        });
    };
    const updateUser = async () => {
        await fetch('/api/update', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId }),
        });
    };

  return (<div className='w-screen h-dvh bg-white text-black flex items-center justify-center gap-4'>

        <div className="w-2/3 flex flex-col items-center justify-center gap-4">
        <h1 className='text-3xl font-bold'>
            Real-Time Updates with 
            <span className='text-rose-700'> Pusher</span>
        </h1>
        <input className='w-1/2 border outline-none border-red-700 rounded-sm focus:outline-none bg-rose-100 text-xl px-4 py-2'
        placeholder='enter your user id'
        onChange={(e)=>setUserId(e.target.value)} value={userId??''} />
        <button className='px-4 py-2 w-1/2 bg-rose-300 hover:bg-rose-400 rounded-sm'
        onClick={loginUser}>
            Login
        </button>
        <button className='px-4 py-2 w-1/2 bg-rose-300 hover:bg-rose-400 rounded-sm'
        onClick={logoutUser}>
            Logout
        </button>
        <button className='px-4 py-2 w-1/2 bg-rose-300 hover:bg-rose-400 rounded-sm'
        onClick={updateUser}>
            UpdateUser
        </button>
        </div>
    </div>)
}

export default Page