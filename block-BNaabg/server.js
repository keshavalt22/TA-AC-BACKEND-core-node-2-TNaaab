var http = require('http');
var fs = require('fs');
var qs = require('querystring');
var path = require('path');
let url = require('url');

var server = http.createServer(handleRequest);

let userPath = path.join(__dirname,'/users/');

console.log(userPath);

function handleRequest(req, res){
    let parsedUrl = url.parse(req.url, true)
    let store = '';
    
    req.on('data', (chunk) => {
        store += chunk;
    })
    req.on('end', () => {
        if(req.method === 'POST' && req.url === '/users'){
            let parsedData = JSON.parse(store);
            fs.open(userPath + parsedData.username + ".json" , 'wx', (err, fd) => {
                fs.write(fd, store, (err, content) => {
                    console.log(err);
                    fs.close(fd, (err) => {
                        return res.end(`${username} successfully created`);
                    });
                })
            })
        }
        if(req.method === 'GET' && parsedUrl.username === '/users'){
            var username = parsedUrl.query.username;
            fs.readFile(userPath + username + '.json', (err, content) => {
                if(err) return console.log(err);
                res.setHeader('Content-Type', 'application/json');
                return res.end(content);
            })
        }
        if(req.method === 'PUT' && parsedUrl.username === '/users'){
            var username = parsedUrl.query.username;
            fs.open(userPath + username + '.json', "r+", (err, fd) => {
                if(err) return console.log(err);
                fs.ftruncate(fd, (err) => {
                    if(err) return console.log(err);
                    fs.writeFile(fd, store, (err) => {
                        if(err) return console.log(err);
                        fs.close(() => {
                            return res.end(`${username} is successfully updated`)
                        })
                    })
                })
            })

        }
        if(req.method === 'DELETE' && parsedUrl.username === '/users'){
            var username = parsedUrl.query.username;
            fs.unlink(userPath + username + '.json', (err) => {
                if(err) return console.log(err);
                return res.end(`${username} is successfully deleted!`)
            })
        }
        res.statusCode = 404;
        res.end('Page not found!')
    })
}



server.listen(3000, () => {
    console.log('Server is listening on port 3000!');
})