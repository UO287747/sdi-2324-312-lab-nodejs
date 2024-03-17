module.exports = function (app, twig) {

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
        "rol": "Pianista"
    }];

    let roles = [ "Cantante", "Trompetista", "Violinista", "Saxofonista", "Pianista" ];

    app.get("/authors", function (req, res) {

        let response = {
            seller: 'Tienda de canciones',
            authors: authors
        };

        res.render("authors/authors.twig", response);
    });

    app.get("/authors/add", function (req, res) {

        let response = {
            seller: 'Tienda de canciones',
            roles: roles
        };

        res.render("authors/add.twig", response);
    });

    app.post('/authors/add', function (req, res) {

        let undefinedText = " no enviado en la petición.";

        let response =
            "Autor agregado: " + (req.body.name ? req.body.name : "< Name >" + undefinedText) + "<br>"
            + " grupo: " + (req.body.group ? req.body.group : "< Group >" + undefinedText) + "<br>"
            + " rol: " + (req.body.rol ? req.body.rol : "< Rol >" + undefinedText);

        res.send(response);
    });

    // Parámetros

    app.get("/authors/filter/:rol", function (req, res) {

        let authorsResult = authors.filter(author => author.rol.toLowerCase() === req.params.rol.toLowerCase());

        let response = {
            seller: 'Tienda de canciones',
            authors: authorsResult
        };

        res.render("authors/authors.twig", response);
    });

    // Redirecciones

    app.get("/authors*", function (req, res) {

        res.redirect("/authors");
    });
}