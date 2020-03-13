var http = require('http');
var formidable = require('formidable');
var fs = require('fs');

http.createServer(function (req, res) {
  if (req.url == '/fileupload') {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      var oldpath = files.filetoupload.path;
      var newpath = '/home/legendofmiracles/Downloads/' + files.filetoupload.name;
      fs.copyFile(oldpath, newpath, (err) => {
        if (err) throw err;
        console.log(oldpath + ' was copied to ' + newpath);
      });
      fs.unlink(oldpath, (err) => {
        if(err) throw err;
        console.log('removed file');
      })
 });
  } else {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
  }
}).listen(8080); 