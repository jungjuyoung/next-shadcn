import { auth } from '@/auth';
import React from 'react';
import Navbar from '../_component/Navbar';
import RQProvider from '@/context/RQProvider';
type Props = {
	children: React.ReactNode;
};

async function AfterLoginLayout({ children }: Props) {
	const session = await auth();
	if (!session) return null;
	return (
		<RQProvider>
			<div>
				<Navbar />
				<div className="container h-full pt-10">{children}</div>
			</div>
		</RQProvider>
	);
}

export default AfterLoginLayout;
