const path = require("path");

const fs = require("fs");

export function listFiles(dirName: string, fileExt: string, callback: CallableFunction) {
  fs.readdir(dirName, function (err: Error, data: string[]) {
    let answer: string[] = [];
    if (err) {
        return callback(err);
    }
    data.forEach(function(file) {
        if (path.extname(file) === "." + fileExt) {
            answer.push(file);
        }
    });
    callback(null, answer);
    return;
})
}
module.exports = listFiles;