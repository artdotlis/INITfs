import {
    defineEventHandler,
    getResponseStatus,
    useRuntimeConfig,
    useStorage,
} from '#imports';

export default defineEventHandler(async (event) => {
    const status = getResponseStatus(event);
    const message = `${new Date().toLocaleString()} ${status} ${event.toString()}`;
    console.log(message);
    const runTime = useRuntimeConfig();
    const storage = useStorage(runTime.model.status.key);
    await storage.setItem(
        'pageViews',
        1 + Number((await storage.getItem('pageViews')) ?? 0),
    );
});
