'use client';

import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';

const showMessage = (message: string) => {
	if (message === 'no_email') return '이메일을 입력해주세요';
	if (message === 'no_password') return '비밀번호를  입력해주세요';
	if (message === 'no_matched') return '아이디와 비밀번호가 일치하지 않습니다.';
	if (message === 'no_such_user') return '올바른 유저가 아닙니다.';
	return '';
};

export default function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [message, setMessage] = useState({ message: '' });
	const router = useRouter();

	const onChangeEmail: ChangeEventHandler<HTMLInputElement> = e => {
		setEmail(e.target.value);
	};
	const onChangePassword: ChangeEventHandler<HTMLInputElement> = e => {
		setPassword(e.target.value);
	};

	const onSubmit: FormEventHandler<HTMLFormElement> = async e => {
		e.preventDefault();
		setMessage({ message: '' });

		console.log('LoginPage email: ', email, 'password: ', password);
		let shouldRedirect = false;
		try {
			const res = await signIn('credentials', {
				email,
				password,
				nickname: '',
				redirect: false
			});
			console.log(
				'LoginPage singIn callback res: ',
				res,
				'redirected to path: "/" !!!!'
			);
			router.push('/');
		} catch (err) {
			console.error(err);
			setMessage({ message: 'no_matched' });
			return null;
		}
	};

	return (
		<div className="flex h-screen w-[360px] mx-auto items-center">
			<form onSubmit={onSubmit} className="w-full space-y-8">
				<div className="grid w-full max-w-sm items-center gap-1.5">
					<Label htmlFor="email">Email</Label>
					<Input
						type="text"
						id="email"
						placeholder="Email"
						onChange={onChangeEmail}
					/>
				</div>
				<div className="grid w-full max-w-sm items-center gap-1.5">
					<Label htmlFor="password">Password</Label>
					<Input
						type="password"
						id="password"
						placeholder="password"
						onChange={onChangePassword}
					/>
				</div>
				<div className="text-ember-500 font-bold text-xl">
					{showMessage('')}
				</div>
				<Button type="submit" className="w-full">
					Login
				</Button>
			</form>
		</div>
	);
}
