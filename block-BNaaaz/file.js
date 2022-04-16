var http = require('http');
var url = require('url');
var fs = require('fs');

var server = http.createServer(handleRequest);

function handleRequest(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    fs.createReadStream('./readme.txt').pipe(res);
}

server.listen(5000, () => {
    console.log('server is listening on port 5000')
})