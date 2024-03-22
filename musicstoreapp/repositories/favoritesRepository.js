module.exports = {

    mongoClient: null,
    app: null,
    database: "musicStore",
    collectionName: "favorite_songs",

    init: function (app, dbClient) {
        this.dbClient = dbClient;
        this.app = app;
    },

    getFavoriteSongs: async function (filter,options) {
        try {
            await this.dbClient.connect();
            const database = this.dbClient.db(this.database);
            const songsCollection = database.collection(this.collectionName);
            return await songsCollection.find(filter,options).toArray();
        } catch (error) {
            throw (error);
        }
    },

    findFavoriteSong: async function(filter,options) {
        try {
            await this.dbClient.connect();
            const database = this.dbClient.db(this.database);
            const songsCollection = database.collection(this.collectionName);
            return await songsCollection.findOne(filter, options);
        } catch (error) {
            throw (error);
        }
    },

    insertFavoriteSong: function (favoriteSong,callbackFunction) {
        this.dbClient.connect()
            .then(() => {
                const database = this.dbClient.db(this.database);
                const songsCollection = database.collection(this.collectionName);

                songsCollection.insertOne(favoriteSong)
                    .then(result => callbackFunction(result.insertedId))
                    .then(() => this.dbClient.close())
                    .catch(err => callbackFunction({error: err.message}));
            })
            .catch(err => callbackFunction({error: err.message}))
    },

    deleteFavoriteSong: function (song,callbackFunction) {
        this.dbClient.connect()
            .then(() => {
                const database = this.dbClient.db(this.database);
                const songsCollection = database.collection(this.collectionName);

                songsCollection.deleteOne(song)
                    .then(result => callbackFunction({result: result}))
                    .then(() => this.dbClient.close())
                    .catch(err => callbackFunction({error: err.message}));
            })
            .catch(err => callbackFunction({error: err.message}))
    }
};