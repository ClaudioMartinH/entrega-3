const fs = require("fs");
const path = require("path");

function listFiles(dirname, extension, callback) {
  fs.readdir(dirname, function (err, data) {
    let answer = [];
    if (err) {
      return callback(err);
    }
    data.forEach(function(file) {
      if (path.extname(file) === "." + extension) {
          answer.push(file);
      }
    });
    callback(null, answer);
    return;
  });
};

module.exports = listFiles;