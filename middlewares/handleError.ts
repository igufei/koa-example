import * as Koa from "koa";

export function handleError(ctx: Koa.Context, next: any):void {
    return next().catch((err: any) => {
        if (err.status === 401) {
            ctx.status = 401;
            ctx.body = {
                error: err.originalError ? err.originalError.message : err.message,
            };
        } else {
            throw err;
        }
    });
}