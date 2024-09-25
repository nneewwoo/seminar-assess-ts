import { PrismaClient } from '@prisma/client';

import seminarItem from '../src/lib/data/seminar-items.json' assert { type: 'json' };

const prisma = new PrismaClient();

const main = async () => {
	console.info('Setting period...');
	await prisma.period.create({
		data: {
			current: true,
			type: 'VOTE',
			endDate: new Date(new Date().setDate(new Date().getDate() + 15))
		}
	});

	const currentPeriod = await prisma.period.findFirst({ where: { current: true } });

	console.info('Seeding seminar items...');
	for (const item of seminarItem) {
		await prisma.seminar.create({
			data: {
				title: item.title,
				periodId: currentPeriod!.id,
				questionsPre: {
					create: item.questions.map((question: any) => ({
						question: question.question,
						answers: question.answers,
						correct: question.correct
					}))
				},
				questionsPost: {
					create: item.questions.map((question: any) => ({
						question: question.question,
						answers: question.answers,
						correct: question.correct
					}))
				},
				questionsEval: {
					create: item.eval.map((question: any) => ({
						question: question.question,
						answers: question.answers
					}))
				}
			}
		});
	}

	// console.info('Seeding pretest questions...');
	// for (const question of questionsPre) {
	// 	await prisma.questionPre.create({
	// 		data: {
	// 			question: question.question,
	// 			answers: question.answers,
	// 			correct: question.correct,
	// 			periodId: currentPeriod!.id
	// 		}
	// 	});
	// }
	// console.info('Seeding posttest questions...');
	// for (const question of questionsPost) {
	// 	await prisma.questionPost.create({
	// 		data: question
	// 	});
	// }
	// console.info('Seeding evaluation questions...');
	// for (const question of questionsEvaluation) {
	// 	await prisma.questionEval.create({
	// 		data: question
	// 	});
	// }

	console.info('Seeding complete!');
};

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (error) => {
		console.error(error);
		await prisma.$disconnect();
		process.exit(1);
	});
