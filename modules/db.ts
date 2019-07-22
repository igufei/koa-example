import { MongoClient, Db, ObjectId, UpdateWriteOpResult, WriteOpResult, InsertOneWriteOpResult, DeleteWriteOpResultObject } from "mongodb";
import { dbconfig } from "../configs/db.config";
class Mongodb {
    private static mongodb: Mongodb = null;
    private db: Db = null;
    private _client: MongoClient = new MongoClient(dbconfig.DB_CONN_STR, { useNewUrlParser: true });
    public static get Instance(): Mongodb {
        if (Mongodb.mongodb == null) {
            Mongodb.mongodb = new Mongodb();
        }
        return Mongodb.mongodb;
    }
    public get ObjectId(): any {
        return ObjectId;
    }
    constructor() {
        this._connect();
    }
    private async _connect(): Promise<Db> {
        if (this.db == null) {
            let client: MongoClient = await this._client.connect();
            this.db = client.db(dbconfig.DB_NAME);
        }
        return this.db;
    }

    /**
     * 插入单条数据
     * @param colectionName 表名称
     * @param data 数据
     */
    public async InsertOne(colectionName: string, data: object): Promise<boolean> {
        this.db = await this._connect();
        let result: InsertOneWriteOpResult = await this.db.collection(colectionName).insertOne(data);
        if (result.result.n === 1 && result.result.ok === 1) {
            return true;
        } else {
            return false;
        }
    }
    /**
     * 插入多条数据
     * @param colectionName 表名称
     * @param data 数据
     */
    public async InsertMany(colectionName: string, data: Array<object>): Promise<any> {
        this.db = await this._connect();
        return await this.db.collection(colectionName).insertMany(data);
    }
    /**
     * 查询单条数据
     * @param colectionName 表名称
     * @param where 查询条件
     * @param options 查询选项
     */
    public async FindOne(colectionName: string, where: object, options?: object): Promise<any> {
        this.db = await this._connect();
        return await this.db.collection(colectionName).findOne(where, options);
    }
    /**
     * 查询所有数据
     * @param colectionName 表名称
     * @param where 查询条件
     * @param options 查询选项
     */
    public async FindMany(colectionName: string, where: object, options?: object): Promise<any> {
        this.db = await this._connect();
        return await this.db.collection(colectionName).find(where, options).toArray();
    }
    /**
     * 修改单条数据
     * @param colectionName 表名称
     * @param where 匹配条件
     * @param data 内容
     */
    public async UpdateOne(colectionName: string, where: object, data: object): Promise<boolean> {
        this.db = await this._connect();
        let result: UpdateWriteOpResult = await this.db.collection(colectionName).updateOne(where, { $set: data });
        if (result.result.n === 1 && result.result.nModified === 1 && result.result.ok === 1) {
            return true;
        } else {
            return false;
        }
    }
    /**
     * 修改多条数据
     * @param colectionName 表名称
     * @param where 匹配条件
     * @param data 内容
     */
    public async UpdateMany(colectionName: string, where: object, data: object): Promise<any> {
        this.db = await this._connect();
        let result: UpdateWriteOpResult = await this.db.collection(colectionName).updateMany(where, { $set: data });
        if (result.result.n >= 1 && result.result.nModified >= 1 && result.result.ok === 1) {
            return true;
        } else {
            return false;
        }
    }
    /**
     * 删除一条数据
     * @param colectionName 表名称
     * @param where 匹配条件
     */
    public async RemoveOne(colectionName: string, where: object): Promise<number> {
        this.db = await this._connect();
        let result: DeleteWriteOpResultObject = await this.db.collection(colectionName).deleteOne(where);
        if (result.result.n === 1  && result.result.ok === 1) {
            return 1;
        } else {
            return 0;
        }
    }
    /**
     * 删除一条数据
     * @param colectionName 表名称
     * @param where 匹配条件
     */
    public async RemoveMany(colectionName: string, where: object): Promise<number> {
        this.db = await this._connect();
        let result: DeleteWriteOpResultObject = await this.db.collection(colectionName).deleteMany(where);
        if (result.result.n >= 1  && result.result.ok === 1) {
            return result.result.n;
        } else {
            return 0;
        }
    }

    /**
     * 查询数据的条数
     * @param colectionName 表名称
     * @param where 查询条件
     * @param options 查询选项
     */
    public async Count(colectionName: string, where: object, options?: object): Promise<number> {
        this.db = await this._connect();
        return await this.db.collection(colectionName).countDocuments(where, options);
    }

    /**
     * 聚合查询
     * @param colectionName 表名称
     * @param pipeline 内容
     * @param options 查询选项
     */
    public async Aggregate(colectionName: string, pipeline: any, options: any): Promise<any> {
        this.db = await this._connect();
        return await this.db.collection(colectionName).aggregate(pipeline, options);
    }
}
export default Mongodb.Instance;