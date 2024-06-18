import { IncomingMessage, OutgoingMessage } from "http";
const http = require("http");
const map = require("through2-map");
const port: number = Number(process.argv[2]);

http.createServer((req: IncomingMessage, res: OutgoingMessage) => {
  if (req.method !== "POST") {
    return res.end("This is not a POST\n");
  }
  req.pipe(map((chunk: { toString: () => string; }) => chunk.toString().toUpperCase())).pipe(res);
}).listen(port);