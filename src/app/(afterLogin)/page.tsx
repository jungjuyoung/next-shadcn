import {
	HydrationBoundary,
	QueryClient,
	dehydrate
} from '@tanstack/react-query';
import PostCards from './_component/PostCards';
import getPosts from './_lib/getPosts';

async function page() {
	const queryClient = new QueryClient();
	await queryClient.prefetchQuery({
		queryKey: ['posts'],
		queryFn: getPosts
	});
	const dehydrateState = dehydrate(queryClient);

	return (
		<main className="grid items-center justify-center lg:grid-cols-3 md:grid-cols-2 gap-4 mt-10">
			<HydrationBoundary state={dehydrateState}>
				<PostCards />
			</HydrationBoundary>
		</main>
	);
}

export default page;
