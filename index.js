"use strict";

module.exports = function () {
    return {

        *onBeforeComponentsRegister(container) {
            let config = yield container.resolve("config");
            let redisName = config.default("redis.name", "redisRepo");
            container.register(redisName, require("./lib/merapi_redis"));
        }

    }
}
