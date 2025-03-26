import { mountSuspended } from '@nuxt/test-utils/runtime';
import { expect, it } from 'vitest';
import Index from '~/pages/index.vue';

it('index e2e', async () => {
    const main = await mountSuspended(Index);
    expect(main.text()).toContain('Hi World!');
});
