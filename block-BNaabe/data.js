var http = require('http');
var qs = require('querystring');

var server = http.createServer(handleRequest);

function handleRequest(req, res) {
    var dataFormat = req.headers['content- type'];
    var store = '';
    req.on('data', (chunk) => {
        store += chunk;
    });
    req.on('end', () => {
        if(dataFormat === "application/json"){
            res.end(store);
        }
        if(dataFormat === 'application/x-www-form-urlencoded'){
            var parsedData = qs.parse(store);
            res.end(JSON.stringify(parsedData));
        }
    })
}


server.listen(9000, () => {
    console.log('Server is listening on port 9k');
})