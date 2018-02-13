// Type definitions for Merapi Plugin Redis
// Project: https://github.com/kata-ai/merapi-plugin-redis
// Definitions by: Ricky Anders <https://github.com/rickyanders>
// TypeScript Version: 2.3

import { Redis } from "ioredis";

declare module "merapi-plugin-redis" {
    export interface IRedis {
        client(): Redis;

        set(key: string, value: any, ...args: any[]): Promise<string>;
        get(key: string): Promise<string>;
        setnx(key: string, value: string): Promise<number>;

        hset(key: string, field: string, value: any): Promise<number>;
        hget(key: string, field: string): Promise<string>;
        hgetall(key: string): Promise<object>;
        hincrby(key: string, field: string, value: number): Promise<number>;
        hincr(key: string, field: string): Promise<number>;
        hmset(key: string, value: object): Promise<void>;

        lpush(key: string, ...values: any[]): Promise<void>;
        rpush(key: string, ...values: any[]): Promise<void>;

        lpop(key: string): Promise<string>;
        rpop(key: string): Promise<string>;

        del(key: string): Promise<void>;
        delete(key: string): Promise<void>;
        exists(...keys: string[]): Promise<number>;

        llen(key: string): Promise<number>;
        incr(key: string): Promise<number>;
        decr(key: string): Promise<number>;

        sadd(key: string, ...members: any[]): any;
        scard(key: string): Promise<number>;
        spop(key: string, count?: number): Promise<any>;
        srem(key: string, ...members: any[]): any;

        setTtl(key: string, value: any, ttl?: number): Promise<string>;
        expire(key: string, ttl?: number): Promise<number>;

        multi(commands: any[][]): any;

        publish(channel: string, message: string): Promise<number>;
        subscribe(...channels: any[]): any;
        unsubscribe(...channels: any[]): any;
        onEvent(key: string, fn: any): any;
        keys(pattern: string): string[];
    }
}
