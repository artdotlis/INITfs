import type { RunTimeConfigT } from '~/server/types/configs/runtime_config';
import { defineNitroPlugin, useRuntimeConfig, useStorage } from '#imports';
import StorageKeys from '#shared/utils/StorageKeys';
import redisDriver from 'unstorage/drivers/redis';

function cacheDriver(runTime: RunTimeConfigT) {
    return redisDriver({
        base: StorageKeys.cache,
        host: runTime.memory.host,
        port: runTime.memory.port,
        db: runTime.model.cacheDb,
        ttl: 60 * 60 * 24 * 7,
    });
}

function statusDriver(runTime: RunTimeConfigT) {
    return redisDriver({
        base: StorageKeys.status,
        host: runTime.memory.host,
        port: runTime.memory.port,
        db: runTime.model.statusDb,
    });
}

export default defineNitroPlugin((_nitro) => {
    const runTime = useRuntimeConfig();
    try {
        const storage = useStorage();
        storage
            .unmount(StorageKeys.cache)
            .then(() => {
                storage.mount(StorageKeys.cache, cacheDriver(runTime));
                void storage.clear(StorageKeys.cache);
                console.log(`Redis [${StorageKeys.cache}] connected`);
            })
            .catch(() => {});
        storage.mount(StorageKeys.status, statusDriver(runTime));
        void storage.clear(StorageKeys.status);
    }
    catch (err: unknown) {
        console.error('Redis connection failed', err);
    }
});
