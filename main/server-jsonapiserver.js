const url = require('url');
const http = require('http');

const jsonApiServer = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const dateValue = parsedUrl.query.iso;
  const date = new Date(dateValue);

  let result;
  if (parsedUrl.pathname === '/api/parsetime') {
    result = {
      hour: date.getHours(),
      minute: date.getMinutes(),
      second: date.getSeconds()
    };
  } else if (parsedUrl.pathname === '/api/unixtime') {
    result = { unixtime: date.getTime() };
  } else {
    res.writeHead(404);
    res.end();
    return;
  }

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(result));
});

jsonApiServer.listen(3007, () => {
  console.log('Test server for httpJsonApiServer running on http://localhost:3007');
});
