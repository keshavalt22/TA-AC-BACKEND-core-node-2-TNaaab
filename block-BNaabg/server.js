var http = require('http');
var fs = require('fs');
var qs = require('querystring');
var path = require('path');

var server = http.createServer(handleRequest);

let userPath = path.join(__dirname,'/users/');

console.log(userPath);

function handleRequest(req, res){
    let store = '';
    
    req.on('data', (chunk) => {
        store += chunk;
    })
    req.on('end', () => {
        if(req.method === 'POST' && req.url === '/users'){
            let paresedData = JSON.parse(store);
            fs.open(userPath + paresedData.username + ".json" , 'wx', (err, fd) => {
                fs.write(fd, store, (err, content) => {
                    console.log(err);
                    fs.close(fd, (err) => {
                        res.end(`${username} successfully created`);
                    });
                })
            })
        }
        if(req.method === 'GET' && req.url === '/users?username=xyz'){
            
        }
        if(req.method === 'PUT' && req.url === '/users?username=xyz'){
            
        }
        if(req.method === 'DELETE' && req.url === '/users?username=xyz'){
            
        }
    })
}



server.listen(3000, () => {
    console.log('Server is listening on port 3000!');
})