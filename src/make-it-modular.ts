const fl = require("./my-module");
let dirName:string = process.argv[2];
let userExt:string = process.argv[3];

fl(dirName, userExt, function(err: Error, data: string[]){
    if (err){
        console.error(err);
    }
    data.forEach((file) => {
        console.log(file);
    })
})
