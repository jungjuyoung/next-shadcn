'use client';
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';
import { FormInputPost } from '@/types';
import { useQuery } from '@tanstack/react-query';

interface FormPostProps {
	submit: SubmitHandler<FormInputPost>;
	isEditing: boolean;
}

interface Tags {
	id: number;
	name: string;
}
const FormPost: FC<FormPostProps> = ({ submit, isEditing }) => {
	const { register, handleSubmit } = useForm<FormInputPost>();
	// fetch tags
	const { data: dataTags, isLoading } = useQuery<Tags[]>({
		queryKey: ['tags'],
		queryFn: async () => {
			const res = await fetch(`${process.env.NEXT_PUBLIC_AUTH_BASE_URL}/tags`);
			return res.json();
		}
	});
	console.log('data: ', dataTags);
	return (
		<form
			onSubmit={handleSubmit(submit)}
			className="w-[500px] mx-auto space-y-8"
		>
			<div className="grid w-full tems-center gap-1.5 space-y-4">
				<Label htmlFor="title">Post Title</Label>
				<Input
					type="text"
					id="title"
					placeholder="post title..."
					{...register('title', { required: true })}
				/>
			</div>

			<div className="grid w-full gap-1.5 space-y-4">
				<Label htmlFor="message">Your message</Label>
				<Textarea
					placeholder="Type your message here."
					id="message"
					{...register('content', { required: true })}
				/>
			</div>

			{isLoading ? (
				<div>Loading...</div>
			) : (
				<div className="grid w-full gap-1.5 space-y-4">
					<Select {...register('tag')} defaultValue="all">
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Select a tags" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>Select tags</SelectLabel>
								{dataTags?.map(({ id, name }) => (
									<SelectItem key={id} value={name}>
										{name}
									</SelectItem>
								))}
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
			)}

			<Button type="submit" className="w-full">
				{isEditing ? 'UPDATE' : 'CREATE'}
			</Button>
		</form>
	);
};
export default FormPost;
