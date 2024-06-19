const server1 = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end("Response from server 1");
  });
  
  const server2 = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end("Response from server 2");
  });
  
  const server3 = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end("Response from server 3");
  });
  
  server1.listen(3002, () => {
    console.log('Test server 1 for jugglingAsync running on http://localhost:3002');
  });
  
  server2.listen(3003, () => {
    console.log('Test server 2 for jugglingAsync running on http://localhost:3003');
  });
  
  server3.listen(3004, () => {
    console.log('Test server 3 for jugglingAsync running on http://localhost:3004');
  });
  