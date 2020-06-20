import { Model, DataTypes, Op } from "sequelize";
import db from "../db/mysql";

class Msg extends Model {}
Msg.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        uuid: {
            type: DataTypes.STRING(15),
            defaultValue: "",
            comment: "项目uuid",
        },
        title: {
            type: DataTypes.STRING(100),
            defaultValue: "",
            comment: "消息名称",
        },
        txts: {
            type: DataTypes.STRING,
            defaultValue: "",
            comment: "消息内容",
        },
        link: {
            type: DataTypes.STRING,
            defaultValue: "",
            comment: "消息链接",
        },
        create_time: {
            type: DataTypes.BIGINT,
            defaultValue: 0,
            comment: "消息时间戳",
        },
    },
    {
        sequelize: db,
        freezeTableName: true,
        tableName: "t_msg",
        indexes: [
            {
                fields: ["uuid"],
            },
        ],
    }
);

//强制初始化数据库
// Msg.sync({ force: true });

export default {
    insert: function (model: any) {
        return Msg.create(model);
    },
    get: function (id: number) {
        return Msg.findOne({
            where: {
                id,
            },
        });
    },

    /**
     * 查询最近7天的客户端相关的消息
     * @param uuid uuid数组
     * @param pageIndex 页数
     */
    searchFromUid(uuid: string[], pageIndex = 0) {
        const limit = 20;
        return Msg.findAll({
            where: {
                uuid: {
                    [Op.in]: uuid,
                },
                create_time: {
                    [Op.gt]: Date.now() - 604800000,
                },
            },
            order: [["id", "desc"]],
            offset: pageIndex * limit,
            limit,
        });
    },
    getCount(uuid: string, limit = 1) {
        let config: any = {
            limit: 20,
            offset: (limit - 1) * 20,
            order: [["id", "desc"]],
            where: { uuid },
        };
        return Msg.findAndCountAll(config);
    },
};
