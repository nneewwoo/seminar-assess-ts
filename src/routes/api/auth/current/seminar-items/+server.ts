import prisma from '$lib/prisma';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
	const period = await prisma.period.findFirst({
		where: { current: true }
	});
	if (period) {
		const seminarItems = await prisma.seminar.findMany({ where: { periodId: period.id } });
		return json(seminarItems);
	}

	return json({ message: 'No seminar items found' }, { status: 404 });
};
