import { axiosGet, axiosDelete, axiosPost, axiosPut } from '../tool/jiguangAxios'
import { joiValidate, getUUID } from '../tool';
import { getRepository, getConnection } from 'typeorm';
import { easemobBasic } from '../entity/easemobBasic';
const Joi = require("@hapi/joi")

export const register = async (ctx) => {
    let { data, dappId, userId } = ctx.request.body

    let findUser = await getRepository(easemobBasic).findOne({ dappId, userId })

    let username = getUUID()
    let password = getUUID().slice(0, 8)
    let nickname = getUUID().slice(0, 8)

    if (!findUser) {
        await joiValidate(ctx.request.body,
            {
                data: Joi.object({
                    // username: Joi.string().strict().required(),
                    // password: Joi.string().strict().required(),
                    // nickname: Joi.string().strict().required(),
                    avatar: Joi.string().strict(),
                    birthday: Joi.string().strict().length(10),
                    signature: Joi.string().strict(),
                    gender: Joi.number().integer().strict().min(0).max(2),
                    region: Joi.string().strict(),
                    address: Joi.string().strict(),
                    extras: Joi.object().strict(),
                }),
                dappId: Joi.number(),
                userId: Joi.number(),
            }
        );

        await getConnection()
            .createQueryBuilder()
            .insert()
            .into(easemobBasic)
            .values(Object.assign({
                dappId,
                userId,
                username,
                password,
                nickname,
            }, data))
            .execute();

        let aaa = Object.assign({ username, password, nickname }, data)
        return ctx.body = await axiosPost("/v1/users/", [aaa])
    } else {
        return ctx.body = await axiosPost("/v1/users/", [{
            username: findUser.username,
            password: findUser.password,
            nickname: findUser.nickname,
        }])
    }


} 