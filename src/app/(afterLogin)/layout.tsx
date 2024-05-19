import { auth } from '@/auth';
import React from 'react';
import Navbar from '../_component/Navbar';
type Props = {
	children: React.ReactNode;
};

async function AfterLoginLayout({ children }: Props) {
	const session = await auth();
	if (!session) return null;
	return (
		<div>
			<Navbar />
			<div className="container h-full pt-10">{children}</div>
		</div>
	);
}

export default AfterLoginLayout;
