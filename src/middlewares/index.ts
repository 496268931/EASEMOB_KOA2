import * as Koa from 'koa'
import * as xmlParser from "koa-xml-body";
import * as KoaLogger from 'koa-logger'
import * as bodyParser from "koa-bodyparser";
import * as koaBody from "koa-body";
import * as cors from 'koa2-cors'
import * as koaJwt from 'koa-jwt'

//不需要jwtToken的路由
const filterRoutes = [
  /^\/$/,
  // /^\/abc/,

  // /^((?!\/api).)*$/
]
const Middlewares = (app: Koa) => {
  app.use(KoaLogger())
  app.use(xmlParser())
  app.use(koaBody({
    multipart: true,
    formidable: {
      // multipart:true,
      maxFileSize: 200 * 1024 * 1024 // 设置上传文件大小最大限制，默认2M
    }
  }))

  // Custom 401 handling if you don't want to expose koa-jwt errors to users
  app.use((ctx, next) => {
    return next().catch((err) => {
      console.log(`捕获异常${ctx.url}`)
      console.log(err)
      if (err.isAxiosError && err.response && err.response.status && err.response.data) {
        // ctx.status = 401;
        ctx.status = err.response.status;
        ctx.body = err.response.data;
      } else {
        ctx.body = {
          status: "error",
          message: err.message
        }
      }
    });
  })
  // to use 'apidoc' in local env
  if (process.env.NODE_ENV != 'production') {
    console.log("跨域")
    app.use(cors());
  }

  // app.use(koaJwt({ secret: process.env.JWT_SECRET, key: "jwtInfo" }).unless({
  //     // 设置login、register接口，可以不需要认证访问
  //     path: filterRoutes
  // }));

};

export default Middlewares;
