class Utils {
    private static utils: Utils = null;
    public static get Instance(): Utils {
        if (Utils.utils == null) {
            Utils.utils = new Utils();
        }
        return Utils.utils;
    }
    /**
     * 判断字符串是否为空
     * @param str 字符串
     */
    public IsNullOrEmpty(str: string): boolean {
        if (typeof (str) === "string") {
            if (str.trim() === "") {
                return true;
            } else {
                return false;
            }
        }
        return true;
    }
    /**
     * 判断字符串是否为数字
     * @param str 字符串
     */
    public IsNumber(str: string): boolean {
        return /^\d+(\.\d+)?$/.test(str);
    }
    /**
     * 判断字符串是否为E-Mail
     * @param str 字符串
     */
    public IsEmail(str: string): boolean {
        let pattern: RegExp = /^([A-Za-z0-9_\-\.])+\@(163.com|qq.com|126.com|gmail.com|yeah.net|foxmail.com)$/;
        return pattern.test(str);
    }
    /**
     * 转换字符串为boolen类型
     * @param str 字符串
     */
    public ParseBoolean(str: string): boolean {
        if (typeof (str) !== "string") {
            return false;
        }
        if (str === "false" || str === "0") {
            return false;
        } else if (str === "true" || str === "1") {
            return true;
        }
    }
    /**
     * 转换字符串为float类型
     * @param str 字符串
     */
    public ParseFloat(str: string): number {
        let result: number = Number(str);
        if (!isNaN(result)) {
            return Number(result.toFixed(2));
        } else {
            return 0.00;
        }
    }
    /**
     * 获取时间戳
     * @param day 当前日期以后的天数
     */
    public GetTimeStamp(day: number = -1): number {
        if (day === -1) {
            return (new Date()).valueOf();
        } else {
            let date: Date = new Date();
            date.setDate(date.getDate() + day);
            date.setHours(0);
            date.setMinutes(0);
            date.setSeconds(0);
            date.setMilliseconds(0);
            return date.valueOf();
        }

    }
    /**
     * 时间戳格式化[1983-12-12 11:30:30]
     * @param inputTime 时间戳
     */
    public FormatDateTime(inputTime: number): string {
        if (inputTime <= 0 || inputTime === undefined) {
            return "";
        }
        let date: Date = new Date(inputTime);
        let y: number = date.getFullYear();
        let m: number = date.getMonth() + 1;
        let mStr: string = m < 10 ? ("0" + m.toString()) : m.toString();
        let d: number = date.getDate();
        let dStr: string = d < 10 ? ("0" + d.toString()) : d.toString();
        let h: number = date.getHours();
        let hStr: string = h < 10 ? ("0" + h.toString()) : h.toString();
        let minute: number = date.getMinutes();
        let second: number = date.getSeconds();
        let minuteStr: string = minute < 10 ? ("0" + minute.toString()) : minute.toString();
        let secondStr: string = second < 10 ? ("0" + second.toString()) : second.toString();
        return `${y}-${mStr}-${dStr} ${hStr}:${minuteStr}:${secondStr}`;
    }
    /**
     * 时间戳格式化[364 天 23 小时 50 分钟]
     * @param mss 时间戳
     */
    public FormatDuring(mss: number): string {
        var days: number = parseInt((mss / (1000 * 60 * 60 * 24)).toString(), 10);
        var hours: number = parseInt(((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString(), 10);
        var minutes: number = parseInt(((mss % (1000 * 60 * 60)) / (1000 * 60)).toString(), 10);
        var seconds: number = (mss % (1000 * 60)) / 1000;
        return `${days} 天 ${hours} 小时 ${minutes} 分钟 `;
    }
    /**
     * 获取客户端IP地址
     * @param req 请求体
     */
    public GetClientIP(req: any): string {
        var ipAddress: any;
        var forwardedIpsStr: any = req.header("x-forwarded-for");
        if (forwardedIpsStr) {
            var forwardedIps: string = forwardedIpsStr.split(",");
            ipAddress = forwardedIps[0];
        }
        if (!ipAddress) {
            ipAddress = req.connection.remoteAddress;
        }
        return ipAddress;
    }
    /**
     * 获取当天0点0分0秒时间戳
     */
    public GetTodayStartTime(): number {
        let date: Date = new Date();
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date.valueOf();
    }
    /**
     * 获取当天23点59分59秒时间戳
     */
    public GetTodayEndTime(): number {
        let date: Date = new Date();
        date.setHours(23);
        date.setMinutes(59);
        date.setSeconds(59);
        date.setMilliseconds(0);
        return date.valueOf();
    }
}
export default Utils.Instance;