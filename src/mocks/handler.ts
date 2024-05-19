import { http, HttpResponse } from 'msw';
import { JsonObject } from 'next-auth/adapters';
import { faker } from '@faker-js/faker';

const generateDate = () => {
	const lastWeek = new Date(Date.now());
	lastWeek.setDate(lastWeek.getDate() - 7);
	return faker.date.between({
		from: lastWeek,
		to: Date.now()
	});
};

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
	{ id: 3, name: 'vue' },
	{ id: 4, name: 'nextjs' }
];
const Posts = [
	{
		posdId: 1,
		title: 'Post one title',
		content: `${1}. Venenatis accumsan fermentum, facilisis hac, tristique
		integer leo posuere inceptos cubilia orci. Litora congue, cubilia
		aenean ad.`,
		tag: Tags[0],
		createdAt: generateDate()
	},
	{
		posdId: 2,
		title: 'Post two title',
		content: `${2}. Vitae etiam eleifend consequat, iaculis torquent feugiat dictum
		maecenas. Venenatis accumsan fermentum, facilisis hac, tristique
		integer leo posuere inceptos cubilia orci. Litora congue, cubilia
		aenean ad. Lacinia dapibus, molestie per malesuada. Justo arcu
		consequat, maecenas sagittis, eros fermentu `,
		tag: Tags[2],
		createdAt: generateDate()
	}
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
	}),

	// posts
	http.get('/posts', ({ params }) => {
		const { id } = params;
		return HttpResponse.json(Posts, {
			status: 200
		});
	})
];
