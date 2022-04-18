var http = require('http');

var server = http.createServer(handleRequest);

function handleRequest(req, res) {
    var store = "";
    req.on('data', (chunk) => {
        store += chunk;
    });
    req.on('end', () => {
        if(req.method === 'POST' && req.url === '/'){
            res.setHeader('Content-Type','applicatin/json')
            res.end(store);
        }
    })
}

server.listen(5000, () => {
    console.log('Server is listening on port 5k')
})