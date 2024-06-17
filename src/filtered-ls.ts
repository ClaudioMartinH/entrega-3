const fs = require("fs");
const path = require("path");
const folder: string = process.argv[2];
const ext: string = "." + process.argv[3];

fs.readdir(folder, function callback(err: Error, data: string[]) {
  if (err) {
    return console.error(err);
  }
  data.forEach(function (file) {
    if (path.extname(file) === ext) {
      console.log(file);
    }
  });
});
