// koa
import * as Koa from 'koa'
import * as Router from "koa-router";
import * as routes from "../routes";
import { connectMysql, connectRedis } from '../config/index'
import plugin from '../middlewares/index'
import checkAuthorization from '../middlewares/checkAuthorization';
const _context = require("./context");
const dayjs = require("dayjs");

class Application extends Koa {
    // private app: Koa
    private router: Router

    constructor() {
        super();
        // this.app = new Koa()
        this.router = new Router();
        Object.assign(this.context, _context);
    }

    // start app
    async start() {
        //加载插件
        plugin(this)

        this.use(checkAuthorization())
        Object.keys(routes).forEach(key => {
            routes[key].forEach(route => {
                if (Array.isArray(route.middlewares)) {
                    route.middlewares.forEach(middleware => this.router[route.method || 'post'](route.path, middleware))
                }
                // allRoutes.push(route.path)
                return this.router[route.method || 'post'](route.path, route.action)
            });
        })
        this.use(this.router.routes());
        this.use(this.router.allowedMethods());

        this.listen(
            process.env.SERVER_PORT,
            this.started
        )
    }
    async started() {
        console.log(`Koa server has started, running with: http://127.0.0.1:${process.env.SERVER_PORT}. `)
        console.log(`[wy] Nodejs Version: ${process.version}`);
        console.log(`[wy] Nodejs Platform: ${process.platform} ${process.arch}`);
        console.log(`[wy] Server Enviroment: ${process.env.NODE_ENV || "development"}`);
        console.log(`[wy] Server Current Time: ${dayjs().format("YYYY-MM-DD HH:mm:ss")}`);

        connectMysql()
        connectRedis()
    }
}



export default new Application()