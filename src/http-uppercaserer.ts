import { IncomingMessage, ServerResponse } from "http";

const http = require('http');
const map = require('through2-map');
const port = Number(process.argv[2])

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
  if (req.method !== 'POST') {
    res.end('This is not a POST\n');
    return; 
  }

  req.pipe(map((chunk: { toString: () => string; }) => chunk.toString().toUpperCase())).pipe(res).on("error", (err: Error) => {
    console.error(err);
    res.end("Server error");
  });
});

server.listen(port);