import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient().$extends({
	query: {
		user: {
			$allOperations({ operation, args, query }) {
				if (
					['create', 'update'].includes(operation) &&
					'data' in args &&
					(args.data as any)['password']
				) {
					if ('password' in (args.data as any)) {
						if (typeof (args.data as any).password === 'string') {
							(args.data as any)['password'] = bcrypt.hashSync(
								(args.data as { password: string }).password,
								10
							);
						}
					}
				}
				return query(args);
			}
		}
	}
});

export default prisma;
