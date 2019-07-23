import { success } from './../base/context';
import { axiosPost } from '../tool/jiguangAxios'
import { joiValidate, getUUID, createTimeStamp, createNonceStr, md5Data } from '../tool';
import { getRepository, getConnection } from 'typeorm';
import { easemobBasic } from '../entity/easemobBasic';
const Joi = require("@hapi/joi")

export function getAuthorization(){
    return new Buffer(`${process.env.JIGUANG_APPKEY}:${process.env.JIGUANG_MASTERSECRET}`).toString('base64');
}

export const getInitToken = async (ctx) => {
    
    let timestamp = createTimeStamp()
    let random_str = createNonceStr()
    let signature = md5Data(`appkey=${process.env.JIGUANG_APPKEY}&timestamp=${timestamp}&random_str=${random_str}&key=${process.env.JIGUANG_MASTERSECRET}`)
    return ctx.success({
        "appkey": process.env.JIGUANG_APPKEY,
        random_str,
        timestamp,
        signature
    })
}
