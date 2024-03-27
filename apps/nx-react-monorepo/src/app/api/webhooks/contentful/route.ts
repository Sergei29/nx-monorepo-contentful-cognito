import { NextResponse, NextRequest } from 'next/server';
import { revalidateTag } from 'next/cache';

import type { WhPayloadBody } from '../../../../types';

import { HEADERS, CONTENT_TYPE } from '../../../../constants';
import { getErrorMessage } from '../../../../lib/common';
import { env } from '../../../../lib/env';

const { BOOKS, GAMES, MOVIES } = CONTENT_TYPE;

export const POST = async (request: NextRequest) => {
  const requestHeaders = new Headers(request.headers);
  const secret = requestHeaders.get(HEADERS.CONTENTFUL_WH_SECRET);

  if (secret !== env.CONTENTFUL_WH_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  const body = (await request.json()) as WhPayloadBody;

  try {
    switch (body.contentType) {
      case BOOKS:
        revalidateTag(BOOKS);
        break;
      case GAMES:
        revalidateTag(GAMES);
        break;
      case MOVIES:
        revalidateTag(MOVIES);
        break;
      default:
        console.warn(`Unknown content type: "${body.contentType}"`);
        break;
    }
  } catch (error) {
    console.warn('Api, revalidate tag error:', getErrorMessage(error));
  }

  return NextResponse.json(
    { revalidated: true, now: Date.now() },
    { status: 200 }
  );
};
