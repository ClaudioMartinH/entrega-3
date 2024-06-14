const fs = require("fs");

const output = fs.readFile(process.argv[2], "utf-8", (err, data) => {
    if (err) {
        return console.error('error')
    } else {
    const lines = data.toString().split("\n").length -1;
    console.log(lines)
    }
})