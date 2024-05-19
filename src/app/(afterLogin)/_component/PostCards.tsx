'use client';

import { Post } from '../../../model/Post';
import { useQuery } from '@tanstack/react-query';
import getPosts from '../_lib/getPosts';
import PostCard from './PostCard';

type Props = {
	post: Post;
};

export default function PostCards() {
	const { data: posts, isLoading } = useQuery<Post[]>({
		queryKey: ['posts'],
		queryFn: getPosts
	});
	console.log('posts: ', posts);
	return posts?.map(post => <PostCard key={post.id} post={post} />);
}
