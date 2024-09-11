import Pusher from "pusher"
const pusher = new Pusher({
    appId: process.env.NEXT_PUBLIC_PUSHER_APP_ID,
    key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
    secret: process.env.NEXT_PUBLIC_PUSHER_APP_SECRET,
    cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER,
    useTLS: true,
});
  
export default pusher;

// const pusherMiddleware = (req, res, next) => {
//     console.log('appId', process.env.NEXT_PUBLIC_PUSHER_APP_ID)
//     console.log('key', process.env.NEXT_PUBLIC_PUSHER_APP_KEY)
//     console.log('secret', process.env.NEXT_PUBLIC_PUSHER_APP_SECRET)
//     console.log('cluster', process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER)
//     req.pusher = pusher;
//     next();
// };

// export default pusherMiddleware;
