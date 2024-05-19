'use client';

import FormPost from '../../_component/FormPost';
import { SubmitHandler } from 'react-hook-form';
import { FormInputPost } from '@/types';

function EditPostPage() {
	const handleEditPost: SubmitHandler<FormInputPost> = data => {
		console.log(data);
	};
	return (
		<div>
			<h1 className="text-2xl my-4 font-bold text-center">Edit Post</h1>
			<FormPost submit={handleEditPost} isEditing={true} />
		</div>
	);
}

export default EditPostPage;
