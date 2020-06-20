import Router from "koa-router";
import ProjectModel from "../model/project";
import { ictx } from "../extends";
import nanoid from "nanoid";
import ProjectClientModel from "../model/project_client";

const router = new Router();

router.get("/", async function (ctx: ictx) {
    try {
        const data = await ProjectModel.getCount();
        ctx.Success(data);
    } catch (error) {
        ctx.Error(error.message);
    }
});

router.get("/client/", async function (ctx: ictx) {
    const uuid = ctx.query.uuid;
    try {
        const data = await ProjectClientModel.getCount(uuid);
        ctx.Success(data);
    } catch (error) {
        ctx.Error(error.message);
    }
});
router.post("/client/del", async function (ctx: ictx) {
    const id = ctx.request.body.id;
    try {
        const data = await ProjectClientModel.del(id);
        ctx.Success(data);
    } catch (error) {
        ctx.Error(error.message);
    }
});
router.post("/client/add", async function (ctx: ictx) {
    const { name, clientid, uuid } = ctx.request.body;
    try {
        if (!uuid) throw new Error("必须添加uuid");
        if (!name) throw new Error("必须添加客户端名称");
        if (!clientid) throw new Error("必须添加客户端的pushid");
        const model = {
            uuid,
            name,
            clientid,
        };
        const data = await ProjectClientModel.insert(model);
        ctx.Success(data);
    } catch (error) {
        ctx.Error(error.message);
    }
});
router.post("/add", async function (ctx: ictx) {
    const { name } = ctx.request.body;
    try {
        await ProjectModel.insert({ name, uuid: nanoid.nanoid(10) });
        ctx.Success();
    } catch (error) {
        ctx.Error(error.message);
    }
});
router.post("/del", async function (ctx: ictx) {
    const { id } = ctx.request.body;
    try {
        await ProjectModel.del(id);
        ctx.Success();
    } catch (error) {
        ctx.Error(error.message);
    }
});
export default router.routes();
