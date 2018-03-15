"use strict";

const { Component } = require("merapi");
const MerapiRedis = require("./merapi_redis");

class RedisManager extends Component {
    constructor(config, logger) {
        super();
        this.config = config;
        this.logger = logger;
    }

    createRedisClient(options) {
        const redisClient = new MerapiRedis(options, this.logger);
        redisClient.initialize();
        return redisClient;
    }
}

module.exports = RedisManager;
