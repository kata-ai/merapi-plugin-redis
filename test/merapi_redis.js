"use strict";

const { async, Config } = require("merapi");
const { expect } = require("chai");
const sinon = require("sinon");
const redisTest = require("fakeredis");

const MerapiRedis = require("../lib/merapi_redis");
const config = {
    redis: {
        type: "single",
        prefix: "merapi",
        name: "redis",
        host: "127.0.0.1",
        port: 6379,
    }
}

describe("MerapiRedis", function (done) {
    let merapiRedis = null;

    before(async(function* () {
        merapiRedis = new MerapiRedis(Config.create(config), console);
        sinon.stub(merapiRedis, "setupRedis").returns(redisTest.createClient());
        yield merapiRedis._initialize();
        done;
    }));

    it("should be resolved", function () {
        expect(merapiRedis).to.not.be.null;
    });

    it("should return redisClient", function () {
        expect(merapiRedis.client()).to.not.be.null;
    });

    it("should be able to run redis function", async(function* () {
        merapiRedis.client().set("myKey", 10);

        expect(yield merapiRedis.get("myKey")).to.eq(10);
    }));
});
