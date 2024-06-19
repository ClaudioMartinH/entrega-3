import { IncomingMessage, OutgoingMessage } from "http";

const http = require("http");
const map = require("through2-map")
const port: Number = Number(process.argv[2]);

http.createServer(function(req: IncomingMessage, res: OutgoingMessage){
    if (req.method !== "POST"){
        res.end("This is not a POST");
    }
    req.pipe(map((chunk: { toString: () => string; }) => chunk.toString().toUpperCase())).pipe(res)
}).listen(port)