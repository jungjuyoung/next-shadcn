import React from 'react';
import ButtonAction from '@/app/(afterLogin)/_component/ButtonAction';
import BackButton from '../../_component/BackButton';
function page() {
	return (
		<div className="mb-8 ">
			<BackButton />
			<h1 className="font-bold my-4">Post one</h1>
			<ButtonAction />
			<p className="text-slate-700">Post one content</p>
		</div>
	);
}

export default page;
