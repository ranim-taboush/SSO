"use client"
import { useEffect, useState } from 'react';
import Pusher from 'pusher-js';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    console.log('process.env.NEXT_PUBLIC_PUSHER_APP_KEY', process.env.NEXT_PUBLIC_PUSHER_APP_KEY)
    console.log('process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER', process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER)
    
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER,
    });

    const channel = pusher.subscribe('arabhardware');
    channel.bind('login', (data) => {
      setNotifications((prev) => [...prev,  `User login updated: ${data?.userId}`]);
    });
    channel.bind('logout', (data) => {
      setNotifications((prev) => [...prev,  `User logout updated: ${data?.userId}`]);
    });
    channel.bind('profileUpdate', (data) => {
      setNotifications((prev) => [...prev,  `User profileUpdate updated: ${data?.userId}`]);
    });

    return () => {
        pusher.unsubscribe('arabhardware');
        };
    }, []);

    useEffect(()=>{
        localStorage.setItem('notification', notifications.toString())
    }, [notifications])
    // console.log('notifications', notifications)

  return (
    <div className='w-screen flex flex-col items-center justify-center gap-4 p-8'>
      <h2 className='text-3xl font-bold text-rose-800'>Notifications</h2>
      <ul className='grid grid-cols-1 items-center justify-between gap-8'>
        {notifications.map((notification, index) => (
          <li key={index}>{notification}</li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
