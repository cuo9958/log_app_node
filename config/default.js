/**
 * 默认配置
 */

module.exports = {
    //开发环境数据库
    db: {
        host: "127.0.0.1",
        port: "3306",
        database: "fe_test",
        user: "fe_test",
        password: "fe_test",
        connectionLimit: 2,
    },
    //开发环境，普通redis配置
    redis: "redis://127.0.0.1:6379",

    //mongodb配置
    // mg: {
    //     name: "fe_topic",
    //     reset: "",
    //     url: "mongodb://127.0.0.1:27017",
    // },

    admin: {
        user: "admin",
        pwd: "1234",
    },
};
