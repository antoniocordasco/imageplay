const express = require('express');

const app = express();

global.appRoute = __dirname;

app.use("/assets", express.static(__dirname + '/assets'));

require('./routes/routes')(app);

app.listen(5000, function() {
  console.log('server listening on port 5000!');
});

