const fl = require("./my-module");
const dirName: string = process.argv[2];
let userExt: string = "." + process.argv[3];

fl(dirName, userExt, function(err: Error, file: string[]){
    if (err){
        console.error(err);
    }
    file.forEach((file) => {
        console.log(file);
    })
})
