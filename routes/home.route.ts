import * as Router from "koa-router";
import * as Koa from "koa";

const router: Router = new Router();
router.prefix("/home");
router.get("/", async (ctx: Koa.Context) => {
    ctx.body = ctx.state.user;
});
export default router.routes();