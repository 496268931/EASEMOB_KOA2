const filterRoutes = [
  /^\/$/,
  /^\/getInitToken/,
  // /^((?!\/api).)*$/
]
export default () => async (ctx, next) => {
  // console.log(ctx.url)                //      /user/getUsers?limit=1
  // console.log(ctx.originalUrl)        //      /user/getUsers?limit=1
  // console.log(ctx.origin)             //      http://localhost:8888
  // console.log(ctx.path)               //      /user/getUsers
  // console.log(ctx.href)               //      http://localhost:8888/user/getUsers?limit=1

  // let filter = filterRoutes.some(one => {
  //   return (new RegExp(one)).test(ctx.path)
  // })
  // if (!filter) {
  //   if (!ctx.get('Authorization')) return ctx.fail('缺少Authorization')
  // }
  return next()
}