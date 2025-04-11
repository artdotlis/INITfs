interface HostPortT {
    host: string;
    port: number;
}

interface MemoryT extends HostPortT {}
interface StorageT extends HostPortT {
    user: string;
    password: string;
}
interface ModelT {
    statusDb: number;
    cacheDb: number;
    dataDb: string;
}
interface WebT extends HostPortT {
    protocol: 'http' | 'https';
    cors: string[];
}

interface RunTimeConfigT {
    memory: MemoryT;
    storage: StorageT;
    model: ModelT;
    web: WebT;
}

declare module 'nuxt/schema' {
    interface RuntimeConfig extends RunTimeConfigT {}
}

export { RunTimeConfigT };
