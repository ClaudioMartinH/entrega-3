const http = require("http");
const URL = process.argv[2];
const URL2 = process.argv[3];
const URL3 = process.argv[4];
const dataArray = [];
const dataArray2 = [];
const dataArray3 = [];
let content = "";
let content2 = "";
let content3 = "";

http.get(URL, function callback(response) {
    response.setEncoding("utf-8")
    response.on("data", function (data){
      dataArray.push(data)
    })
    response.on("end", function () {
      dataArray.forEach(function (element){
        content += element;
      });
      console.log(content)
    })
  });
http.get(URL2, function callback(response) {
    response.setEncoding("utf-8")
    response.on("data", function (data){
      dataArray2.push(data)
    })
    response.on("end", function () {
      dataArray2.forEach(function (element){
        content2 += element;
      });
      console.log(content2)
    })
  });
http.get(URL3, function callback(response) {
    response.setEncoding("utf-8")
    response.on("data", function (data){
      dataArray3.push(data)
    })
    response.on("end", function () {
      dataArray3.forEach(function (element){
        content3 += element;
      });
      console.log(content3)
    })
  });

  /* resultado learnyounode

  
    'use strict'
    const http = require('http')
    const bl = require('bl')
    const results = []
    let count = 0

    function printResults () {
      for (let i = 0; i < 3; i++) {
        console.log(results[i])
      }
    }

    function httpGet (index) {
      http.get(process.argv[2 + index], function (response) {
        response.pipe(bl(function (err, data) {
          if (err) {
            return console.error(err)
          }

          results[index] = data.toString()
          count++

          if (count === 3) {
            printResults()
          }
        }))
      })
    }

    for (let i = 0; i < 3; i++) {
      httpGet(i)
    }

  */