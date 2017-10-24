const Jimp = require('jimp');
const merge = require('./helpers/merge');
const express = require('express');
const fs = require('fs');
var path = require('path');
const formidable = require('formidable');
const app = express();

app.get('/', function(req, res) {
  res.send('Hello World!');
});

app.post('/upload', function(req, res) {
  var form = new formidable.IncomingForm();

  form.uploadDir = path.join(__dirname, '/assets/uploads');

  form.on('file', function(field, file) {
    fs.rename(file.path, path.join(form.uploadDir, file.name), () => {
      fs.unlink(file.path, err => {});
    });
  });

  form.on('error', function(err) {
    console.log('An error has occured: \n' + err);
  });

  form.on('end', function() {
    res.redirect('localhost:3000');
  });

  form.parse(req);
});

app.listen(5000, function() {
  console.log('server listening on port 5000!');
});

//
// // open a file called "lenna.png"
// Jimp.read('assets/images/deadend.png', function(err, deadend) {
//   if (err) throw err;
//
//   Jimp.read('assets/images/donotenter.png', function(err, donotenter) {
//     if (err) throw err;
//
//     merge(donotenter, deadend).write('mask.png', () => {
//       console.log('merged');
//     });
//   });
// });
