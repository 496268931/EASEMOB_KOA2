import 'reflect-metadata'
import { createConnection } from "typeorm";
const redis = require('redis')

const production = process.env.NODE_ENV === 'production'

const connectMysql = (): void => {
    createConnection({
        "type": "mysql",
        "host": process.env.MYSQL_HOST,
        "port": parseInt(process.env.MYSQL_PORT),
        "username": process.env.MYSQL_USERNAME,
        "password": process.env.MYSQL_PASSWORD,
        "database": process.env.MYSQL_DATABASE,
        "synchronize": true,
        "entities": [
            "dist/entity/*.js"
        ],
        "subscribers": [
            "dist/subscriber/*.js"
        ],
        "migrations": [
            "dist/migration/*.js"
        ],
        "cli": {
            "entitiesDir": "dist/entity",
            "migrationsDir": "dist/migration",
            "subscribersDir": "dist/subscriber"
        }
    }).then((connect) => {
        console.log(`mysql connect success! ${process.env.MYSQL_HOST}:${process.env.MYSQL_PORT}`)
    }).catch((err) => {
        console.log('mysql connect fail!', err)
    })
}

const connectRedis = (): void => {
    // if (process.env.NODE_ENV === 'production') {
    //     console.log("redis:" + process.env.REDIS_HOST + ":" + process.env.REDIS_PORT)
    //     var client = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);
    //     client.auth('crs-mccuq6yn:App111111', function (err) {
    //         console.log('通过认证', err);
    //     });
    // } else {
    //     console.log("redis:  127.0.0.1:6379")
    //     var client = redis.createClient(process.env.REDIS_PORT, "127.0.0.1");
    // }
    const client = redis.createClient(process.env.REDIS_PORT, process.env.NODE_ENV === 'production' ? process.env.REDIS_HOST : "127.0.0.1");

    if (process.env.NODE_ENV === 'production') {
        client.auth(process.env.REDIS_AUTH, function (err) {
            console.log('通过认证', err);
        });
    }

    client.select(1, function () { /* ... */ })
    client.on('ready', function (res) {
        console.log(`redis已连接! ${process.env.NODE_ENV === 'production' ? process.env.REDIS_HOST : "127.0.0.1"}:${process.env.REDIS_PORT}`)
    });
    client.on('error', function (error) {
        console.log('redis连接失败')

        console.log(error);
        throw new Error(error)
    });
}


// const connectMongo = (): void => {
//     createConnection({
//         name: 'mongo',
//         type: 'mongodb',
//         host: MongoConf.host,
//         port: MongoConf.port,
//         // username : MongoConf.username,
//         // password : MongoConf.password,
//         database: MongoConf.database,
//         entities: MongoEntities,
//         logging: _PROD_ ? false : true,
//     }).then((connect) => {
//         console.log('mongo connect success!')
//     }).catch((err) => {
//         console.log('mongo connect fail!', err)
//     })
// }

export {
    connectMysql,
    connectRedis
    // connectMongo
}
