$(document).ready(function () {
    var canvas = $("#snakeBoard");
    var ctx = canvas.get(0).getContext("2d");
    // Initialisation position Icone Econocom
    var ex = 10;
    var ey = 10;
    // Initialisation position Cercle
    var cf = 2;
    var cg = 0;

    var canvasWidth = 300;
    var canvasHeight = 150;
    insertIcon();
    var image = $("#e_conocom");
    var titre = $("#titre");

    var coordonneesPommes = [];
    for (i = 0; i < 10; i++) {
        var cSize = cf + 1;
        var cx = getNombreAleatoire(cSize, (canvasWidth - cSize));
        var cy = getNombreAleatoire(cSize, (canvasHeight - cSize));
        coordonneesPommes.push([cx, cy])
        insertCircle(cx, cy);
    }


    $("body").keydown(function (event) {
        var keyPress = event.which;
        move(keyPress);
        insertIcon();
        for (i = 0; i < coordonneesPommes.length; i++) {
            var pommeCourante = coordonneesPommes[i];
            console.log(pommeCourante);
            var PommeCx = pommeCourante[0];
            var PommeCy = pommeCourante[1];
            insertCircle(PommeCx, PommeCy);
        }

    });

    function getNombreAleatoire(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    };

    function insertCircle(cx, cy) {

        ctx.beginPath();
        ctx.arc(cx, cy, cf, cg, 2 * Math.PI);
        ctx.stroke();

    }

    function insertIcon() {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        var img = $("#e_econocom");
        if (img.get(0)) {
            ctx.drawImage(img.get(0), ex, ey);
        }
    };

    function move(keyPress) {
        if (keyPress == 37 && ex > 0) {
            ex -= 1;
        } else if (keyPress == 38 && ey > 0) {
            ey -= 1.
        } else if (keyPress == 39 && ex < (canvasWidth - 6)) {
            ex += 1
        } else if (keyPress == 40 && ey < (canvasHeight - 5)) {
            ey += 1
        }

        // else {
        //     alert('stop');
        // }
        console.log('ex=' + ex + ' | ey=' + ey);
    };
});


