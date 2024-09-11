
import { NextResponse } from "next/server";
// import pusherMiddleware from "../pusher";
import pusher from "../pusher";

export async function POST(request, response) {
  try {
    const { userId } = await request.json();
    if (!userId) {
      return NextResponse.json({ status: 'failed', message: 'userId is required' }, { status: 404 });
    }

    await pusher.trigger('arabhardware', 'logout', { userId });
    console.log('Logout event triggered');
    return NextResponse.json({ status: 'success', message: `Logout event triggered ${userId}` }, { status: 200 });
  } catch (error) {
    console.log('error', error);
    return NextResponse.json({ status: 'failed', message: 'Server Error: ' + error.message }, { status: 500 });
  }
}