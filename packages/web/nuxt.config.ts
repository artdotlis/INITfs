import { defineNuxtConfig } from 'nuxt/config';
import { loadEnv } from 'vite';
import Path from 'path';

const LOCAL_DIR = Path.resolve(__dirname);

function getPort(): number {
    return parseInt(process.env['NODE_PORT'] ?? '8080', 10);
}

function getHost(): string | undefined {
    return process.env['NODE_HOST'];
}

function getEnv(): string {
    return process.env['NODE_ENV'] ?? 'development';
}

const ENV = loadEnv(getEnv(), LOCAL_DIR, '') as {
    WEB_APP_ROOT: string;
    APP_WEB: string;
    APP_WEB_PUB_ROOT: string;
    APP_WEB_SERVER_ROOT: string;
};
function isStage(): boolean {
    if (!('STAGE' in process.env)) {
        return false;
    }
    return process.env['STAGE'] === 'true';
}
function getAppMain(): string {
    const main = process.env['APP_WEB_SHADOW'] ?? ENV.APP_WEB;
    return main;
}

function getAppMainPub(): string {
    return Path.resolve(getAppMain(), ENV.APP_WEB_PUB_ROOT);
}
function getAppMainSer(): string {
    return Path.resolve(getAppMain(), ENV.APP_WEB_SERVER_ROOT);
}

export default defineNuxtConfig({
    compatibilityDate: '2025-03-17',
    $production: {
        devtools: {
            enabled: false,
        },
        sourcemap: {
            server: isStage(),
            client: isStage(),
        },
        modules: ['@nuxt/image', 'nuxt-security'],
    },
    $development: {
        devServer: {
            host: getHost(),
            port: getPort(),
        },
        devtools: {
            enabled: true,
        },
        debug: true,
        sourcemap: {
            server: true,
            client: true,
        },
        modules: ['@nuxt/image', 'nuxt-security', '@nuxt/eslint'],
        eslint: {
            checker: false,
            config: {
                devtools: {
                    enabled: false,
                },
            },
        },
    },
    nitro: {
        preset: 'bun',
        output: {
            dir: getAppMain(),
            publicDir: getAppMainPub(),
            serverDir: getAppMainSer(),
        },
    },
    security: {
        nonce: true,
    },
});
