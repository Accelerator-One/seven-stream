const CryptoJS = require('crypto-js');

class CryptService {

  encrypt = async (data, passwd) => {
    return await CryptoJS.AES.encrypt(JSON.stringify(data), passwd).toString();
  }

  decrypt = async (data, passwd) => {
    return await CryptoJS.AES.decrypt(data, passwd).toString(CryptoJS.enc.Utf8);
  }
}

let cryptObj = new CryptService();
module.exports = cryptObj;
