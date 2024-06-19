const map = require('through2-map');
const http = require('http');

const uppercaseServer = http.createServer((req, res) => {
  if (req.method === 'POST') {
    req.pipe(map(chunk => chunk.toString().toUpperCase())).pipe(res);
  } else {
    res.writeHead(405);
    res.end();
  }
});

uppercaseServer.listen(3006, () => {
  console.log('Test server for httpUppercaserer running on http://localhost:3006');
});
