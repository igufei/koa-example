import fs from "fs";
import path from "path";
class Fs {
    private static fs: Fs = null;
    public static get Instance(): Fs {
        if (Fs.fs == null) {
            Fs.fs = new Fs();
        }
        return Fs.fs;
    }
    /**
     * 读取文件内容
     * @param path 文件路径
     */
    public async ReadFile(filePath: string): Promise<string> {
        return new Promise((resovle, reject) => {
            fs.readFile(filePath, "utf8", (err, data) => {
                if (err) {
                    reject(err);
                    return;
                }
                resovle(data);
            });
        });
    }
    /**
     * 删除目录
     * @param dirPath 目录路径
     */
    public async RemoveDir(dirPath: string): Promise<void> {
        let files: string[] = await this.Readdir(dirPath);
        for (let file of files) {
            const filePath: string = path.resolve(dirPath, file);
            let stats: fs.Stats = await this.Stat(filePath);
            if (stats.isDirectory()) {
                await this.RemoveDir(filePath);
            } else {
                await this.RemoveFile(filePath);
            }
        }
        fs.rmdirSync(dirPath);
    }
    /**
     * 读取目录列表
     * @param dirPath 目录路径
     */
    public async Readdir(dirPath: string): Promise<string[]> {
        return new Promise((resovle, reject) => {
            fs.readdir(dirPath, "utf8", (err, files) => {
                if (err) {
                    reject(err);
                    return;
                }
                resovle(files);
            });
        });
    }
    /**
     * 获取文件属性
     * @param filePath 文件路径
     */
    public async Stat(filePath: string): Promise<fs.Stats> {
        return new Promise((resovle, reject) => {
            fs.stat(filePath, (err, stats) => {
                if (err) {
                    reject(err);
                    return;
                }
                resovle(stats);
            });
        });
    }
    /**
     * 删除文件
     * @param filePath 文件路径
     */
    public async RemoveFile(filePath: string): Promise<void> {
        return new Promise((resovle, reject) => {
            fs.unlink(filePath, (err) => {
                if (err) {
                    reject(err);
                    return;
                }
                resovle(null);
            });
        });
    }
    /**
     * 文件是否存在
     * @param filePath 文件路径
     */
    public async Exists(filePath: string): Promise<boolean> {
        return new Promise((resovle, reject) => {
            fs.stat(filePath, (err, stats) => {
                if (err) {
                    resovle(false);
                    return;
                }
                resovle(true);
            });
        });
    }
}
export default Fs.Instance;