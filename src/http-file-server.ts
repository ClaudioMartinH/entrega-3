import { ServerResponse } from "http";

const http = require("http");
const fs = require("fs");
const port: string = process.argv[2];
const file: string = process.argv[3];

http.createServer(function callback(req: Request, res: ServerResponse){
    res.writeHead(200, {"Content-Type": "Text/Plain"});
    fs.createReadStream(file).pipe(res);
}).listen(Number(port));