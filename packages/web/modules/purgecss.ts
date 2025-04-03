import fs from 'node:fs';
import Path from 'node:path';
import process from 'node:process';
import { defineNuxtModule } from '@nuxt/kit';
import { PurgeCSS } from 'purgecss';

import { loadEnv } from 'vite';

const ROOT_DIR = Path.resolve(__dirname, '../../../');
const ROOT_PKG = Path.resolve(__dirname, '../');

function getEnv(): string {
    return process.env.NODE_ENV ?? 'development';
}
const ENV_WEB = loadEnv(getEnv(), ROOT_PKG, '') as {
    WEB_PKG: string;
    APP_WEB: string;
    APP_WEB_PUB_ROOT: string;
    EXTRA_PUBLIC_DIR: string;
};

const SRC_DIR = Path.resolve(ROOT_DIR, ENV_WEB.WEB_PKG);
const STYLE_JS_DIR = Path.resolve(ROOT_DIR, ENV_WEB.EXTRA_PUBLIC_DIR);
const APP_PUB_DIR = Path.resolve(ROOT_PKG, ENV_WEB.APP_WEB, ENV_WEB.APP_WEB_PUB_ROOT);

async function runPurgeCss(): Promise<void> {
    const content = [
        `${SRC_DIR}/**/*.ts`,
        `${SRC_DIR}/**/*.tsx`,
        `${SRC_DIR}/**/*.vue`,
        `${STYLE_JS_DIR}/**/*.js`,
    ];
    const results = await new PurgeCSS().purge({
        content,
        css: [`${APP_PUB_DIR}/_nuxt/**/*.css`],
    });
    for (const { css, file } of results) {
        if (file !== undefined) {
            const initS = fs.statSync(file).size / 1024;
            fs.writeFileSync(file, css);
            const newS = fs.statSync(file).size / 1024;
            console.log(`${file}: ${initS} -> ${newS} KB`);
        }
    }
}

export default defineNuxtModule({
    meta: {
        name: 'purgecss',
        configKey: 'purgecss',
    },
    defaults: {
        enabled: false,
    },
    setup(options, nuxt) {
        if (options.enabled) {
            nuxt.hook('close', async () => {
                console.log('finished build and starting purge css');
                await runPurgeCss();
                console.log('purge finished');
            });
        }
    },
});
