import { IncomingMessage } from "http";

const http = require("http");
const bl = require("bl");
const userUrl: string = process.argv[2];

http.get(userUrl, function callback(response: IncomingMessage) {
  response.pipe(
    bl(function (err: Error, data: string) {
      if (err) {
        return console.error(err);
      }
      data = data.toString();
      console.log(data.length);
      console.log(data);
    })
  );
});
