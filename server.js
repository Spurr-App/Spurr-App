 /* eslint no-console: ["error", { allow: ["warn", "error"] }] */
require('dotenv').config();
const app = require('./server-config.js');

const PORT = process.env.PORT;

app.listen(PORT);

console.warn(`Listening on http://localhost:${PORT}`);
