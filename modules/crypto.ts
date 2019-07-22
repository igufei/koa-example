import * as crypto from "crypto";
import * as constants from "constants";
class CryptoHelper {
    private static cryptoHelper: CryptoHelper = null;
    public static get Instance(): CryptoHelper {
        if (CryptoHelper.cryptoHelper == null) {
            CryptoHelper.cryptoHelper = new CryptoHelper();
        }
        return CryptoHelper.cryptoHelper;
    }
    /**
     * MD5加密
     * @param content 明文
     */
    public Md5encrypt(content: string): string {
        var md5: any = crypto.createHash("md5");
        md5.update(content);
        var result: string = md5.digest("hex").toUpperCase();
        return result;
    }
    /**
     * DES加密
     * @param plaintext 明文
     * @param key 8位密钥
     */
    public DESencrypt(plaintext: string, key: string): string {
        var ecb: string = "DES";
        var enkey: any = Buffer.from(key);
        var iv: any = key;
        var eniv: Buffer = Buffer.from(iv ? iv : 0, "binary");
        var cipher: any = crypto.createCipheriv(ecb, enkey, eniv);
        cipher.setAutoPadding(true);
        var ciph: string = cipher.update(plaintext, "utf8", "base64");
        ciph += cipher.final("base64");
        return ciph;
    }
    /**
     * DES
     * @param encrypt_text 密文
     * @param key 8位密钥
     */
    public DESdecrypt(encrypt_text: string, key: string): string {
        var ecb: string = "DES";
        var dekey: Buffer = Buffer.from(key);
        var iv: any = key ? key : 0;
        var deiv: any = Buffer.from(iv, "binary");
        var decipher: any = crypto.createDecipheriv(ecb, dekey, deiv);
        decipher.setAutoPadding(true);
        var txt: string = decipher.update(encrypt_text, "base64", "utf8");
        txt += decipher.final("utf8");
        return txt;
    }
    /**
     * RSA加密
     * @param plaintext 明文
     * @param private_key RSA私钥
     */
    public RSAencrypt(plaintext: string, private_key: string): string {
        var data: any = Buffer.from(plaintext);
        var result: string = crypto.privateEncrypt({ key: private_key, padding: constants.RSA_PKCS1_PADDING }, data)
            .toString("base64");
        return result;
    }
    /**
     * RSA解密
     * @param encrypt_text 密文
     * @param private_key RSA私钥
     */
    public RSAdecrypt(encrypt_text: string, private_key: string): string {
        var data: any = Buffer.from(encrypt_text, "base64");
        var result: string = crypto.privateDecrypt({ key: private_key, padding: constants.RSA_PKCS1_PADDING }, data)
            .toString("utf8");
        return result;
    }
    /**
     * AES加密
     * @param plaintext 明文
     * @param key 16位密钥
     */
    public AESencrypt(plaintext: string, key: string): string {
        var ecb: string = "aes-128-ecb";
        var clearEncoding: any = "utf8";
        var iv: string = "";
        var cipherEncoding: any = "base64";
        var cipher: crypto.Cipher = crypto.createCipheriv(ecb, key, iv);
        var cipherChunks: any[] = [];
        cipherChunks.push(cipher.update(plaintext, clearEncoding, cipherEncoding));
        cipherChunks.push(cipher.final(cipherEncoding));
        var result: string = cipherChunks.join("");
        return result;

    }
    /**
     * AES解密
     * @param encrypt_text 密文
     * @param key 16位密钥
     */
    public AESdecrypt(encrypt_text: string, key: string): string {
        var iv: string = "";
        var clearEncoding: string = "utf8";
        var cipherEncoding: string = "base64";
        var cipherChunks: any[] = [];
        var decipher: any = crypto.createDecipheriv("aes-128-ecb", key, iv);
        decipher.setAutoPadding(true);
        cipherChunks.push(decipher.update(encrypt_text, cipherEncoding, clearEncoding));
        cipherChunks.push(decipher.final(clearEncoding));
        var result: string = cipherChunks.join("");
        return result;
    }
    /**
     * RC4加密
     * @param plaintext 明文
     * @param pwd 密钥
     */
    public RC4encrypt(plaintext: string, pwd: string): string {
        let key: number[] = Array(256);
        let box: number[] = Array(plaintext.length);
        for (let i: number = 0; i < 256; i++) {
            key[i] = pwd.charCodeAt(i % pwd.length);
            box[i] = i;
        }
        let j: number = 0;
        let a: number = 0;
        for (let i: number = 0; i < 256; i++) {
            let tmp: number;
            j = (j + box[i] + key[i]) % 256;
            tmp = box[i];
            box[i] = box[j];
            box[j] = tmp;
        }
        let cipher: string = "";
        j = 0;
        a = 0;
        for (let i: number = 0; i < plaintext.length; i++) {
            let tmp: number;
            a = (a + 1) % 256;
            j = (j + box[a]) % 256;
            tmp = box[a];
            box[a] = box[j];
            box[j] = tmp;
            let k: number = box[((box[a] + box[j]) % 256)];
            // tslint:disable-next-line:no-bitwise
            cipher += String.fromCharCode(plaintext.charCodeAt(i) ^ k);
        }
        return Buffer.from(cipher, "utf8").toString("base64");
    }
    /**
     * RC4解密
     * @param encrypt_text 密文
     * @param pwd 密钥
     */
    public RC4decrypt(encrypt_text: string, pwd: string): string {
        encrypt_text = Buffer.from(encrypt_text, "base64").toString("utf8");
        let key: number[] = Array(256);
        let box: number[] = Array(encrypt_text.length);
        for (let i: number = 0; i < 256; i++) {
            key[i] = pwd.charCodeAt(i % pwd.length);
            box[i] = i;
        }
        let j: number = 0;
        let a: number = 0;
        for (let i: number = 0; i < 256; i++) {
            let tmp: number;
            j = (j + box[i] + key[i]) % 256;
            tmp = box[i];
            box[i] = box[j];
            box[j] = tmp;
        }
        let cipher: string = "";
        a = 0;
        j = 0;
        for (let i: number = 0; i < encrypt_text.length; i++) {
            let tmp: number;
            a = (a + 1) % 256;
            j = (j + box[a]) % 256;
            tmp = box[a];
            box[a] = box[j];
            box[j] = tmp;
            let k: number = box[((box[a] + box[j]) % 256)];
            // tslint:disable-next-line:no-bitwise
            cipher += String.fromCharCode(encrypt_text.charCodeAt(i) ^ k);
        }
        return cipher;
    }
    /**
     * 自定义加密
     * @param plaintext 明文
     * @param rsa_encrypt_text rsa密文
     * @param private_key rsa私钥
     */
    public Mydecrypt(plaintext: string, rsa_encrypt_text: string, private_key: string): object {
        let rc4key: string = this.RSAdecrypt(rsa_encrypt_text, private_key);
        return { "deText": this.RC4decrypt(plaintext, rc4key), "rc4key": rc4key };
    }
    /**
     * 自定义解密
     * @param encrypt_text 密文
     * @param private_key rsa私钥
     */
    public Myencrypt(encrypt_text: string, private_key: string): string {
        let rc4key: string = this.MakeKey(10);
        let enrc4key: string = this.RSAencrypt(rc4key, private_key);
        let enrc4data: string = this.RC4encrypt(encrypt_text, rc4key);
        return `${enrc4key}${enrc4data}`;
    }
    /**
     * 生成num位随机字符串
     * @param num 个数
     */
    public MakeKey(num: number): string {
        var str: string = "",
            range: number = num,
            arr: string[] = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
                "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
                "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
                "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
                "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
        for (let i: number = 0; i < range; i++) {
            let pos: number = Math.round(Math.random() * (arr.length - 1));
            str += arr[pos];
        }
        return str;
    }
}

export default CryptoHelper.Instance;