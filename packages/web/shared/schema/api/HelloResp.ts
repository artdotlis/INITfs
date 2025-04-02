import { z } from 'zod';

const HelloResp = z.object({
    hello: z.string().min(1),
});

export default HelloResp;
