import prisma from '$lib/prisma';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
	const seminar = await prisma.period.findFirst({
		where: { current: true },
		include: { seminar: true }
	});

	if (seminar) {
		const seminarTop = await prisma.seminar.findFirst({
			where: { periodId: seminar.id },
			orderBy: { votes: 'desc' }
		});
		const questions = await prisma.questionEval.findMany({ where: { seminarId: seminarTop!.id } });

		if (questions) {
			return json(questions);
		}
		return json({ message: 'No questions found' }, { status: 404 });
	}

	return json({ message: 'No seminar items found' }, { status: 404 });
};
