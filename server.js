
 /* eslint no-console: ["error", { allow: ["warn", "error"] }] */
const app = require('./server-config.js');

const PORT = process.env.PORT || 5000;

app.listen(PORT);

console.warn(`Listening on http://localhost:${PORT}`);
