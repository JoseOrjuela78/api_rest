var CryptoJS = require("crypto-js");
class Secureconf {

    constructor() {

        this.str = '';
        this.secreyKey = process.env.SECURITY + 'c0443d0r-3mpr354r14l';
        this.encrypted = '';
    }

    encryptedFunc() {
        this.str = JSON.stringify(this.str);
        if (this.str.length == 0) {
            return
        }

        const encrypted = CryptoJS.AES.encrypt(this.str, this.secreyKey).toString();
        return encrypted;

    }

    decryptedFunc() {

        if (this.encrypted.length == 0) {
            return
        }

        const bytes = CryptoJS.AES.decrypt(this.encrypted, this.secreyKey);
        const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        return decrypted;
    }
}

module.exports = Secureconf;