const Jimp = require('jimp');
const merge = require('./helpers/merge');
const express = require('express');
const app = express();

app.get('/', function(req, res) {
  res.send('Hello World!');
});

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});

// open a file called "lenna.png"
Jimp.read('assets/images/deadend.png', function(err, deadend) {
  if (err) throw err;

  Jimp.read('assets/images/donotenter.png', function(err, donotenter) {
    if (err) throw err;

    merge(donotenter, deadend).write('mask.png', () => {
      console.log('merged');
    });
  });
});
