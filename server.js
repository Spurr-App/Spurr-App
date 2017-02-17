var app = require('./server-config.js');

var PORT = process.env.PORT || 5000;


app.listen(port);

console.log('Server now listening on port ' + PORT);
