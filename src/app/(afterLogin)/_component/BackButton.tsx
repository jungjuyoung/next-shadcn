'use client';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

function BackButton() {
	const router = useRouter();
	return (
		<Button onClick={() => router.back()}>
			<ChevronLeft />
			BackButton
		</Button>
	);
}

export default BackButton;
