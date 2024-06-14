const fl = require("./my-module");

const dirName = process.argv[2];
const extName = process.argv[3];

fl(dirName, extName, function (err, data) {
  if (err) {
    console.error("error", err);
  }
 data.forEach(function (file){
    console.log(file);
  });
});
