import { IncomingMessage } from "http";

const http = require("http");
const userUrl:string = process.argv[2]

http.get(userUrl, function (response: IncomingMessage){
    response.setEncoding("utf-8");
    response.on("data", console.log)
    response.on("error", console.error)
}).on("error", console.error)