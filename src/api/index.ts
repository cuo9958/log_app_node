import Router from "koa-router";
import CrosMiddle from "../middleware/cros";
import { ictx } from "../extends";
import CacheService from "../service/cache";
import ProjectModel from "../model/project";
import MsgModel from "../model/msg";
import PushService from "../service/push";

const router = new Router();

router.all("/", CrosMiddle, function (ctx, next) {
    ctx.body = "测试接口";
});

router.all("/push", CrosMiddle, function (ctx, next) {
    ctx.body = "没有项目id";
});

router.post("/push/:id", CrosMiddle, async function (ctx: ictx) {
    const id = ctx.params.id;
    try {
        let project: any = await CacheService.get("project_" + id);
        if (!project) {
            project = await ProjectModel.getFromUid(id);
            if (!project) throw new Error("不存在的项目");
            CacheService.set("project_" + id, project);
        }
        const { title, txts, link } = ctx.request.body;
        if (!title) throw new Error("不能发送空内容");
        const model = {
            uuid: project.uuid,
            title,
            txts,
            link,
            create_time: Date.now(),
        };
        await MsgModel.insert(model);
        PushService.pushNotice(model);
        ctx.Success("ok");
    } catch (error) {
        ctx.Error(error.message);
    }
});

export default router.routes();
