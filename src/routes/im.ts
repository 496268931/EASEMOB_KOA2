const fs = require('fs')
const path = require("path");
const test = async (ctx, next) => {
  console.log(2221111)
  await next()
}

const test1 = async (ctx, next) => {
  console.log(23456787)
  await next()
}
export const imRoutes = [
  {
    path: "/",
    method: "get",
    action: ctx => ctx.body = 'hello world',
    middlewares: [test, test1]
  },
];