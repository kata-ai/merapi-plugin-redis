"use strict";

const { Component } = require("merapi");
const Redis = require("ioredis");

module.exports = class MerapiRedis extends Component {
    constructor(config, logger) {
        super();
        this.config = config;
        this.logger = logger;
        this._redisConf = config.default("redis", {});
        this._ttl = this._redisConf.ttl ? +this._redisConf.ttl : 300;
        this._prefix = this._redisConf.prefix ? this._redisConf.prefix : "";
    }

    setupRedis() {
        if (this._prefix !== "")
            this._prefix = `${this._prefix}:`;

        let redisOptions = { keyPrefix: this._prefix };
        let redisHosts;

        if (this._redisConf.password && this._redisConf.password !== "") redisOptions.password = this._redisConf.password;
        if (this._redisConf.redisHosts && this._redisConf.redisHosts !== "") {
            redisHosts = JSON.parse(this._redisConf.redisHosts);
        } else {
            redisHosts = [{ host: this._redisConf.host, port: this._redisConf.port }];
        }

        switch (this._redisConf.type) {
            case "cluster":
                let args = Object.assign({}, this._redisConf.args, { keyPrefix: this._prefix });
                args.redisOptions = Object.assign({}, args.redisOptions, { password: this._redisConf.password });
                return new Redis.Cluster(redisHosts, args);
            case "sentinel":
                if (this._redisConf.sentinelName && this._redisConf.sentinelName !== "")
                    redisOptions.name = this._redisConf.sentinelName;
                return new Redis(Object.assign({ sentinels: redisHosts }, redisOptions));
            default:
                return new Redis(Object.assign({ host: this._redisConf.host, port: this._redisConf.port }, redisOptions));
        }
    }

    *initialize() {
        this.redisClient = this.setupRedis();
    }

    client() {
        return this.redisClient;
    }

    set(key, value, ...args) {
        return new Promise((resolve, reject) => {
            this.redisClient.set(key, value, ...args, (err, res) => {
                if (err) reject(err);
                else resolve(res);
            });
        });
    }

    get(key) {
        return new Promise((resolve, reject) => {
            this.redisClient.get(key, (err, res) => {
                if (err) reject(err);
                else resolve(res);
            });
        });
    }

    setnx(key, value) {
        return new Promise((resolve, reject) => {
            this.redisClient.setnx(key, value, (err, res) => {
                if (err) reject(err);
                else resolve(res);
            });
        });
    }

    multi(commands) {
        return this.redisClient.multi(commands).exec((err, res) => {
            if (err) {
                return Promise.reject(err);
            }
            return Promise.resolve(res);
        });
    }

    hset(key, field, value) {
        return new Promise((resolve, reject) => {
            this.redisClient.hset(key, field, value, (err, res) => {
                if (err) reject(err);
                else resolve(res);
            });
        });
    }

    hget(key, field) {
        return new Promise((resolve, reject) => {
            this.redisClient.hget(key, field, (err, res) => {
                if (err) reject(err);
                else resolve(res);
            });
        });
    }

    hgetall(key) {
        return new Promise((resolve, reject) => {
            this.redisClient.hgetall(key, (err, res) => {
                if (err) reject(err);
                else resolve(res);
            });
        });
    }

    hmset(key, value) {
        return new Promise((resolve, reject) => {
            this.redisClient.hmset(key, value, (err, res) => {
                if (err) reject(err);
                else resolve(res);
            });
        });
    }

    lpush(key, ...value) {
        return new Promise((resolve, reject) => {
            this.redisClient.lpush(key, ...value, (err, res) => {
                if (err) reject(err);
                else resolve(res);
            });
        });
    }

    rpush(key, ...value) {
        return new Promise((resolve, reject) => {
            this.redisClient.rpush(key, ...value, (err, res) => {
                if (err) reject(err);
                else resolve(res);
            });
        });
    }

    lpop(key) {
        return new Promise((resolve, reject) => {
            this.redisClient.lpop(key, (err, res) => {
                if (err) reject(err);
                else resolve(res);
            });
        });
    }

    rpop(key) {
        return new Promise((resolve, reject) => {
            this.redisClient.rpop(key, (err, res) => {
                if (err) reject(err);
                else resolve(res);
            });
        });
    }

    del(...keys) {
        return new Promise((resolve, reject) => {
            this.redisClient.del(...keys, (err, res) => {
                if (err) reject(err);
                else resolve(res);
            });
        });
    }

    delete(...keys) {
        return this.del(...keys);
    }

    exists(...keys) {
        return new Promise((resolve, reject) => {
            this.redisClient.exists(...keys, (err, res) => {
                if (err) reject(err);
                else resolve(res)
            });
        });
    }

    llen(key) {
        return new Promise((resolve, reject) => {
            this.redisClient.llen(key, (err, res) => {
                if (err) reject(err);
                else resolve(res);
            });
        });
    }

    incr(key) {
        return new Promise((resolve, reject) => {
            this.redisClient.incr(key, (err, res) => {
                if (err) reject(err);
                else resolve(res);
            });
        });
    }

    decr(key) {
        return new Promise((resolve, reject) => {
            this.redisClient.decr(key, (err, res) => {
                if (err) reject(err);
                else resolve(res);
            });
        });
    }

    hincrby(key, field, value) {
        return new Promise((resolve, reject) => {
            this.redisClient.hincrby(key, field, value, (err, res) => {
                if (err) reject(err);
                else resolve(res);
            });
        });
    }

    hincr(key, field) {
        return this.hincrby(key, field, 1);
    }

    sadd(key, ...members) {
        return new Promise((resolve, reject) => {
            this.redisClient.sadd(key, ...members, (err, res) => {
                if (err) reject(err);
                else resolve(res);
            });
        });
    }

    scard(key) {
        return new Promise((resolve, reject) => {
            this.redisClient.scard(key, (err, res) => {
                if (err) reject(err);
                else resolve(res);
            });
        });
    }

    srem(key, ...members) {
        return new Promise((resolve, reject) => {
            this.redisClient.srem(key, ...members, (err, result) => {
                if (err) reject(err);
                else resolve(res);
            });
        });
    }

    spop(key, count) {
        if (count === undefined || count < 1) count = 1;
        return new Promise((resolve, reject) => {
            this.redisClient.spop(key, count, (err, res) => {
                if (err) reject(err);
                else resolve(res);
            });
        });
    }

    setTtl(key, value, ttl) {
        return new Promise((resolve, reject) => {
            this.redisClient.set(key, value, (err, res) => {
                if (err) reject(err);
                this.redisClient.expire(key, ttl, (err, res) => {
                    if (err) reject(err);
                    resolve(res);
                });
            });
        });
    }

    expire(key, ttl) {
        if (ttl === undefined) ttl = this._ttl;
        return new Promise((resolve, reject) => {
            this.redisClient.expire(key, ttl, (err, res) => {
                if (err) reject(err);
                else resolve(res);
            });
        });
    }

    publish(channel, message) {
        return new Promise((resolve, reject) => {
            this.redisClient.publish(channel, message, (err, res) => {
                if (err) reject(err);
                else resolve(res);
            });
        });
    }

    subscribe(channel) {
        this.redisClient.subscribe(key);
    }

    unsubscribe(channel) {
        this.redisClient.unsubscribe(key);
    }

    onEvent(key, fn) {
        this.redisClient.on(key, fn);
    }

    keys(pattern) {
        return new Promise((resolve, reject) => {
            this.redisClient.keys(pattern, (err, res) => {
                if (err) reject(err);
                else resolve(res)
            });
        });
    }
}
