import { defineNuxtConfig } from 'nuxt/config';
import { loadEnv } from 'vite';
import Path from 'path';
import * as yaml from 'js-yaml';
import fs from 'node:fs';
import type { RunTimeConfig } from './src/server/types/runtimeConfig';
import isRunTimeConfig from './src/server/types/runtimeConfig';

const LOCAL_DIR = Path.resolve(__dirname);
const ROOT_DIR = Path.resolve(__dirname, '../../');

function getPort(): number {
    return parseInt(process.env['NODE_PORT'] ?? '8080', 10);
}

function getHost(): string | undefined {
    return process.env['NODE_HOST'];
}

function getEnv(): string {
    return process.env['NODE_ENV'] ?? 'development';
}

const ENV_GLOB = loadEnv(getEnv(), ROOT_DIR, '') as {
    CONFIG_MAIN: string;
};

const ENV_WEB = loadEnv(getEnv(), LOCAL_DIR, '') as {
    WEB_APP_ROOT: string;
    APP_WEB: string;
    APP_WEB_PUB_ROOT: string;
    APP_WEB_SERVER_ROOT: string;
    APP_WEB_SRC_ROOT: string;
};

function isStage(): boolean {
    if (!('STAGE' in process.env)) {
        return false;
    }
    return process.env['STAGE'] === 'true';
}
function getAppMain(): string {
    const main = process.env['APP_WEB_SHADOW'] ?? ENV_WEB.APP_WEB;
    return main;
}

function getAppMainPub(): string {
    return Path.resolve(getAppMain(), ENV_WEB.APP_WEB_PUB_ROOT);
}

function getAppMainSer(): string {
    return Path.resolve(getAppMain(), ENV_WEB.APP_WEB_SERVER_ROOT);
}

function createRunTimeConf(): RunTimeConfig & { [index: string]: string } {
    const conf = yaml.load(
        fs.readFileSync(Path.resolve(ROOT_DIR, ENV_GLOB.CONFIG_MAIN)).toString()
    );
    if (isRunTimeConfig(conf)) {
        return conf;
    }
    throw new Error('server configuration is misformed');
}

function createAppConfig() {
    return {
        viewTransition: false,
        head: {
            title: 'INITfs',
            htmlAttrs: {
                lang: 'en',
            },
            link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
            charset: 'utf-16',
            viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
        },
    };
}

export default defineNuxtConfig({
    future: {
        compatibilityVersion: 4,
    },
    compatibilityDate: '2025-03-17',
    app: createAppConfig(),
    runtimeConfig: createRunTimeConf(),
    srcDir: ENV_WEB.APP_WEB_SRC_ROOT,
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
        removeLoggers: true,
    },
    imports: {
        autoImport: false,
    },
});
