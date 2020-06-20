import Router from "koa-router";

const router = new Router();

router.get("/", function (ctx, next) {
    ctx.body = "成功";
});

export default router.routes();
