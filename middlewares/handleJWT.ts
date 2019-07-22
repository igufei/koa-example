import * as koaJWT from "koa-jwt";

export const handleJWT: koaJWT.Middleware = koaJWT({
    secret: "www.igufei.com"
}).unless({
    path: [/\/login/]
});