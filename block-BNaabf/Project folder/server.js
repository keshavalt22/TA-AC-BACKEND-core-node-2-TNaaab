var http = require('http');
var fs = require('fs');
var qs = require('querystring');
let path = require('path');
var server = http.createServer(handleRequest);


function handleRequest(req, res) {
    var store = '';

    req.on('data', (chunk) => {
        store += chunk;
    })
    req.on('end', () => {
        if(req.method === 'GET' && req.url === '/form'){
            res.setHeader('Content-Type', 'text/html');
            fs.createReadStream('./form.html').pipe(res);
        }
        if(req.method === 'POST' && req.url === '/form'){
            var parsedData = qs.parse(store);
            res.setHeader('Content-Type', 'text/html');
            res.write(`<h2>${parsedData.name}</h2>`);
            res.write(`<h3>${parsedData.email}</h3>`);
            res.write(`<h4>${parsedData.age}</h4>`);
            res.end();
        }
    })
}

server.listen(3000, () => {
    console.log('server is running on port 3000')
})