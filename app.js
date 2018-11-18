/* Procedure :
*  Load middleware
*  Construct server
*  - Set port, parsing, engine, routing, session
*  Error handling, 404
*  Database initialize
* */

/* Load middlewares
* express, http, path, body-parser, serve-static, errorhandler, express-error-handler
* express-session
* */
var express = require('express'),
    http = require('http'),
    path = require('path');
var bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    static = require('serve-static');
var errorHandler = require('errorhandler'),
    expressErrorHandler = require('express-error-handler');
var expressSession = require('express-session');
var mongoStore = require( 'connect_mongo')( expressSession);
var url = require('url');
var routerLoader = require('./Routes/routeLoader');
var databaseLoader = require('./Database/databaseLoader');
var config = require('./config');
var jayson = require('jayson');
var rpcHandlerLoader = require('./Handler/handlerLoader');
console.log('# Load all middle wares.');

/* Construct Server */
app = express();

// Set Port
app.set('port', config.SERVER_PORT || 3000);
console.log('# Set server port: %d', config.SERVER_PORT || 3000);
// Set Parsing
app.use(bodyParser.urlencoded({extended: false}));
app.use('/public', static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.json());
// Set engine
app.set('view engine', 'ejs');
app.set('views', 'Public');

/*
// Set JSON-RPC
var jsonrpcAPIPath = config.JSONRPC_API_PATH || '/rpc';
rpcHandlerLoader.init( jayson, app, jsonrpcAPIPath);
console.log('Set JSON-RPC path: %s', jsonrpcAPIPath);
*/

// Set Session
app.use(expressSession({
    secret: 'LnC Web Service',
    resave: false,
    saveUninitialized: true,
    store: new mongoStore({
        url: config.DB_URL,
        collection: 'sessions'
    })
}));
// Set Routing
var router = express.Router();
app.use('/', router);
routerLoader.init(app, router);
// Error Handling, 404
var errorHandler = expressErrorHandler({
    static: {
        '404': './Public/404Err.html'
    }
});

app.use( expressErrorHandler.httpError(404) );
app.use( errorHandler);
/* Set & Start Server */
process.on('uncaughtException', function (err) {
    console.log('\nUncaughtException occured: ' + err);
    console.log(err.stack);
});

process.on('SIGTERM', function () {
    console.log("\nProcess closed...");
    app.close();
});

app.on('close', function () {
    console.log("\nExpress server closed...");
    if (database.db) {
        database.db.close();
    }
});

var server = http.createServer(app).listen(app.get('port'), function(){
    console.log('\n# Server start. Port: %d', app.get('port'));
    databaseLoader.init(app, config);
});