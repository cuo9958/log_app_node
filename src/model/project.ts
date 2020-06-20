import { Model, DataTypes, Op } from "sequelize";
import db from "../db//mysql";

class Project extends Model {}
Project.init(
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
        logo: {
            type: DataTypes.STRING(200),
            defaultValue: "",
            comment: "项目图片",
        },
        name: {
            type: DataTypes.STRING(100),
            defaultValue: "",
            comment: "项目名称",
        },
    },
    {
        sequelize: db,
        freezeTableName: true,
        tableName: "t_project",
        indexes: [
            {
                unique: true,
                fields: ["uuid"],
            },
        ],
    }
);

//强制初始化数据库
// Project.sync({ force: true });

export default {
    insert: function (model: any) {
        return Project.create(model);
    },
    get: function (id: number) {
        return Project.findOne({
            where: {
                id,
            },
        });
    },
    del(id: number) {
        return Project.destroy({ where: { id } });
    },
    getCount(limit = 1) {
        let config: any = {
            limit: 20,
            offset: (limit - 1) * 20,
            order: [["id", "desc"]],
        };
        return Project.findAndCountAll(config);
    },
    getFromUid: function (uuid) {
        return Project.findOne({ where: { uuid } });
    },
    getAllUid(ids: string[]) {
        return Project.findAll({
            where: {
                uuid: {
                    [Op.in]: ids,
                },
            },
        });
    },
};
