const config = require("config");
const CryptoJS = require("crypto-js");
//https://cryptojs.gitbook.io/docs/
module.exports = {
    encrypt: (data) =>{
       return CryptoJS.AES.encrypt(data, config.get('cryptoKey')).toString();
    },
    check: (password, encrypted)=>{
        const bytes  = CryptoJS.AES.decrypt(encrypted, config.get('cryptoKey'));
        return  password === bytes.toString(CryptoJS.enc.Utf8);
    }

}