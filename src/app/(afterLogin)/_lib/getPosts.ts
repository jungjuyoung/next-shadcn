export default async function getPosts() {
	const res = await fetch(`${process.env.NEXT_PUBLIC_AUTH_BASE_URL}/posts`, {
		next: {
			tags: ['posts']
		}
	});
	if (!res.ok) {
		throw new Error('Failed to fetch Posts data...');
	}
	return res.json();
}
