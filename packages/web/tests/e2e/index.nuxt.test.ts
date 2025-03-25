import { mountSuspended } from '@nuxt/test-utils/runtime';
import { expect, it } from 'vitest';
import App from '~/app.vue';

it('index e2e', async () => {
    const main = await mountSuspended(App);
    expect(main.text()).toContain('Hi World!');
});
