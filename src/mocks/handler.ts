import { http, HttpResponse } from 'msw';
import { JsonObject } from 'next-auth/adapters';

const User = [
	{
		email: 'admin',
		password: 'asdf',
		nickname: '관리자1'
	}
];

const Tags = [
	{ id: 1, name: 'javascript' },
	{ id: 2, name: 'react' },
	{ id: 2, name: 'vue' },
	{ id: 2, name: 'nextjs' }
];

export const handlers = [
	http.post('/auth/login', async ({ request }) => {
		const { email, password } = (await request.json()) as JsonObject;
		console.log('[msw] 로그인 email: ', email, 'password: ', password);
		if (email === User[0].email && password === User[0].password) {
			return HttpResponse.json(User[0], {
				headers: {
					'Set-Cookie': 'connect.sid=msw-cookie;HttpOnly;Path=/'
				}
			});
		}
		return HttpResponse.json(
			{ message: 'no_such_user' },
			{
				status: 404
			}
		);
	}),
	http.post('/auth/logout', () => {
		console.log('[msw] 로그아웃');
		return new HttpResponse(null, {
			headers: {
				'Set-Cookie': 'connect.sid=;HttpOnly;Path=/;Max-Age=0'
			}
		});
	}),
	// tags
	http.get('/tags', ({ params }) => {
		const { id } = params;
		return HttpResponse.json(Tags, {
			status: 200
		});
	})
];
