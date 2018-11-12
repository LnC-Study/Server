module.exports = {
    SERVER_PORT: 3000,
    DB_URL: 'mongodb://localhost:27017/local',
    DB_SCHEMAS: [
        /*
        {file:'./buildingSchema',
            collection: 'building',
            schemaName:'BuildingSchema',
            modelName:'BuildingModel'},
        {file:'./roadSpotSchema',
            collection: 'roadSpot',
            schemaName:'RoadSpotSchema',
            modelName:'RoadSpotModel'},
        */
        ],
    ROUTE_INFOS: [
        /*
        {file: './user', path: '/login', method: 'authorize_user', type:'post'},
        {file: './clubIntro', path: '/intro', method: 'introduce_club', type:'get'},
        */
        ]
}