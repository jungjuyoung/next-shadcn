export async function GET() {
	try {
		const tags = await fetch(`${process.env.NEXT_PUBLIC_AUTH_BASE_URL}/tags`);
		console.log('tags: ', tags);
	} catch (error) {
		console.log(error);
	}
}

export async function POST() {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_AUTH_BASE_URL}/`);
		console.log(res);
	} catch (error) {
		console.log(error);
	}
}
