import prisma from '$lib/prisma';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
	const current = await prisma.period.findFirst({ where: { current: true } });

	if (current) {
		return json(current);
	}
	return json({ message: 'No active period found' }, { status: 404 });
};
