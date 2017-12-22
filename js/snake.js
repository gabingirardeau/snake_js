$(document).ready(function () {
    var canvas = $("#snakeBoard");
    var ctx = canvas.get(0).getContext("2d");
    // Initialisation position Icone Econocom
    var ex = 10;
    var ey = 10;
    var serpent = [ex, ey];
    // Initialisation position Cercle
    var cf = 2;
    var cg = 0;

    var canvasWidth = 300;
    var canvasHeight = 150;

    insertIcon();
    var image = $("#e_conocom");
    var titre = $("#titre");

    var coordonneesPommes = [];
    loadFruit();
    var coordonneesQueue = [];

    for (var i = 2; i <= 8; i += 2) {
        coordonneesQueue.push([i, 11]);
    };

    insertTail();
    

    function loadFruit() {
        var cSize = cf + 1;
        var newCx;
        var newCy;
        newCx = getNombreAleatoire(cSize, (canvasWidth - cSize));
        newCy = getNombreAleatoire(cSize, (canvasHeight - cSize));
        if (coordonneesPommes.length == 10) {
            return true;
        } else if (coordonneesPommes.length == 0) {
            var col = false;
        } else {
            var col = false;
            for (j = 0; j < coordonneesPommes.length; j++) {
                var pomme = coordonneesPommes[j];
                testPommeValide = collision(pomme, newCx, newCy, 10);
                if (testPommeValide) {
                    col = true;
                }
            }
        }
        var colS = collision(serpent, newCx, newCy, 20);
        if (colS) {
            col = true;
        }
        if (!col) {
            coordonneesPommes.push([newCx, newCy]);
            insertCircle(newCx, newCy);
        }
        loadFruit();
    }

    $("body").keydown(function (event) {
        var keyPress = event.which;
        move(keyPress);
        insertIcon();
        for (i = 0; i < coordonneesPommes.length; i++) {
            var pommeCourante = coordonneesPommes[i];
            var PommeCx = pommeCourante[0];
            var PommeCy = pommeCourante[1];
            insertCircle(PommeCx, PommeCy);
        }
        insertTail()
    });

    function collision(element, newCx, newCy, space) {
        var cSize = cf + 1;
        var xInvalid = (newCx >= (element[0] - space) && newCx <= (element[0] + space + cSize));
        var yInvalid = (newCy >= (element[1] - space) && newCy <= (element[1] + space + cSize));
        return (xInvalid && yInvalid);
    }
   
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

    function insertTail() {
        var tailSizePart = 2;
        for (i = 0; i < coordonneesQueue.length; i++) {
            var partieQueue = coordonneesQueue[i];
            var partieX = partieQueue[0];
            var partieY = partieQueue[1];
            ctx.rect(partieX, partieY, tailSizePart, tailSizePart);
        }
        
        ctx.stroke();
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

        // Deplacement de la queue
        coordonneesQueue.splice(0, 1);
        coordonneesQueue.push([ex - 2, ey + 1]);

        mangeFruits([ex, ey]);  
    };

    function mangeFruits(e) {
        var indexToRemove;
        for (i = 0; i < coordonneesPommes.length; i++) {
            var pomme = coordonneesPommes[i];
            var pommeX = pomme[0];
            var pommeY = pomme[1];
            var colS = collision([ex, ey], pommeX, pommeY, 3);
            if (colS) {
                indexToRemove = i;
            }
        }
        if ((typeof (indexToRemove) !== 'undefined')) {
            coordonneesPommes.splice(indexToRemove, 1);
            coordonneesQueue.push([ex - 2, ey + 1]);
        }
    }
});


