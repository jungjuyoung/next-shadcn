import { PenLine, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { buttonVariants } from '@/components/ui/button';

const ButtonAction = () => {
	return (
		<div className="mb-8 space-x-4">
			<Button asChild>
				<Link href="/edit/1">
					<PenLine className="mr-3" />
					Edit
				</Link>
			</Button>
			<Button variant="destructive">
				<Trash2 className="mr-3" />
				Delete
			</Button>
		</div>
	);
};

export default ButtonAction;
