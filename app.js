var http= require('http');
var fs = require('fs');

var RS = fs.createReadStream(__dirname + '/readme.txt', 'utf8');



http.createServer(function(req,res) {
    res.writeHead(200,{'Content-type' : 'text/plain'});
    RS.pipe(res);

}).listen(8080);
console.log("Server running");
