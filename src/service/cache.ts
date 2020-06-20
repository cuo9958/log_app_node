/**
 * 缓存服务，当前本机缓存，扩展redis缓存
 */
import LRU from "lru-cache";

const AGE = 604800000;

const cache = new LRU({
    //一周缓存
    maxAge: AGE,
    updateAgeOnGet: true,
});

export default {
    async get(key: string) {
        return cache.get(key);
    },
    async set(key: string, val: any) {
        return cache.set(key, val);
    },
    async has(key: string) {
        return cache.has(key);
    },
    async del(key: string) {
        cache.del(key);
    },
};
