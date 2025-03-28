import type { RunTimeConfigT } from './src/server/types/configs/runtime_config';
import fs from 'node:fs';
import Path from 'node:path';
import process from 'node:process';
import * as yaml from 'js-yaml';
import { defineNuxtConfig } from 'nuxt/config';
import { loadEnv } from 'vite';
import RunTimeConfig from './src/server/types/configs/runtime_config';

const LOCAL_DIR = Path.resolve(__dirname);
const ROOT_DIR = Path.resolve(__dirname, '../../');

function getPort(): number {
    return Number.parseInt(process.env.NODE_PORT ?? '8080', 10);
}

function getHost(): string | undefined {
    return process.env.NODE_HOST;
}

function getEnv(): string {
    return process.env.NODE_ENV ?? 'development';
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
    APP_WEB_SRC_SERVER: string;
};

function isStage(): boolean {
    if (!('STAGE' in process.env)) {
        return false;
    }
    return process.env.STAGE === 'true';
}

function isNotMinEnv(): boolean {
    if (!('MIN_ENV' in process.env)) {
        return true;
    }
    return process.env.MIN_ENV !== 'true';
}

function getAppMain(): string {
    const main = process.env.APP_WEB_SHADOW ?? ENV_WEB.APP_WEB;
    return main;
}

function getAppMainPub(): string {
    return Path.resolve(getAppMain(), ENV_WEB.APP_WEB_PUB_ROOT);
}

function getAppMainSer(): string {
    return Path.resolve(getAppMain(), ENV_WEB.APP_WEB_SERVER_ROOT);
}

function createRunTimeConf(): RunTimeConfigT {
    const conf = yaml.load(
        fs.readFileSync(Path.resolve(ROOT_DIR, ENV_GLOB.CONFIG_MAIN)).toString(),
    );
    return RunTimeConfig.parse(conf);
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
function getModules(dev: boolean): string[] {
    const core = [
        '@nuxt/fonts',
        '@nuxt/image',
        'nuxt-security',
        '@nuxt/scripts',
        '@pinia/nuxt',
    ];
    if (dev) {
        return [...core, '@nuxt/eslint'];
    }
    return core;
}

function commonTestDevConfigs() {
    return {
        eslint: {
            checker: false,
            config: {
                devtools: {
                    enabled: false,
                },
                standalone: false,
                autoInit: false,
            },
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
    serverDir: ENV_WEB.APP_WEB_SRC_SERVER,
    routeRules: {
        '/**': { swr: 3600, cache: { maxAge: 3600 } },
    },
    $production: {
        devtools: {
            enabled: false,
        },
        sourcemap: {
            server: isStage(),
            client: isStage(),
        },
        modules: getModules(false),
    },
    $development: {
        devServer: {
            host: getHost(),
            port: getPort(),
        },
        devtools: {
            enabled: isNotMinEnv(),
        },
        sourcemap: {
            server: true,
            client: true,
        },
        modules: getModules(true),
        ...commonTestDevConfigs(),
    },
    plugins: [],
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
    fonts: {
        devtools: false,
        defaults: {
            weights: [400],
            styles: ['normal', 'italic'],
            subsets: ['greek-ext', 'greek', 'latin-ext', 'latin'],
        },
        families: [{ name: 'Rubik', provider: 'google' }],
        provider: 'google',
        processCSSVariables: true,
        assets: {
            prefix: '/_fonts/',
        },
    },
});
