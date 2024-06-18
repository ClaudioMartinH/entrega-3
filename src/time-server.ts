import { Socket } from "net";
let dateFormat = require("strftime");
let net = require("net");
const port: string = process.argv[2];


const server = net.createServer(function listener(socket: Socket) {
    let now: Date = new Date();
    let printTime: string = dateFormat("%Y-%m-%d %H:%M", now);
    socket.write(printTime);
    socket.end("\n");
})
server.listen(Number(port));
