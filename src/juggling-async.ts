import { IncomingMessage } from "http";

const http = require("http");
const bl = require("bl");
const results: string[] = [];
let counter: number = 0;

function showResults():void {
    for (let i:number = 0; i < 3; i++){
        console.log(results[i])
    }
}
function getHttp(index:number):void{
    http.get(process.argv[2+index], function callback(response: IncomingMessage){
        response.pipe(bl(function(err: Error, data: string){
            if (err) return console.error(err);
            results[index] = data.toString();
            counter++;
            if(counter === 3){
                showResults();
            }
        }))
    })
}
for (let i = 0; i < 3; i++) {
    getHttp(i)
  }