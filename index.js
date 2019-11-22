const http = require("http");
const fs = require("fs");
const log = console.log;
const PORT = 8080;

const requestHandler = (req, res) => {
  const filePath = req.url === "/" ? "index.html" : req.url.slice(1);
  const fileExists = fs.existsSync(filePath);
  if (fileExists) {
    res.writeHead(200);
    const fileReadStream = fs.createReadStream(filePath);
    fileReadStream.pipe(res);
  } else {
    res.writeHead(404);
    res.write("Page Not Found!");
    res.end();
  }
};

const server = http.createServer(requestHandler);

server.listen(PORT, err => {
  if (err) {
    log("Oops! Something went wrong!");
  } else {
    log(`Server started at port ${PORT}`);
  }
});
