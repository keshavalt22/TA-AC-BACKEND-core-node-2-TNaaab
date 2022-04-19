var http = require('http');
var qs = require('querystring')

var server = http.createServer(handleRequest);

function handleRequest(req, res) {
    var store = "";
    var dataFormat = req.headers['content-type'];

    req.on('data', (chunk) => {
        store += chunk;
    })
    req.on('end', () => {
        if(dataFormat === "application/json") {
            var jsonData = JSON.parse(store);
            res.setHeader('Content-Type', 'text/html');
            res.end(`<h1>${jsonData.name}</h1>, <p>${jsonData.email}</p>`)
        }
        if(dataFormat === 'application/x-www-form-urlencoded'){
            var parsedData = qs.parse(store);
            res.setHeader('Content-Type', 'text/html');
            res.end(`<h1>${parsedData.name}</h1>, <p>${parsedData.email}</p>`);
        }
    })
}

server.listen(3456, () => {
    console.log('Server is running on port 3456')
})