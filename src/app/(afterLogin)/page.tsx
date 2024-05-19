import PostCard from './_component/PostCard';

function page() {
	return (
		<main className="grid items-center justify-center lg:grid-cols-3 md:grid-cols-2 gap-4 mt-10">
			<PostCard />
		</main>
	);
}

export default page;
