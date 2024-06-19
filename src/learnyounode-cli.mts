import { createInterface } from "readline";
import chalk from "chalk";
import { readFileSync } from "fs";
import * as fs from "fs";
import * as path from "path";
import * as http from "http";
import * as bl from "bl";
import * as net from "net";
import { Socket } from "net";
import dateFormat from "strftime";
import map from "through2-map";
import * as url from "url";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

function showMenu() {
  console.log(chalk.bgGreen.bold("\nWelcome to LearnYouNode CLI\n"));
  console.log(chalk.bgGrey("Select an option from the ones behind\n"));
  console.log("1. Hello World");
  console.log("2. Baby Steps");
  console.log("3. My first I/O");
  console.log("4. My first async I/O");
  console.log("5. Filtered LS");
  console.log("6. Make it Modular");
  console.log("7. HTTP client");
  console.log("8. HTTP collect");
  console.log("9. Juggling Async");
  console.log("10. Time server");
  console.log("11. HTTP File server");
  console.log("12. HTTP UpperCaserer");
  console.log("13. HTTP JSON API Server");
  console.log("14. Exit");
  console.log("\n");
}
function endTask() {
  showMenu();
  selectOption();
}
function helloWorld() {
  rl.question(
    chalk.cyanBright("\nType the name you like and i'll wave you: "),
    (name: string) => {
      console.log(chalk.bgBlackBright(`\nHello ${name}\n`));
      endTask();
    }
  );
}

function babySteps() {
  rl.question(
    chalk.cyanBright("\nType two numbers separated by a space you'd like to know their addition "),
    (answer) => {
      const [firstNumber, secondNumber] = answer.split(" ");
      if (firstNumber && secondNumber) {
        const sum = parseInt(firstNumber) + parseInt(secondNumber);
        console.log(chalk.bgBlackBright(`\n${sum}\n`));
      } else {
        console.log(
          chalk.bgGrey("Please enter two numbers separated by a space")
        );
      }
      endTask();
    }
  );
}
function myFirstIO() {
  rl.question(
    chalk.cyanBright(
      "Type the path to the text file you want to count the lines in it: "
    ),
    (answer) => {
      const pathToFile = answer;
      const text = readFileSync(pathToFile, "utf-8");
      const lines = text.toString().split("\n").length - 1;
      console.log(chalk.bgBlackBright(`\n${lines}\n`));
      endTask();
    }
  );
}
function myFirstAsyncIO() {
  rl.question(
    chalk.cyanBright("Type the path to the text file you want to count the lines in it: "),
    (answer) => {
      const pathToFile = answer;
      fs.readFile(
        pathToFile,
        (err: NodeJS.ErrnoException | null, data: Buffer) => {
          if (err) {
            return console.error(err);
          }
          const lines: number = data.toString().split("\n").length - 1;
          console.log(chalk.bgBlackBright(`\n${lines}\n`));
          endTask();
        }
      );
    }
  );
}
function filteredLs() {
  rl.question(
    chalk.cyanBright(
      "I will filter for you in a folder the files with the extension you need. Type the folder as first argument and the extension you want to check as second argument with a blankspace in between: "
    ),
    (answer) => {
      const [folder, extension] = answer.split(" ");
      fs.readdir(
        folder,
        function callback(err: NodeJS.ErrnoException | null, data: string[]) {
          if (err) {
            return console.error(err);
          }
          data.forEach(function (file) {
            if (path.extname(file) === "." + extension) {
              console.log(chalk.bgBlackBright(`\n${file}\n`));
            }
          });
          endTask();
        }
      );
    }
  );
}
function listFiles(
  dirName: string,
  fileExt: string,
  callback: CallableFunction
) {
  fs.readdir(
    dirName,
    function (err: NodeJS.ErrnoException | null, data: string[]) {
      let answer: string[] = [];
      if (err) {
        return callback(err);
      }
      data.forEach(function (file) {
        if (path.extname(file) === "." + fileExt) {
          answer.push(file);
        }
      });
      callback(null, answer);
      return;
    }
  );
}
function makeItModular() {
  rl.question(
    chalk.cyanBright(
      "I will filter for you in a folder the files with the extension you need. Type the folder as first argument and the extension you want to check as second argument with a blankspace in between: "
    ),
    (answer) => {
      const [folder, extension] = answer.split(" ");
      listFiles(
        folder,
        extension,
        function (err: NodeJS.ErrnoException | null, data: string[]) {
          if (err) {
            console.error(err);
          }
          data.forEach((file) => {
            console.log(chalk.bgBlackBright(`${file}`));
          });
          endTask();
        }
      );
    }
  );
}
function httpClient() {
  rl.question(
    chalk.cyanBright(
      "I will perform an HTTP GET request to a URL that you have to provide me as the first command-line argument. I will write the String contents of each data event from the response to a new line on the console  "
    ),
    (userUrl) => {
      http
        .get(userUrl, function (response: http.IncomingMessage) {
          response.setEncoding("utf-8");
          response.on("data", console.log);
          response.on("end", () => {
            endTask();
          });
          response.on("error", (err) => {
            console.error(err);
            endTask();
          });
        })
        .on("error", (err) => {
          console.error(err);
          endTask();
        });
    }
  );
}
function httpCollect() {
  rl.question(
    chalk.cyanBright(
      "This program performs an HTTP GET request to an URL provided as first argument in the console, and writes two lines to the console. The first line represents the number of characters recieved from the server and the second one contains the whole string sent by the server "
    ),
    (userUrl) => {
      http.get(userUrl, function callback(response: http.IncomingMessage) {
        response.pipe(
          bl.default((err: Error, data: Buffer) => {
            if (err) {
              return console.error(err);
            }
            const stringData = data.toString();
            console.log(chalk.bgBlackBright(`\n${stringData.length}\n`));
            console.log(chalk.bgBlackBright(`\n${stringData}\n`));
            endTask();
          })
        );
      });
    }
  );
}

function jugglingAsync() {
  rl.question(
    chalk.cyanBright(
      "This program performs an HTTP GET request to three URLs provided as first, second and third arguments in the console with a blank space in between, and writes the response of each request to the console."
    ),
    (userUrls) => {
      const urls = userUrls.split(" ");
      if (urls.length !== 3) {
        console.log(
          chalk.red(
            "You must provide me exactly three URLs separated by spaces."
          )
        );
        endTask();
        return;
      }

      const results: string[] = [];
      let counter: number = 0;

      function showResults() {
        for (let i = 0; i < 3; i++) {
          console.log(results[i]);
        }
        endTask();
      }

      function getHttp(index: number) {
        http
          .get(urls[index], (res) => {
            let data: string = "";
            res.setEncoding("utf8");
            res.on("data", (chunk) => (data += chunk));
            res.on("end", () => {
              results[index] = data;
              counter++;
              if (counter === 3) {
                showResults();
              }
            });
            res.on("error", (err) => {
              console.error(err);
              endTask();
            });
          })
          .on("error", (err) => {
            console.error(err);
            endTask();
          });
      }

      for (let i = 0; i < 3; i++) {
        getHttp(i);
      }
    }
  );
}
function timeServer() {
  rl.question(
    chalk.cyanBright(
      "This program is a TCP server that listen to connections on the port you should provide as first argument, and it will write the current date and 24 hour time in the console "
    ),
    (port) => {
      const server = net.createServer(function listener(socket: Socket) {
        let now: Date = new Date();
        let printTime: string = dateFormat("%Y-%m-%d %H:%M", now);
        socket.write(printTime);
        socket.end("\n");
      });
      server.listen(Number(port));
      endTask();
    }
  );
}
function httpFileServer() {
  rl.question(
    chalk.cyanBright(
      "This program provides the same file for each connection. You should write the port as the first argument in the console, and the path to the file on the second argument, separated by a blankspace "
    ),
    (answer) => {
      const [port, file] = answer.split(" ");
      http
        .createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
          res.writeHead(200, { "Content-Type": "Text/Plain" });
          fs.createReadStream(file).pipe(res);
        })
        .listen(Number(port));
      endTask();
    }
  );
}
function httpUppercaserer() {
  rl.question(
    chalk.cyanBright(
      "This program only recieves POST requests and converts incoming POSTs body characters to upper-case and returns them to you. You should provide a port as first argument here: "
    ),
    (port) => {
      const server = http.createServer(
        (req: http.IncomingMessage, res: http.OutgoingMessage) => {
          if (req.method !== "POST") {
            res.end("This is not a POST\n");
            endTask();
            return;
          }

          req
            .pipe(
              map((chunk: { toString: () => string }) =>
                chunk.toString().toUpperCase()
              )
            )
            .pipe(res);
        }
      );
      server.listen(port);
    }
  );
}
function httpJsonApiServer() {
  rl.question(
    chalk.cyanBright(
      "This program serves JSON data when it recieves a GET request to the path '/api/parsetime', the request should contain a query string with a iso key and iso-format time as value. The JSON served contains hour, minute and second properties.\n As a secons endpoint '/api/unixtime' accepts the same query string but returns UNIX epoch time in miliseconds since 1 jan 1970.\n You should provide the port as first argument on the console to run the program.  "
    ),
    (port) => {
      const endpoint1: string = "/api/parsetime";
      const endpoint2: string = "/api/unixtime";

      function parseDate(date: Date) {
        return {
          hour: date.getHours(),
          minute: date.getMinutes(),
          second: date.getSeconds(),
        };
      }
      function toUnixTime(date: Date) {
        return { unixtime: date.getTime() };
      }

      http
        .createServer(function processDate(
          req: http.IncomingMessage,
          res: http.ServerResponse
        ) {
          const parsedUrl = url.parse(req.url ?? "", true);
          const dateValue = parsedUrl.query.iso as string;

          const date: Date = new Date(dateValue);
          let result;
          if (parsedUrl.pathname === endpoint1) {
            result = parseDate(date);
          } else if (parsedUrl.pathname === endpoint2) {
            result = toUnixTime(date);
          } else {
            res.writeHead(404);
            res.end();
            return;
          }
          let jsonObject: string = JSON.stringify(result);
          res.writeHead(200, { "content-type": "application/json" });
          res.end(jsonObject);
          endTask();
        })
        .listen(port);
    }
  );
}

function selectOption() {
  rl.question(
    chalk.bgMagentaBright("Type here the number of your selection: "),
    (selection: string) => {
      switch (selection) {
        case "1":
          helloWorld();
          break;
        case "2":
          babySteps();
          break;
        case "3":
          myFirstIO();
          break;
        case "4":
          myFirstAsyncIO();
          break;
        case "5":
          filteredLs();
          break;
        case "6":
          makeItModular();
          break;
        case "7":
          httpClient();
          break;
        case "8":
          httpCollect();
          break;
        case "9":
          jugglingAsync();
          break;
        case "10":
          timeServer();
          break;
        case "11":
          httpFileServer();
          break;
        case "12":
          httpUppercaserer();
          break;
        case "13":
          httpJsonApiServer();
          break;
        case "14":
          console.log(chalk.redBright.bold("\n Bye!!! \n"));
          rl.close();
          break;
        default:
          console.log(
            chalk.redBright(
              "The option you typed isn't valid, please type a valid selection\n"
            )
          );
          endTask();
          break;
      }
    }
  );
}
endTask();
