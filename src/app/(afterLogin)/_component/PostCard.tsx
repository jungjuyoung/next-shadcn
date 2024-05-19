'use client';
import { Post } from '../../../model/Post';
import { Badge } from '@/components/ui/badge';

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/card';
import Link from 'next/link';

type Props = {
	post: Post;
};

function PostCard({ post }: Props) {
	return (
		<Card className="w-[350px]">
			<CardHeader>
				<CardTitle>{post.title}</CardTitle>
				<CardDescription>Deploy your new project in one-click.</CardDescription>
			</CardHeader>
			<CardContent>
				<CardDescription>
					{post.content.length > 5
						? post.content.substring(0, 100) + '...'
						: post.content}
				</CardDescription>
			</CardContent>
			<CardFooter className="flex justify-end">
				<Badge>{post.tag.name}</Badge>
				<Link href={'/blog/1'} className="ml-4 hover:underline">
					Read more...
				</Link>
			</CardFooter>
		</Card>
	);
}

export default PostCard;
