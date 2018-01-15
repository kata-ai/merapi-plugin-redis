# Merapi Plugin Redis

## Introduction

[Merapi](https://github.com/kata-ai/merapi) plugin for working with [ioredis](https://github.com/luin/ioredis).

# Quick Start

## Installation

```
npm install merapi-plugin-redis --save
```

## Configuration

```json
{
    "name": "merapi",
    "version": "0.1.0",
    "plugins": [
        "redis"
    ],
    "redis": {
        "type": "single",
        "prefix": "merapi",
        "name": "redisRepo",
        "host": "127.0.0.1",
        "port": "6379",
        "password": "mypassword",
        "ttl": "300",
        "redisHosts": "[{'host': '127.0.0.1', 'port': 6379},{'host': '127.0.0.1', port: '16379'}]",
        "sentinelName": "mymaster",
        "args": {}
    }
}
```

The arguments passed to the redis configuration are different from one another, where:

* `type` identifies redis type (`single`, `cluster`, or `sentinel`)
* `prefix` prefix for redis key (key will be `{prefix}:yourkey`)
* `name` act as redis class name. Default to `redisRepo`
* `host` redis host
* `port` redis port
* `password` redis auth
* `ttl` default value for ttl
* `redisHosts` (optional) fill this field if you wish to use more than one host. Fill this field in string format
* `sentinelName` (optional) name for sentinel master
* `args` (optional) used as second argument in `cluster` configuration

### Standard Configuration

Example of redis configuration.
```json
    {
        "type": "single",
        "prefix": "merapi",
        "name": "redisRepo",
        "host": "127.0.0.1",
        "port": 6380,
        "password": "mypassword"
    }
```
More information about [redis configuration](https://github.com/luin/ioredis#connect-to-redis)

### Cluster Configuration

```json
    {
        "type": "cluster",
        "prefix": "merapi",
        "name": "redisRepo",
        "password": "mypassword",
        "redisHosts": "[{'host': '127.0.0.1', 'port': 6379},{'host': '127.0.0.1', port: '16379'}]",
        "args": {
            "slotsRefreshTimeout": 2000
        }
    }
```
More information about [cluster configuration](https://github.com/luin/ioredis#cluster)

### Sentinel Configuration

```json
    {
        "type": "sentinel",
        "prefix": "merapi",
        "name": "redisRepo",
        "host": "localhost",
        "port": "26379",
        "sentinelName": "mymaster",
        "password": "mypassword"
    }
```
More information about [sentinel configuration](https://github.com/luin/ioredis#sentinel)

## Usage

You can call redis client by using `client` function:
```javascript
import { IRedis } from "merapi-plugin-redis";

export default class YourManager {
    constructor(protected redisRepo: IRedis) {
        super();
    }

    getRedisClient() {
        const redisClient = this.redisRepo.client();
        return redisClient;
    }
}
```
Then you can proceed to use ioredis from `redisClient`.

# License

MIT
