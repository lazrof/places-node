const mongoose = require('mongoose');

const dbName = 'places_node'

module.exports = {
    connect : () => mongoose.connect('mongodb://mongo/'+dbName),
    dbName,
    connection: () => {
        if (mongoose.connection)
            return mongoose.connection;
        return this.connect()
    }
}