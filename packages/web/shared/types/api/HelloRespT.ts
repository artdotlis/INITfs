import { z } from 'zod';

const HelloResp = z.object({
    hello: z.string().min(1),
});

type HelloRespT = z.infer<typeof HelloResp>;
export default HelloResp;
export type { HelloRespT };
