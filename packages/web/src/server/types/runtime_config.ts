import { z } from 'zod';

const RunTimeConfig = z.object({
    memory: z.object({
        host: z.string().min(1),
        port: z.number().positive(),
    }),
    storage: z.object({
        host: z.string().min(1),
        user: z.string().min(1),
        password: z.string().min(1),
        port: z.number().positive(),
    }),
    model: z.object({
        cacheDb: z.number().positive(),
        statusDb: z.number().positive(),
        dataDb: z.string().min(1),
        cors: z.array(z.string().min(1)),
    }),
});

type RunTimeConfigT = z.infer<typeof RunTimeConfig>;
export default RunTimeConfig;
export type { RunTimeConfigT };
