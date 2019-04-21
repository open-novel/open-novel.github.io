const connect = require('connect'),
    serveStatic = require('serve-static');

const app = connect();

app.use(serveStatic(__dirname));
app.listen(80);