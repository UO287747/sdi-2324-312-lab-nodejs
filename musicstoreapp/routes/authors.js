module.exports = function (app, twig) {

    app.get("/authors", function (req, res) {

        let authors = [{
            "name": "Dan Reynolds",
            "group": "Imagine Dragons",
            "rol": "Cantante"
        }, {
            "name": "Chris Martin",
            "group": "Coldplay",
            "rol": "Cantante"
        }, {
            "name": "Joe Perry",
            "group": "Aerosmith",
            "rol": "Guitarrista"
        }];
        let response = {
            seller: 'Tienda de canciones',
            authors: authors
        };

        res.render("authors/authors.twig", response);
    });

    app.get("/authors/add", function (req, res) {

        res.render("authors/add.twig");
    });

    app.post('/authors/add', function (req, res) {

        let undefinedText = " no enviado en la petición.";

        let response =
            "Autor agregado: " + (req.body.name ? req.body.name : "< Name >" + undefinedText) + "<br>"
            + " grupo: " + (req.body.group ? req.body.group : "< Group >" + undefinedText) + "<br>"
            + " rol: " + (req.body.rol ? req.body.rol : "< Rol >" + undefinedText);

        res.send(response);
    });

    // Redirecciones

    app.get("/authors*", function (req, res) {

        res.redirect("/authors");
    });
}