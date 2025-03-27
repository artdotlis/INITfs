import { defineNitroPlugin, useRuntimeConfig } from '#imports';
import mongoose from 'mongoose';

export default defineNitroPlugin((_nitro) => {
    const runTime = useRuntimeConfig();
    try {
        const user = runTime.storage.user;
        const upw = runTime.storage.password;
        const host = runTime.storage.host;
        const port = runTime.storage.port;
        const dbn = runTime.model.dataDb;
        const mUrl = `mongodb://${user}:${upw}@${host}:${port}/${dbn}`;
        mongoose
            .connect(mUrl)
            .then(() => {
                console.log('MongoDB connected');
            })
            .catch((err: unknown) => console.error('MongoDB connection failed', err));
    }
    catch (err: unknown) {
        console.error('MongoDB connection failed', err);
    }
});
