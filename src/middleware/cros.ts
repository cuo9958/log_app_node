/**
 * 跨域
 */
export default async function (ctx: any, next: any) {
    ctx.set("Access-Control-Allow-Origin", "*");
    next();
}
