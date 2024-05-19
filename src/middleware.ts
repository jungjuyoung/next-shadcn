import { auth } from './auth';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
	const session = await auth();
	console.log('middleware 실행중 !!! - session: ', session);
	if (!session) {
		return NextResponse.redirect(new URL('/login', request.url));
	}
}

// The middleware above will only work for routers that are matched below "Matched Paths".
export const config = {
	matcher: ['/', '/dashboard']
};
