const Koa = require("koa");
const marked = require("marked");

const fs = require("fs");

const koaRouter = require("koa-router");

const app = new Koa();

const routers = koaRouter();

const readFile = function (filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename,'utf-8',  (err, data) => {
      if(err) throw err;
      const datas = marked(data.toString());
      resolve(datas);
    });
  });
};

app.use(async ctx => {
  console.log(ctx.path)
  console.log(ctx.req.params);
  const fileData = await readFile('./blogAssets/test.md');
  ctx.response.body = fileData;
});

app.listen(3000, ()=>{
  console.log("listen on port 3000");
});


