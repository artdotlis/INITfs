import { defineNitroPlugin, useRuntimeConfig } from '#imports';
import mongoose from 'mongoose';
import HelloDB from '~/server/model/hello';

export default defineNitroPlugin((_nitro): void => {
    const runTime = useRuntimeConfig();
    try {
        const user = runTime.storage.user;
        const upw = runTime.storage.password;
        const host = runTime.storage.host;
        const port = runTime.storage.port;
        const dbn = runTime.model.dataDb;
        const mUrl = `mongodb://${user}:${upw}@${host}:${port}/${dbn}`;
        void mongoose.connect(mUrl).then(() => {
            console.log('MongoDB connected');
            void new HelloDB({ hello: 'Hey', language: 'US' }).save().catch(() => {});
        });
    }
    catch (err: unknown) {
        console.error('MongoDB connection failed', err);
    }
});
