import * as Router from "koa-router";
import * as Koa from "koa";
const router:Router = new Router();
router.prefix("/news");
router.get("/", async (ctx: Koa.Context) => {
    ctx.body = "这是首页";
});
export default router.routes();