const fs = require('fs');
const path = require('path');
const http = require('http');


const fileServer = http.createServer((req, res) => {
  const filePath = path.join(__dirname, 'test-file.txt');
  fs.createReadStream(filePath).pipe(res);
});

fileServer.listen(3005, () => {
  console.log('Test server for httpFileServer running on http://localhost:3005');
});
