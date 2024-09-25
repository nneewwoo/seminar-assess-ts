import { json, type RequestHandler } from '@sveltejs/kit';

import bcrypt from 'bcrypt';

import prisma from '$lib/prisma';

export const POST: RequestHandler = async ({ request }) => {
	const { email, password } = await request.json();
	const user = await prisma.user.findUnique({ where: { email } });

	if (user && bcrypt.compareSync(password, user.password)) {
		return json({ message: 'Signin successful' });
	}

	return json({ message: 'Invalid email or password' }, { status: 401 });
};
