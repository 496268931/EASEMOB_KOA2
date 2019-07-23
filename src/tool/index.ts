const Joi = require('@hapi/joi')
const UUID = require('uuid');
const crypto = require('crypto');
export function joiValidate(keys = {}, schema = {}) {
    try {
        return new Promise((resolve, reject) => {
            Joi.validate(keys, schema, (err, value) => {
                if (err) reject(err);
                // console.log(value)
                resolve(true);
            });
        });
    } catch (error) {
        throw error;
    }
}
export function getUUID() {
    return UUID.v1().replace(/-/g, "")
}

// 随机字符串产生函数  
export function createNonceStr(len = 32) {

    let chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    let maxPos = chars.length;
    let pwd = '';
    for (let i = 0; i < len; i++) {
        pwd += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}

// 时间戳产生函数  
export function createTimeStamp() {
    return '' + new Date().getTime()
}

export const md5Data = (data) => {
    return crypto.createHash('md5').update(data).digest("hex")
}
