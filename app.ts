import * as Koa from "koa";
import * as Static from "koa-static";
import * as path from "path";
import * as bodyParser from "koa-bodyparser";
import { handleError } from "./middlewares/handleError";
import { handleJWT } from "./middlewares/handleJWT";
import { handleRoutes } from "./routes";

const app: Koa = new Koa();
app.use(Static(path.join(__dirname, "./public")));      // 静态资源中间件
app.use(bodyParser());                                  // post数据中间件
app.use(handleError);                                   // jwt验证失败中间件
app.use(handleJWT);                                     // jwt验证中间件
app.use(handleRoutes);                                  // 路由中间件
export default app;
