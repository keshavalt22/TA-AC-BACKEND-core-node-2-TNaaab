var http = require('http');
var querystring = require('querystring');



var server = http.createServer(handleRequest);

function handleRequest(req, res) {
    var store = "";
    req.on('data', (chunk) => {
        store += chunk;
    });
    req.on('end', () => {
        if(req.method === 'POST' && req.url === '/'){
            res.statusCode = 201;
            res.end(store);
        }
        if(req.method === 'POST' && req.url === '/'){
            var parsedData = querystring.parse(store);
            res.end(JSON.stringify(parsedData));
        }
    })
}

server.listen(5000, () => {
    console.log('Server is listening on port 5k')
})