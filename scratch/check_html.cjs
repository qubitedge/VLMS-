const http = require('http');

http.get('http://localhost:8080/workspace?exp=llms-w1-2', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    console.log("Status Code:", res.statusCode);
    console.log("Headers:", res.headers);
    console.log("HTML Preview (first 2000 chars):");
    console.log(data.substring(0, 2000));
  });
}).on('error', (err) => {
  console.error("Error:", err.message);
});
