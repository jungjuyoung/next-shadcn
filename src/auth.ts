import NextAuth from 'next-auth';
import NextAuthOptionsfrom from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { cookies } from 'next/headers';
import cookie from 'cookie';

export const {
	handlers: { GET, POST },
	signIn,
	signOut,
	auth
} = NextAuth({
	pages: {
		signIn: '/login'
	},
	providers: [
		Credentials({
			authorize: async credentials => {
				console.log('[auth] credentials: ', credentials);
				// api 요청
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_AUTH_BASE_URL}/auth/login`,
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							email: credentials.email,
							password: credentials.password
						})
					}
				);

				console.log('[auth] response: ', response);
				let setCookie = response.headers.get('Set-Cookie'); // 쿠키를 가져와서
				console.log('[auth] setCookei: ', setCookie);
				if (setCookie) {
					const parsed = cookie.parse(setCookie); // 가져온 쿠키를 객체로 변경
					cookies().set('connect.sid', parsed['connect.sid'], parsed); // 브라우저에 가져온 쿠키를 심는다.
				}

				if (!response.ok) return null;

				const user = await response.json();
				if (user) {
					console.log('[auth] user: ', user);
					return {
						...user,
						nickname: user.nickname
					};
				} else {
					return null;
				}
			}
		})
	],
	callbacks: {
		async signIn({ user: { id, name, image, email } }) {
			console.log('id', id, 'name', name, 'email', email);
			// if (!email) { // KaKao는 email이 없을 수 있음.
			//   return false
			// }
			return true;
		},
		async session({ session, token }) {
			console.log('[auth] session', session, 'token: ', token);
			const user = session?.user;
			if (user) {
				session.user = {
					...user,
					nickname: user.nickname
				};
				session.user.nickname;
			}
			console.log('[auth] session', session, '---- end');
			return session;
		},
		async jwt({ token, user }) {
			console.log('[auth] token: ', token, 'user: ', user);
			if (user) {
				token.id = user.id;
			}
			return token;
		}
	}
});
