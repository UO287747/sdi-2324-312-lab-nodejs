const {ObjectId} = require("mongodb");
module.exports = function (app, songsRepository, favoritesRepository) {

    app.get('/songs/favorites', function (req,res){

        let filter = {user: req.session.user};
        let options = {sort: {title: 1}};

        favoritesRepository.getFavoriteSongs(filter,options)
            .then(songs => {
                let totalPrice = songs.reduce((total, fsong) => total + parseFloat(fsong.price), 0);
                res.render("songs/favorites.twig", {favorites: songs,totalPrice: totalPrice});
            })
            .catch(error => {
                res.send("Se ha producido un error al listar los favoritos del usuario:" + error);
            });
    });

    //Un formulario por enlace para este Post
    app.post('/songs/favorites/add/:song_id',function (req,res){

        let filter = {_id: new ObjectId(req.params.song_id)};
        let options = {};


        songsRepository.findSong(filter, options)
            .then(song => {
                if (song == null) {
                    res.send("La canción no existe")
                } else {

                    let favoriteSong = {

                        song_id: song._id,
                        date: new Date(),
                        price: song.price,
                        title: song.title,
                        user: req.session.user
                    }

                    favoritesRepository.insertFavoriteSong(favoriteSong, function (result) {
                        if(result !== null && result !== undefined){
                            res.send("Agregada la canción a favoritos ID: " + result)
                        } else {
                            res.send("Error al insertar canción en favoritos.");
                        }
                    });
                }
            })
    });

    app.get('/songs/favorites/delete/:id', function (req, res) {

        let filter = {_id: new ObjectId(req.params.id)};
        let options = {usersId: req.session.user};

        favoritesRepository.findFavoriteSong(filter, options).then(song => {
            if (song == null) {
                res.send("Canción favorita no econtrada.")
            }
            else {
                favoritesRepository.deleteFavoriteSong(song, function (result) {
                    res.send("Se ha eliminado el favorito ID: " + req.params.id)
                })
            }
        }).catch(error => {
            res.send("Error al eliminar el favorito " + error);
        });
    })
};