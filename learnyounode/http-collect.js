const http = require("http");
const URL = process.argv[2];
const dataArray = [];
let content = "";

http.get(URL, function callback(response) {
    response.setEncoding("utf-8")
    response.on("data", function (data){
      dataArray.push(data)
    })
    response.on("end", function () {
      dataArray.forEach(function (element){
        content += element;
      });
      console.log(content.length)
      console.log(content)
    })
  });

  /* otra respuesta de learnyounode

  
    'use strict'
    const http = require('http')
    const bl = require('bl')

    http.get(process.argv[2], function (response) {
      response.pipe(bl(function (err, data) {
        if (err) {
          return console.error(err)
        }
        data = data.toString()
        console.log(data.length)
        console.log(data)
      }))
    })

  */
