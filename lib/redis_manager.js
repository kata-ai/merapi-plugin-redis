"use strict";

const {Component} = require("merapi");
const MerapiRedis = require("./merapi_redis");

class RedisManager extends Component {
    constructor(config, logger) {
        super();
        this.config = config;
        this.logger = logger;
    }

    createRedisClient(options) {
        return new MerapiRedis(options, this.logger);
    }
}

module.exports = ProxyManager;