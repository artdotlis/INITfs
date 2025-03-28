import type { HelloRespT } from '#shared/types/api/HelloRespT';
import { defineEventHandler } from '#imports';
import HelloDB from '~/server/model/hello';

export default defineEventHandler(async (_event): Promise<HelloRespT> => {
    const hey = await HelloDB.find({ language: 'US' });
    console.log('API', hey);
    return {
        hello: hey.pop()?.hello ?? 'NOOOOOO',
    };
});
