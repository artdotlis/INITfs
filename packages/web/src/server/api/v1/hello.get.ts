import type { HelloRespT } from '#shared/types/api/HelloRespT';
import { defineEventHandler } from '#imports';

export default defineEventHandler((_event): HelloRespT => {
    return {
        hello: 'Hello',
    };
});
