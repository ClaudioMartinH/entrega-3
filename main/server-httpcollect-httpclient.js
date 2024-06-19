const http = require('http');


const server = http.createServer((req, res) => {
  const responseText = "Hello, this is a test response!";
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(responseText);
});

server.listen(3001, () => {
  console.log('Test server for httpClient and httpCollect running on http://localhost:3001');
});
