import { http, HttpResponse } from 'msw';

const User = [
	{
		email: 'admin',
		password: 'asfd',
		nickname: '관리자1',
		image: '/yRsRRjGO.jpg'
	}
];

export const handlers = [
	http.post('/auth/login', () => {
		console.log('[msw] 로그인');
		// return HttpResponse.json({ message: 'no_such_user' }, {
		//   status: 404,
		// })
		return HttpResponse.json(User[0], {
			headers: {
				'Set-Cookie': 'connect.sid=msw-cookie;HttpOnly;Path=/'
			}
		});
	}),
	http.post('/auth/logout', () => {
		console.log('[msw] 로그아웃');
		return new HttpResponse(null, {
			headers: {
				'Set-Cookie': 'connect.sid=;HttpOnly;Path=/;Max-Age=0'
			}
		});
	})
];
