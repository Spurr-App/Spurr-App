var app = require('./server-config.js');

var PORT = process.env.PORT || 5000;

app.listen(PORT);

console.log(`Listening on http://localhost:${PORT}`);
