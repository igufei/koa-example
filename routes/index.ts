import * as Router from "koa-router";
import news from "./news.route";
import home from "./home.route";
import login from "./login.route";

export const router:Router = new Router();
router.use(login);
router.use(news);
router.use(home);
export const handleRoutes:any = router.routes();
export const allowedMethods:any = router.allowedMethods();