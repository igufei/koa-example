import * as Router from "koa-router";
import * as Koa from "koa";
import db from "../modules/db";
import utils from "../modules/utils";
import crypto from "../modules/crypto";
const router: Router = new Router();
router.prefix("/login");

router.get("/", async (ctx: Koa.Context) => {
  let { query, state } = ctx;
  let secretOrPrivateKey: string = "www.igufei.com"; // 这是加密的key（密钥）
  // let result: any = await db.FindOne("user_1000001", { "_id": db.ObjectId("5a58d8e144fbebc96ca935e4") });
  let json: object = {
    "managerid": "admin",
    "username": "uu2002",
    "password": "176757756",
    "points": 0,
    "email": "",
    "islock": false,
    "tag": "-",
    "bdinfo": "lock2.9",
    "addtime": 1463880886000,
    "endtime": 1495416886000,
    "pccode": "",
    "clientid": "",
    "lastlogintime": 0,
    "lastchecktime": 0
  };
  // tslint:disable-next-line:max-line-length
  let result: number = await db.RemoveMany("user_1000001", { "bdinfo": "lock2.9" });


  return ctx.body = { result };
});
export default router.routes();
  /* let token: string = jwt.sign(result, secretOrPrivateKey, {
expiresIn: 60 * 60 * 1  // 1小时过期
});
let data: string = "let token: string = jwt.sign(result, secre43214231tOrPrivateKey, {543134124";
let pwd: string = crypto.MakeKey(8);
let enData: string = crypto.DESencrypt(data, pwd);
let deData: string = crypto.DESdecrypt(enData, pwd);*/