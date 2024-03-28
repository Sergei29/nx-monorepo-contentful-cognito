import { NextResponse, NextRequest } from 'next/server';

import { getPusherInstance } from '../../../../lib/pusher/server';

const pusherServer = getPusherInstance();

export const POST = async (request: NextRequest) => {
  const data = await request.text();
  const [socketId, channelName] = data
    .split('&')
    .map((str) => str.split('=')[1]);

  /**
   * ...logic to check user permissions...
   *
   * DO NOT release to production without adding authorization logic,
   *  unless you want a private channel to be a public channel.
   */

  const authResponse = pusherServer.authorizeChannel(socketId, channelName);

  return NextResponse.json(authResponse, { status: 200 });
};
