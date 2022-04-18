var http = require('http');
var querystring = require('querystring');

var server = http.createServer(handleRequest);

function handleRequest(req, res) {
    var store = "";
    req.on('data', (chunk) => {
        store += chunk;
    });
    req.on("end", () => {
        if(req.method === 'POST' && req.url === '/json'){
            res.setHeader('Content-Type','applicatin/json')
            res.end(store);
        }
        if(req.method === 'POST' && req.url === '/form'){
            var formData = querystring.parse(store);
            res.end(JSON.stringify(formData));
        }
    })
}

server.listen(7000, () => {
    console.log('Server is listening on port 7k');
})