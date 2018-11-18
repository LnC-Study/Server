var routeLoader = {},
    config = require('../config.js');

routeLoader.init = function(app, router){
    console.log('# Initialize router');
    return init_routes(app, router);
};

function init_routes(app, router){
    var infoLen = config.ROUTE_INFOS.length;
    console.log('Route modules: %d', infoLen);
    for (var i = 0; i < infoLen; i++) {
        var currentItem = config.ROUTE_INFOS[i];
        var currentModule = require(currentItem.file);
        console.log('\tRead module info. from file [%s]', currentItem.file);

        // According to REST
        if (currentItem.type == 'get')
            router.route(currentItem.path).get(currentModule[currentItem.method]);
        else if (currentItem.type == 'post')
            router.route(currentItem.path).post(currentModule[currentItem.method]);
        else if (currentItem.type == 'put')
            router.route(currentItem.path).put(currentModule[currentItem.method]);
        else // type == 'delete'
            router.route(currentItem.path).delete(currentModule[currentItem.method]);

        console.log('\tSet router module[%s], path:[%s], method:[%s]', currentItem.method, currentItem.path, currentItem.type);
    }
}

module.exports = routeLoader;