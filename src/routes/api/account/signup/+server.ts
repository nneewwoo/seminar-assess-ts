import { json, type RequestHandler } from '@sveltejs/kit';

import prisma from '$lib/prisma';

export const POST: RequestHandler = async ({ request }) => {
	const { email, password, name } = await request.json();
	await prisma.user.create({
		data: {
			email,
			password,
			name
		}
	});
	return json({ message: 'Signup successful' });
};
