const Koa = require("koa");
const marked = require("marked");

const fs = require("fs");

const koaRouter = require("koa-router");

const app = new Koa();

const router = koaRouter();

const readFile = function (filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename,'utf-8',  (err, data) => {
      if(err) {
        resolve("404：页面未找到");
      } else {
        const datas = marked(data.toString());
        resolve(datas);
      }
    });
  });
};

router.get("/*", async ctx => {
  console.log(ctx.path)
  console.log(ctx.req.params);
  const path = `./blogAssets${ctx.path}.md`;
  const fileData = await readFile(path);
  ctx.response.body = fileData;
});

app.use(router.routes());

app.listen(3000, ()=>{
  console.log("listen on port 3000");
});


