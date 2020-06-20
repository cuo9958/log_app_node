import Router from "koa-router";
import MsgModel from "../model/msg";
import { ictx } from "../extends";

const router = new Router();

router.get("/", async function (ctx: ictx) {
    const uuid = ctx.query.uuid;
    try {
        const data = await MsgModel.getCount(uuid);
        ctx.Success(data);
    } catch (error) {
        ctx.Error(error.message);
    }
});

export default router.routes();
