import { AuthUser } from '@/model/User';
import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
	interface Session {
		user: {
			nickname: string;
		} & AuthUser &
			DefaultSession['user'];
	}
}
