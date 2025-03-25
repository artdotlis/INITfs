import hasProp from '../../../shared/check/hasProp';
import isArrayStr from '../../../shared/check/isArrayStr';
// used during build time, thus must be a relative path
import isPropInObj from '../../../shared/check/isPropInObj';
// ---
interface Memory {
    host: string;
    port: number;
}

interface Storage {
    host: string;
    user: string;
    password: string;
    port: number;
}

interface MemDb {
    cacheDb: number;
    key: string;
}

interface Data {
    storageDb: string;
}

interface Model {
    cache: MemDb;
    status: MemDb;
    data: Data;
    cors: string[];
}

interface RunTimeConfig {
    memory: Memory;
    storage: Storage;
    model: Model;
}

type ConfT = RunTimeConfig & { [index: string]: string };
type IsTypeCheck = (obj: unknown) => boolean;

const TYPES_MEMORY: [string, IsTypeCheck][] = [
    [
        'host',
        (obj: unknown): boolean => hasProp('host', obj) && typeof obj.host === 'string',
    ],
    [
        'port',
        (obj: unknown): boolean =>
            hasProp('port', obj) && typeof obj.port === 'number' && obj.port > 0,
    ],
];

const TYPES_STORAGE: [string, IsTypeCheck][] = [
    ...TYPES_MEMORY,
    [
        'user',
        (obj: unknown): boolean => hasProp('user', obj) && typeof obj.user === 'string',
    ],
    [
        'password',
        (obj: unknown): boolean =>
            hasProp('password', obj) && typeof obj.password === 'string',
    ],
];

const TYPES_CACHE_ACCESS: [string, IsTypeCheck][] = [
    [
        'key',
        (obj: unknown): boolean => hasProp('key', obj) && typeof obj.key === 'string',
    ],
    [
        'cacheDb',
        (obj: unknown): boolean =>
            hasProp('cacheDb', obj) && typeof obj.cacheDb === 'number' && obj.cacheDb > 0,
    ],
];

const TYPES_STORAGE_ACCESS: [string, IsTypeCheck][] = [
    [
        'storageDb',
        (obj: unknown): boolean =>
            hasProp('storageDb', obj) && typeof obj.storageDb === 'string',
    ],
];

const TYPES_MODEL: [string, IsTypeCheck][] = [
    [
        'cache',
        (obj: unknown): boolean => {
            if (hasProp('cache', obj) && typeof obj.cache === 'object') {
                return isPropInObj(obj.cache ?? {}, TYPES_CACHE_ACCESS);
            }
            return false;
        },
    ],
    [
        'status',
        (obj: unknown): boolean => {
            if (hasProp('status', obj) && typeof obj.status === 'object') {
                return isPropInObj(obj.status ?? {}, TYPES_CACHE_ACCESS);
            }
            return false;
        },
    ],
    [
        'data',
        (obj: unknown): boolean => {
            if (hasProp('data', obj) && typeof obj.data === 'object') {
                return isPropInObj(obj.data ?? {}, TYPES_STORAGE_ACCESS);
            }
            return false;
        },
    ],
    [
        'cors',
        (obj: unknown): boolean => {
            if (hasProp('cors', obj) && Array.isArray(obj.cors)) {
                return isArrayStr(obj.cors);
            }
            return false;
        },
    ],
];

const TYPES_CONF_CON: [string, IsTypeCheck][] = [
    [
        'model',
        (obj: unknown): boolean => {
            if (hasProp('model', obj) && typeof obj.model === 'object') {
                return isPropInObj(obj.model ?? {}, TYPES_MODEL);
            }
            return false;
        },
    ],
    [
        'storage',
        (obj: unknown): boolean => {
            if (hasProp('storage', obj) && typeof obj.storage === 'object') {
                return isPropInObj(obj.storage ?? {}, TYPES_STORAGE);
            }
            return false;
        },
    ],
    [
        'memory',
        (obj: unknown): boolean => {
            if (hasProp('memory', obj) && typeof obj.memory === 'object') {
                return isPropInObj(obj.memory ?? {}, TYPES_MEMORY);
            }
            return false;
        },
    ],
];

function isRunTimeConfig(config: unknown): config is ConfT {
    if (typeof config !== 'object' || config === null) {
        return false;
    }
    return isPropInObj(config, TYPES_CONF_CON);
}

export default isRunTimeConfig;
export type { RunTimeConfig };
