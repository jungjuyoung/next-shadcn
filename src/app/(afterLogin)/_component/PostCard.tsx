'use client';

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/card';
import Link from 'next/link';

export default function PostCard() {
	return (
		<Card className="w-[350px]">
			<CardHeader>
				<CardTitle>Create project</CardTitle>
				<CardDescription>Deploy your new project in one-click.</CardDescription>
			</CardHeader>
			<CardContent>
				<CardDescription>
					Vitae etiam eleifend consequat, iaculis torquent feugiat dictum
					maecenas. Venenatis accumsan fermentum, facilisis hac, tristique
					integer leo posuere inceptos cubilia orci. Litora congue, cubilia
					aenean ad. Lacinia dapibus, molestie per malesuada. Justo arcu
					consequat, maecenas sagittis, eros fermentu
				</CardDescription>
			</CardContent>
			<CardFooter className="flex justify-end">
				<Link href={'/blog/1'} className="hover:underline">
					Read more...
				</Link>
			</CardFooter>
		</Card>
	);
}
