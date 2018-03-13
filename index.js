const Koa = require("koa");
const marked = require("marked");

const fs = require("fs");

const app = new Koa();

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
  const fileData = await readFile('./blogAssets/test.md');
  ctx.response.body = fileData;
});

app.listen(3000);


