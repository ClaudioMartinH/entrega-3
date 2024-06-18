import { IncomingMessage, ServerResponse } from "http";

const http = require("http");
const url = require("url");
const port: number = Number(process.argv[2]);
const endpoint1: string = "/api/parsetime";
const endpoint2: string = "/api/unixtime";

function parseDate(date: Date) {
  return {
    hour: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds()
  };
}
function toUnixTime(date: Date) {
  return { unixtime: date.getTime() };
}

http.createServer(function processDate(req: IncomingMessage, res: ServerResponse){
  const parsedUrl = url.parse(req.url ?? "", true);
  const dateValue = parsedUrl.query.iso as string;

  const date: Date = new Date(dateValue);
  let result;
  if (parsedUrl.pathname === endpoint1){
    result = parseDate(date);
  } else if (parsedUrl.pathname === endpoint2){
    result = toUnixTime(date);
  } else {
    res.writeHead(404);
    res.end();
    return;
  }
  let jsonObject: string = JSON.stringify(result);
  res.writeHead(200, {"content-type":"application/json" });
  res.end(jsonObject)
}).listen(port);
