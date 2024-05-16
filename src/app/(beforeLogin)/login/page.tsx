'use client';

import { useState, ChangeEventHandler, FormEventHandler } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ProfileForm() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const router = useRouter();

	const onChangeEmail: ChangeEventHandler<HTMLInputElement> = e => {
		setEmail(e.target.value);
	};
	const onChangePassword: ChangeEventHandler<HTMLInputElement> = e => {
		setPassword(e.target.value);
	};

	const onSubmit: FormEventHandler<HTMLFormElement> = async e => {
		e.preventDefault();
		console.log('email: ', email, 'password: ', password);

		let shouldRedirect = false;
		console.log('env.AUTH_BASE_URL: ', process.env.NEXT_PUBLIC_AUTH_BASE_URL);
		try {
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_AUTH_BASE_URL}/auth/login`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ email, password }),
					credentials: 'include'
				}
			);
			console.log(res.status, await res.json());
			shouldRedirect = true;
		} catch (err) {
			console.log(err);
		}

		if (shouldRedirect) {
			router.push('/dashboard');
		}
	};

	return (
		<div className="flex h-screen w-[360px] mx-auto items-center">
			<form onSubmit={onSubmit} className="w-full space-y-8">
				<div className="grid w-full max-w-sm items-center gap-1.5">
					<Label htmlFor="email">Email</Label>
					<Input
						onChange={onChangeEmail}
						type="text"
						id="email"
						placeholder="Email"
					/>
				</div>
				<div className="grid w-full max-w-sm items-center gap-1.5">
					<Label htmlFor="password">Password</Label>
					<Input
						onChange={onChangePassword}
						type="password"
						id="password"
						placeholder="password"
					/>
				</div>
				<Button type="submit" className="w-full">
					Login
				</Button>
			</form>
		</div>
	);
}
