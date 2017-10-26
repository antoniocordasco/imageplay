const Jimp = require('jimp');
const merge = require('./helpers/merge');
const express = require('express');
var path = require('path');
const formidable = require('formidable');
const app = express();
const md5 = require('md5');
const _ = require('lodash');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));




app.get('/', function(req, res) {
  res.send('Hello World!');
});

app.post('/upload', function(req, res) {
  var form = new formidable.IncomingForm();

  form.uploadDir = path.join(__dirname, '/assets/uploads');

  

  form.on('file', function(field, file) {



    fs.readdirAsync(form.uploadDir).then((items) => {
      
      // filtering out all the files that are not jpegs
      items = _.filter(items, function(item) { return (item.indexOf('.jpg') === item.length - 4); });
      
      // choosing a random image from the existing ones
      var existingImageFilename = items[Math.floor(Math.random() * items.length)];
      
  
      var newImage;
      var newImageFilename = md5(Date.now()) + '.jpg';

      fs.renameAsync(file.path, path.join(form.uploadDir, newImageFilename)).then(() => {

        fs.unlink(file.path, err => {});
        return Jimp.read(form.uploadDir + '/' + newImageFilename);

      }).then((image) => {

        console.log('read new image');
        newImage = image;
        return Jimp.read(form.uploadDir + '/' + existingImageFilename);   

      }).then((existingImage) => {

        console.log('read existing image');
        merge(newImage, existingImage).write('mask.png', () => {
          console.log('merged');
        });
      });

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

