import { Model, DataTypes } from "sequelize";
import db from "../db/mysql";

class ProjectClient extends Model {}
ProjectClient.init(
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
        clientid: {
            type: DataTypes.STRING(200),
            defaultValue: "",
            comment: "客户端的id",
        },
        name: {
            type: DataTypes.STRING(100),
            defaultValue: "",
            comment: "客户端名称",
        },
    },
    {
        sequelize: db,
        freezeTableName: true,
        tableName: "t_project_client",
        indexes: [
            {
                fields: ["uuid"],
            },
            {
                fields: ["clientid"],
            },
        ],
    }
);

//强制初始化数据库
// ProjectClient.sync({ force: true });

export default {
    insert: function (model: any) {
        return ProjectClient.create(model);
    },
    get: function (id: number) {
        return ProjectClient.findOne({
            where: {
                id,
            },
        });
    },
    searchProject(uuid: string) {
        return ProjectClient.findAll({
            where: { uuid },
        });
    },
    searchClient(clientid: string) {
        return ProjectClient.findAll({
            where: { clientid },
        });
    },
    getCount(uuid: string, limit = 1) {
        let config: any = {
            limit: 20,
            offset: (limit - 1) * 20,
            order: [["id", "desc"]],
            where: { uuid },
        };
        return ProjectClient.findAndCountAll(config);
    },
    del(id: number) {
        return ProjectClient.destroy({ where: { id } });
    },
};
