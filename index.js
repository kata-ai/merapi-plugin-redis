"use strict";

module.exports = function () {
    return {

        *onBeforeComponentsRegister(container) {
            container.register("redisManager", require("./lib/redis_manager"));
        },

        typeRedis(name, opt) {
            return function (redisManager, config) {
                opt.config = opt.config || "redis";
                let cfg = config.default(opt.config, {});

                return redisManager.createRedisClient(cfg);
            }
        }
    }
}
