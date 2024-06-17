const fs = require("fs");
const pathToFile: string = process.argv[2];

fs.readFile(pathToFile, "utf-8", function callback(err: Error, data: string){
  if (err){
    return console.error(err);
  }
  const lines: number = data.toString().split("\n").length -1; 
  console.log(lines);
})