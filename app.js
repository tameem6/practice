var http= require('http');
var fs = require('fs');



http.createServer(function(req,res) {
    if(req.url==='/' || req.url=='/home')
    {
        res.writeHead(200,{'Content-type':'text/html'});
        var RS = fs.createReadStream(__dirname + '/index.html', 'utf8').pipe(res);

    }
    else if(req.url === '/api')
    {
        res.writeHead(200,{'Content-type' : 'application/json'});
        var myObj= {
            name: 'Random',
            age:23,
            gender: 'Male'
        };
        res.end(JSON.stringify(myObj));
    }
    else
    {
        res.writeHead(200, {'Content-type':'text/plain'});
        res.end("404 Page Not Found");
    }
}).listen(8080);
console.log("Server running");
