import { defineEventHandler, getResponseStatus, useStorage } from '#imports';
import StorageKeys from '#shared/utils/StorageKeys';

export default defineEventHandler(async (event) => {
    const status = getResponseStatus(event);
    const message = `${new Date().toLocaleString()} ${status} ${event.toString()}`;
    console.log(message);
    const storage = useStorage(StorageKeys.status);
    void storage.setItem(
        'pageViews',
        1 + Number((await storage.getItem('pageViews')) ?? 0),
    );
});
