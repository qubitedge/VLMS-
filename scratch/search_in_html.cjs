const http = require('http');

http.get('http://localhost:8080/workspace?exp=llms-w1-2', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    console.log("Tokenization in HTML:", data.includes("Tokenization"));
    console.log("Aim in HTML:", data.includes("Aim"));
    console.log("HTML length:", data.length);
    // Find where class "min-h-screen" is and print next 1000 chars
    const idx = data.indexOf("class=\"min-h-screen");
    if (idx !== -1) {
      console.log("Content inside body:");
      console.log(data.substring(idx, idx + 2000));
    }
  });
}).on('error', (err) => {
  console.error("Error:", err.message);
});
