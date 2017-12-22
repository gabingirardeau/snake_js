$(document).ready(function () {
    var canvas = $("#snakeBoard");
    var ctx = canvas.get(0).getContext("2d");
    // Initialisation position Icone Econocom
    var ex = 10;
    var ey = 10;
    var eWidth = 6;
    var eHeight = 5;
    // Initialisation position Cercle
    var cf = 2;
    var cg = 0;
    var cSize = cf + 1;

    var canvasWidth = 300;
    var canvasHeight = 150;
    insertIcon();
    var image = $("#e_conocom");
    var titre = $("#titre");

    var coordonneesPommes = [];
    var nbPommes = 100;
    for (i = 0; i < nbPommes; i++) {
        
        var newCx;
        var newCy;
        var perimetrePomme = 5;
        var testPommeValide = false;
        // Test qu'aucune colision n'est présente avec une autre pomme
        var nombreEssai = 0; 
        var nombreMaxEssai = 100; 
        while (!testPommeValide && nombreEssai < nombreMaxEssai) {
            newCx = getNombreAleatoire(cSize, (canvasWidth - cSize));
            newCy = getNombreAleatoire(cSize, (canvasHeight - cSize));

            if (coordonneesPommes.length == 0) {
                testPommeValide = true;
            } else {
                for (j = 0; j < coordonneesPommes.length; j++) {
                    var pomme = coordonneesPommes[j];
                    var cx = pomme[0];
                    var cy = pomme[1];
                    var cSize = cf + 1;
                    var pommeAbsente = !collision([newCx, newCy], pomme, cSize, perimetrePomme);
                    var eAbsent = !collision([newCx, newCy], [ex, ey], eWidth, 20);
                    testPommeValide = pommeAbsente && eAbsent; 
                    if (!testPommeValide) {
                        break;
                    }
                }
            }
            nombreEssai ++;
        }
        coordonneesPommes.push([newCx, newCy]);
        insertCircle(newCx, newCy);
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
    });

    function collision(newElementPosition, elementPosition, elementSize,  perimeter) {
        var xInvalid = (newElementPosition[0] >= elementPosition[0] - perimeter) && newElementPosition[0] <= (elementPosition[0] + perimeter + elementSize);
        var yInvalid = (newElementPosition[1] >= elementPosition[1] - perimeter) && newElementPosition[1] <= (elementPosition[1] + perimeter + elementSize);
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

    function move(keyPress) {
        if (keyPress == 37 && ex > 0) {
            ex -= 1;
        } else if (keyPress == 38 && ey > 0) {
            ey -= 1.
        } else if (keyPress == 39 && ex < (canvasWidth - eWidth)) {
            ex += 1
        } else if (keyPress == 40 && ey < (canvasHeight - eHeight)) {
            ey += 1
        }
      
    };

    
});


