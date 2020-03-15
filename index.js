var http = require('http');
var formidable = require('formidable');
var fs = require('fs');
var os = require('os');
var ip = require('ip')

var port = 8080;
console.log("Your local-ip adress is: "+ip.address() + "  Please naviagt to port: " + port);

http.createServer(function (req, res) { 
  if (req.url == '/fileupload') {
    console.log();
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files, name) {
      var oldpath = files.filetoupload.path;
      var newpath = os.homedir()+ '/Downloads/' + files.filetoupload.name;
      fs.copyFile(oldpath, newpath, (err) => {
        if (err) throw err;
        console.log(oldpath + ' was copied to ' + newpath);
      });
      fs.unlink(oldpath, (err) => {
        if(err) throw err;
      })
 });
  } else {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    res.write('<label>Select the file to upload here</label><br>');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit onlick="getIp()">');
    res.write('</form>');
    return res.end();
  }
}).listen(port); 
