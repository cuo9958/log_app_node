import Router from "koa-router";

import test from "./api";

const router = new Router();

//对外提供的接口
router.use("/api/test", test);

export default router;
