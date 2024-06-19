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
import map from "through2-map"
import * as url from "url";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

function showMenu() {
  console.log(chalk.bgBlueBright.bold("Welcome to Baby Steps CLI"));
  console.log(chalk.bgGrey("Select an option from the ones behing"));
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
function helloWorld() {
  rl.question(
    chalk.cyanBright("Type the name you like and i'll wave you: "),
    (name: string) => {
      console.log(`Hello ${name}`);
    }
  );
  showMenu();
selectOption();
}
function babySteps() {
  rl.question(
    "Type two numbers separated by a space you'd like to know their addition ",
    (answer) => {
      const [firstNumber, secondNumber] = answer.split(" ");
      if (firstNumber && secondNumber) {
        const sum = parseInt(firstNumber) + parseInt(secondNumber);
        console.log(sum);
      } else {
        console.log(
          chalk.bgGrey("Please enter two numbers separated by a space")
        );
      }
    }
  );
  showMenu();
selectOption();
}
function myFirstIO() {
  rl.question(
    "Type the path to the text file you want to count the lines in it: ",
    (answer) => {
      const pathToFile = answer;
      const text = readFileSync(pathToFile, "utf-8");
      const lines = text.toString().split("\n").length - 1;
      console.log(chalk.blueBright(lines));
    }
  );
  showMenu();
selectOption();
}
function myFirstAsyncIO() {
  rl.question(
    "Type the path to the text file you want to count the lines in it: ",
    (answer) => {
      const pathToFile = answer;
      fs.readFile(
        pathToFile,
        (err: NodeJS.ErrnoException | null, data: Buffer) => {
          if (err) {
            return console.error(err);
          }
          const lines: number = data.toString().split("\n").length - 1;
          console.log(lines);
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
              console.log(chalk.bgGreenBright(file));
            }
          });
        }
      );
    }
  );
  showMenu();
selectOption();
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
    "I will filter for you in a folder the files with the extension you need. Type the folder as first argument and the extension you want to check as second argument with a blankspace in between: ",
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
            console.log(file);
          });
        }
      );
    }
  );
  showMenu();
selectOption();
}
function httpClient() {
  rl.question(
    chalk.blueBright(
      " Write a program that performs an HTTP GET request to a URL provided to you as the first command-line argument. Write the String contents of each data event from the response to a new line on the console  "
    ),
    (userUrl) => {
      http
        .get(userUrl, function (response: http.IncomingMessage) {
          response.setEncoding("utf-8");
          response.on("data", console.log);
          response.on("error", console.error);
        })
        .on("error", console.error);
    }
  );
  showMenu();
selectOption();
}
function httpCollect() {
  rl.question(
    chalk.blueBright(
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
            console.log(stringData.length);
            console.log(stringData);
          })
        );
      });
    }
  );
  showMenu();
selectOption();
}
function jugglingAsync() {
  const results: string[] = [];
  let counter: number = 0;
  function showResults(): void {
    for (let i: number = 0; i < 3; i++) {
      console.log(results[i]);
    }
  }
  rl.question(
    chalk.blueBright(
      "This program performs an HTTP GET request to three URL provided as first, second and third arguments in the console with a blankspace in between, and writes two lines to the console. The first line represents the number of characters recieved from the server and the second one contains the whole string sent by the server in each case "
    ),
    (userUrl) => {
      function getHttp(index: number): void {
        http.get(userUrl + index, (response: http.IncomingMessage) => {
          response.pipe(
            bl.default((err: Error, data: Buffer) => {
              if (err) return console.error(err);
              results[index] = data.toString();
              counter++;
              if (counter === 3) {
                showResults();
              }
            })
          );
        });
      }
      for (let i = 0; i < 3; i++) {
        getHttp(i);
      }
    }
  );
  showMenu();
selectOption();
}
function timeServer() {
  rl.question(chalk.blueBright(
    "This program is a TCP server that listen to connections on the port you should provide as first argument, and it will write the current date and 24 hour time in the console "),
    (port) => {
      const server = net.createServer(function listener(socket: Socket) {
        let now: Date = new Date();
        let printTime: string = dateFormat("%Y-%m-%d %H:%M", now);
        socket.write(printTime);
        socket.end("\n");
      });
      server.listen(Number(port));
    }
  );
  showMenu();
selectOption();
}
function httpFileServer() {
  rl.question(
    chalk.blueBright(
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
    }
  );
  showMenu();
selectOption();
}
function httpUppercaserer() {
  rl.question(chalk.blueBright("This program only recieves PORT requests and converts incoming POSTs body characters to upper-case and returns them to you. You should provide a port as first argument here: "), (port) => {
    const server = http.createServer((req: http.IncomingMessage, res: http.OutgoingMessage) => {
      if (req.method !== 'POST') {
        return res.end('This is not a POST\n');
      }
    
      req.pipe(map((chunk: { toString: () => string; }) => chunk.toString().toUpperCase())).pipe(res);
    });
    
    server.listen(port);
  });
  showMenu();
selectOption();
}
function httpJsonApiServer(){
  rl.question(chalk.blueBright("This program se4rves JSON data when it recieves a GET request to the path '/api/parsetime', the request should contain a query string with a iso key and iso-format time as value. The JSON served contains hour, minute and second properties.\n As a secons endpoint '/api/unixtime' accepts the same query string but returns UNIX epoch time in miliseconds since 1 jan 1970.\n You should provide the port as first argument on the console to run the program.  "), (port)=>{
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

http.createServer(function processDate(req: http.IncomingMessage, res: http.ServerResponse){
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

  })
  showMenu();
  selectOption();
}


function selectOption() {
  rl.question(chalk.bgMagentaBright(
    "Type here the number of your selection: "),
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
          console.log(chalk.redBright.bold("Bye!!!"));
          rl.close();
          break;
        default:
          console.log(
            chalk.redBright(
              "The option you typed isn't valid, please type a valid selection\n"
            )
          );
          showMenu();
          selectOption();
          break;
      }
    }
  );
}

