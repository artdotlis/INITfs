import type { RunTimeConfig } from '~/server/types/runtimeConfig';
import { defineNitroPlugin, useRuntimeConfig, useStorage } from '#imports';
import StorageKeys from '#shared/utils/storageKeys';
import redisDriver from 'unstorage/drivers/redis';

function cacheDriver(runTime: RunTimeConfig) {
    return redisDriver({
        base: runTime.model.cache.key,
        host: runTime.memory.host,
        port: runTime.memory.port,
        db: runTime.model.cache.cacheDb,
        ttl: 60 * 60 * 24 * 7,
    });
}

function statusDriver(runTime: RunTimeConfig) {
    return redisDriver({
        base: runTime.model.status.key,
        host: runTime.memory.host,
        port: runTime.memory.port,
        db: runTime.model.status.cacheDb,
    });
}

export default defineNitroPlugin((_nitro) => {
    const runTime = useRuntimeConfig();
    const storage = useStorage();
    storage
        .unmount(StorageKeys.cache)
        .then(() => {
            storage.mount(StorageKeys.cache, cacheDriver(runTime));
            void storage.clear(StorageKeys.cache);
        })
        .catch(() => {});
    storage.mount(StorageKeys.status, statusDriver(runTime));
    void storage.clear(StorageKeys.status);
});
