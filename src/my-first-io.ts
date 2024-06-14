const fs = require("fs");
const pathFile: string = process.argv[2];
const text: string = fs.readFileSync(pathFile, "utf-8");
const lines: number = text.toString().split("\n").length -1;
console.log(lines);