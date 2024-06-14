const fs = require("fs");
const path = require("path");
const folder = process.argv[2];
const extension = "." + process.argv[3];

fs.readdir(folder, function (err, list) {
    if (err) return console.error("error");
    list.forEach(function (file) {
        if (path.extname(file) === extension)
            console.log(file)
    })
})
