const http = require("http");
const URL = process.argv[2]


http.get(URL, function callback(response) {
  response.setEncoding("utf-8")
  response.on("data", function (data){
    console.log(data)
  })
  response.on("error", function (error) {
    console.error(error)
  })
});


/* respuesta rpograma:

    'use strict'
    const http = require('http')

    http.get(process.argv[2], function (response) {
      response.setEncoding('utf8')
      response.on('data', console.log)
      response.on('error', console.error)
    }).on('error', console.error)

*/ 