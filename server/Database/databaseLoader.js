var mongoose = require('mongoose');
var databaseLoader = {};

databaseLoader.init = function(app, config){
    console.log('# Initialize the database.');
    connect_database(app, config);
}

function connect_database(app, config){
    console.log('Called connect().');

    mongoose.Promise = global.Promise;
    mongoose.connect(config.DB_URL, {useMongoClient:true});
    databaseLoader.db = mongoose.connection;

    databaseLoader.db.on('error', console.error.bind(console, 'Mongoose connection error.'));

    databaseLoader.db.on('open', function(){
        console.log('Connected with database: ', config.DB_URL);
        init_schema(app, config);
    });

    databaseLoader.db.on('disconnected', function(){
        console.log('Disconnected with database. Retry after 5sec.');
        setInterval(connect_database, 5000);
    });
}

function init_schema(app, config){
    var lengthOfSchema = config.DB_SCHEMAS.length;
    console.log('Schemas[%d]', lengthOfSchema);

    for( var idx = 0; idx < lengthOfSchema; idx++){
        var currentItem = config.DB_SCHEMAS[idx];
        var currentSchema = require(currentItem.file).createSchema(mongoose);
        console.log('\tRead [%s] module, then set the schema.', currentItem.file);

        var currentModel = mongoose.model(currentItem.collection, currentSchema);
        console.log('\tSet the model for [%s] collection.', currentItem.collection);

        databaseLoader[currentItem.schemaName] = currentSchema;
        databaseLoader[currentItem.modelName] = currentModel;
        console.log('\tRegister: Schema name[%s], Model name[%s] on database object.', currentItem.schemaName, currentItem.modelName);
    }

    app.set('database', databaseLoader);
    console.log('Successfully register the database object on app object.');
}

module.exports = databaseLoader;