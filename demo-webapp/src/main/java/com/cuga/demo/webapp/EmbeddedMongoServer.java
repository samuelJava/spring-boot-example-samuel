package com.cuga.demo.webapp;

import com.mongodb.MongoClient;
import com.mongodb.MongoClientOptions;
import com.mongodb.ServerAddress;

import de.flapdoodle.embed.mongo.MongodExecutable;
import de.flapdoodle.embed.mongo.MongodProcess;
import de.flapdoodle.embed.mongo.MongodStarter;
import de.flapdoodle.embed.mongo.config.MongodConfigBuilder;
import de.flapdoodle.embed.mongo.config.Net;
import de.flapdoodle.embed.mongo.distribution.Version;
import de.flapdoodle.embed.process.runtime.Network;

public class EmbeddedMongoServer {

    /**
     * please store Starter or RuntimeConfig in a static final field if you want to use artifact store caching (or else disable caching)
     */
    private static final MongodStarter starter = MongodStarter.getDefaultInstance();

    private MongodExecutable _mongodExe;
    private MongodProcess _mongod;

    private MongoClient _mongo;

    public EmbeddedMongoServer() throws Exception {
        _mongodExe = starter.prepare(
                        new MongodConfigBuilder().version(Version.Main.PRODUCTION).net(new Net(12345, Network.localhostIsIPv6())).build());
        _mongod = _mongodExe.start();

        MongoClientOptions options = MongoClientOptions.builder().build();
        ServerAddress address = new ServerAddress("localhost", 12345);
        _mongo = new MongoClient(address, options);
    }

    public void close() throws Exception {
        _mongod.stop();
        _mongodExe.stop();
    }

    public MongoClient getMongoClient() {
        return _mongo;
    }

}