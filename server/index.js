const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, '../text-edit-app/build')));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(5000, console.log('Listening on port 5000'));
