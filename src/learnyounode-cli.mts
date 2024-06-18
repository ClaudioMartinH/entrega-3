import { createInterface } from "readline";
import chalk from "chalk";
import { readFileSync } from "fs";
import * as fs from "fs";
import * as path from "path";
import * as http from "http";

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
  rl.question(chalk.cyanBright("Type the name you like: "), (name: string) => {
    console.log(`Hello ${name}`);
  });
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
    chalk.cyanBright("I will filter for you in a folder the files with the extension you need. Type the folder as first argument and the extension you want to check as second argument with a blankspace in between: "),
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
function makeItModular(){
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
});
}
function httpClient(){
  rl.question(
    chalk.blueBright(
      " Write a program that performs an HTTP GET request to a URL provided to you as the first command-line argument. Write the String contents of each data event from the response to a new line on the console  "
    ), (userUrl) =>{
      http
        .get(userUrl, function (response: http.IncomingMessage) {
          response.setEncoding("utf-8");
          response.on("data", console.log);
          response.on("error", console.error);
        })
        .on("error", console.error);
    }
  );
}

function selectOption() {
  rl.question(
    "Type here the number of your selection: ",
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
          break;
        case "9":
          break;
        case "10":
          break;
        case "11":
          break;
        case "12":
          break;
        case "13":
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
showMenu();
selectOption();
