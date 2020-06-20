import Router from "koa-router";

import open from "./api";
import msg from "./api/msg";
import project from "./api/project";
import user from "./api/user";

const router = new Router();

router.use("/api/project", project);
router.use("/api/msg", msg);
router.use("/api/user", user);

//对外提供的接口
router.use("/api/open", open);

export default router;
