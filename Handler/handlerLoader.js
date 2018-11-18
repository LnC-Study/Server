var handler_loader = {};

var config = require('../config');
var utils = require('jayson/lib/utils');

handler_loader.init = function(jayson, app, api_path) {
    console.log('# Initialize handler');
    return initHandlers(jayson, app, api_path);
};

function initHandlers(jayson, app, api_path) {
    var handlers = {};

    var handlerInfo = config.HANDLER_INFOS
    var infoLen = handlerInfo.length;
    console.log('\nHandler[%d]', infoLen);

    for (var i = 0; i < infoLen; i++) {
        var curItem = handlerInfo[i];
        var curHandler = require(curItem.file);
        console.log('Read module info. from %s.', curItem.file);

        handlers[curItem.method] = new jayson.Method({
            handler: curHandler,
            collect: true,
            params: Array
        });

        console.log('Add Method[%s] on handler.', curItem.method);
    }

    // create jayson server object
    var jaysonServer = jayson.server(handlers);

    // route app`s api_path
    console.log('\nSet RPC call from path[' + api_path + '].');

    app.post(api_path, function(req, res, next) {
        console.log('\nCalled JSON-RPC from path[' + api_path + '].');

        var options = {};

        // if Content-Type is not application/json, send 415 unsupported media type error
        var contentType = req.headers['content-type'] || '';
        if(!RegExp('application/json', 'i').test(contentType)) {
            console.log('Not application/json type.');
            return error(415);
        };

        if(!req.body || typeof(req.body) !== 'object') {
            console.log('Error : request body.');
            return error(400, 'Request body must be parsed');
        }

        console.log('Call RPC function.');
        jaysonServer.call(req.body, function(error, success) {
            var response = error || success;

            console.log('\n RPC response:');
            console.log(response);

            utils.JSON.stringify(response, options, function(err, body) {
                if(err) return err;

                if(body) {
                    var headers = {
                        "Content-Length": Buffer.byteLength(body, 'utf-8'),
                        "Content-Type": "application/json"
                    };

                    res.writeHead(200, headers);
                    res.write(body);
                } else {
                    res.writeHead(204);
                }
                res.end();
            });
        });

        function error(code, headers) {
            res.writeHead(code, headers || {});
            res.end();
        }

    });

    return handlers;
}

module.exports = handler_loader;