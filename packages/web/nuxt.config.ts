import type { RunTimeConfigT } from './src/server/types/configs/runtime_config';
import fs from 'node:fs';
import Path from 'node:path';
import process from 'node:process';
import * as yaml from 'js-yaml';
import { defineOrganization } from 'nuxt-schema-org/schema';
import { defineNuxtConfig } from 'nuxt/config';
import { loadEnv } from 'vite';
import RunTimeConfig from './src/server/types/configs/runtime_config';

type FontStyles = 'normal' | 'italic' | 'oblique';
const LOCAL_DIR = Path.resolve(__dirname);
const ROOT_DIR = Path.resolve(__dirname, '../../');

function getPort(): number {
    return Number.parseInt(process.env.NODE_PORT ?? '8080', 10);
}

function getHost(): string {
    return process.env.NODE_HOST ?? 'localhost';
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
    // SEO
    core.push(
        '@nuxtjs/robots',
        '@nuxtjs/sitemap',
        'nuxt-og-image',
        'nuxt-schema-org',
        'nuxt-link-checker',
    );
    if (dev) {
        return [...core, '@nuxt/eslint'];
    }
    return core;
}

function routeRules() {
    return {
        '/**': { swr: 3600, cache: { maxAge: 3600 } },
    };
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

function nitroConfigs() {
    return {
        preset: 'bun',
        output: {
            dir: getAppMain(),
            publicDir: getAppMainPub(),
            serverDir: getAppMainSer(),
        },
    };
}

function securityConfigs() {
    return {
        nonce: true,
        removeLoggers: true,
    };
}

function fontsConfigs() {
    return {
        devtools: false,
        defaults: {
            weights: [400],
            styles: ['normal', 'italic'] as FontStyles[],
            subsets: ['greek-ext', 'greek', 'latin-ext', 'latin'],
        },
        families: [],
        provider: 'fontsource',
        processCSSVariables: true,
        assets: {
            prefix: '/_fonts/',
        },
    };
}

function imageConfigs() {
    return {
        quality: 80,
        format: ['webp', 'avif', 'png'],
        screens: {
            'xs': 320,
            'sm': 640,
            'md': 768,
            'lg': 1024,
            'xl': 1280,
            'xxl': 1536,
            '2xl': 1536,
        },
        domains: [],
    };
}

const RTC = createRunTimeConf();

function soeConfigs() {
    return {
        robots: {
            blockNonSeoBots: true,
            blockAiBots: false,
        },
        sitemap: {
            sitemapsPathPrefix: '/',
            exclude: ['/api/**'],
            sitemaps: {
                sitemaps: true,
                defaultSitemapsChunkSize: 2000,
            },
        },
        schemaOrg: {
            defaults: false,
            identity: defineOrganization({
                '@type': ['Organization'],
                'name': 'INIT solutions',
                'logo': '/_images/image.png',
            }),
        },
        linkChecker: {
            failOnError: true,
            showLiveInspections: true,
            excludeLinks: [],
        },
        ogImage: {
            enabled: isNotMinEnv(),
        },
    };
}

export default defineNuxtConfig({
    future: {
        compatibilityVersion: 4,
    },
    ssr: true,
    compatibilityDate: '2025-03-17',
    app: createAppConfig(),
    runtimeConfig: RTC,
    srcDir: ENV_WEB.APP_WEB_SRC_ROOT,
    serverDir: ENV_WEB.APP_WEB_SRC_SERVER,
    routeRules: routeRules(),

    site: {
        url: `${RTC.web.protocol}://${RTC.web.host}:${RTC.web.port}`,
        name: 'INITfs',
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

    imports: {
        autoImport: false,
    },

    plugins: [],
    nitro: nitroConfigs(),
    security: securityConfigs(),
    fonts: fontsConfigs(),
    image: imageConfigs(),
    ...soeConfigs(),
});
