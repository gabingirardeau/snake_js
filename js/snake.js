$(document).ready(function () {
    var canvas = $("#snakeBoard");
    var e_image = $("#e_conocom");
    var titre = $("#titre");
    var ctx = canvas.get(0).getContext("2d");

    const left = 37;
    const up = 38;
    const right = 39;
    const down = 40;

    var dernierDeplacement = right;
    // Initialisation position Icone Econocom
    var ex = 50;
    var ey = 20;
    var decalageQueue = 7;
    var vitesseDeplacement = 10;
    var eWidth = 30;
    var eHeight = 30;
    // Initialisation position Cercle
    var pommeSize = 10;
    var cg = 0;

    var canvasWidth = canvas.width();
    var canvasHeight = canvas.height();
    insertIcon();

    var coordonneesPommes = [];
    var nbPommes = 10;
    var perimetrePomme = 100;
    for (i = 0; i < nbPommes; i++) {
        var newCx;
        var newCy;
        var testPommeValide = false;
        // Test qu'aucune colision n'est présente avec une autre pomme
        var nombreEssai = 0; 
        var nombreMaxEssai = 100; 
        while (!testPommeValide && nombreEssai < nombreMaxEssai) {
            newCx = getNombreAleatoire(pommeSize, (canvasWidth - pommeSize));
            newCy = getNombreAleatoire(pommeSize, (canvasHeight - pommeSize));

            if (coordonneesPommes.length == 0) {
                testPommeValide = true;
            } else {
                for (j = 0; j < coordonneesPommes.length; j++) {
                    var pomme = coordonneesPommes[j];
                    var cx = pomme[0];
                    var cy = pomme[1];
                    var pommeAbsente = !collision([newCx, newCy], pomme, pommeSize, perimetrePomme);
                    var eAbsent = !collision([newCx, newCy], [ex, ey], eWidth);
                    testPommeValide = pommeAbsente && eAbsent; 
                    if (!testPommeValide) {
                        break;
                    }
                }
            }
            nombreEssai ++;
        }
        coordonneesPommes.push([newCx, newCy]);
    }

    insertPommes();
    
    var coordonneesQueue = [];
    for (i = (ex - 4 * vitesseDeplacement); i <= ex - vitesseDeplacement; i += vitesseDeplacement) {
        coordonneesQueue.push([i, ey + decalageQueue]);
    }
    insertTail();
    drawCanvas();

    $("body").keydown(function (event) {
        var keyPress = event.which;
        move(keyPress);
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        if(coordonneesPommes.length == 0) {  
            ctx.font = "50px Arial";
            ctx.strokeText("YOU WIN !", 30, 90);
        } else {
            insertIcon();
            insertPommes();
            insertTail();
            drawCanvas();        
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

    function insertTail() {
        var tailSizePart = 10;
        for (i = 0; i < coordonneesQueue.length; i++) {
            var partieQueue = coordonneesQueue[i];
            insertRect(partieQueue[0], partieQueue[1], tailSizePart);
        }
    }

    function insertPommes() {

        for (i = 0; i < coordonneesPommes.length; i++) {
            var pommeCourante = coordonneesPommes[i];
            var PommeCx = pommeCourante[0];
            var PommeCy = pommeCourante[1];
            insertCircle(PommeCx, PommeCy);
            drawCanvas();
        }
    };

    function insertCircle(cx, cy) {
        ctx.beginPath();
        ctx.arc(cx, cy, pommeSize, cg, 2 * Math.PI);
    };


    function insertRect(cx, cy, size) {
        ctx.rect(cx, cy, size, size);
    };

    function insertIcon() {
        var angleInDegrees;
        var decalageX;
        var decalageY;
        if(dernierDeplacement == left) {
            angleInDegrees = 180;
            decalageX = 0;
            decalageY = 0;
        } else if(dernierDeplacement == up) {
            angleInDegrees = 270;
            decalageX = 0;
            decalageY = 0;
        } else if(dernierDeplacement == right) {
            angleInDegrees = 0;
            decalageX = 0;
            decalageY = 0;
        } else if(dernierDeplacement == down) {
            angleInDegrees = 90;
            decalageX = 0;
            decalageY = 0;
        } 
        var angleInRadian = angleInDegrees * Math.PI/180;
        var img = $("#e_econocom");
        if (img.get(0)) {
            ctx.translate(ex, ey);
            ctx.rotate(angleInRadian);
            ctx.drawImage(img.get(0), 0, 0);
            ctx.rotate(-angleInRadian);
            ctx.translate(-ex, -ey);
        }
    };

    function drawCanvas() {
        ctx.stroke();
        ctx.fill();
    };

    function move(keyPress) {
        var toucheDeplacement = [left, up, right, down];
        if (keyPress == left && ex > 0) {
            ex -= vitesseDeplacement;
        } else if (keyPress == up && ey > 0) {
            ey -= vitesseDeplacement;
        } else if (keyPress == right && ex < (canvasWidth - eWidth)) {
            ex += vitesseDeplacement;
        } else if (keyPress == down && ey < (canvasHeight - eHeight)) {
            ey += vitesseDeplacement;
        }

       if(toucheDeplacement.includes(keyPress)) {
            dernierDeplacement = keyPress;
            deplacerQueue([ex, ey]);
            mangeFruits([ex, ey]);
       }
 
    };

    function deplacerQueue(e) {
        coordonneesQueue.splice(0, 1);
        coordonneesQueue.push([ex - vitesseDeplacement, ey + decalageQueue]);
    }

    function mangeFruits(e) {
        var indexToRemove;
        for (i = 0; i < coordonneesPommes.length; i++) {
            var pomme = coordonneesPommes[i];
            var collisionPomme = collision(pomme, e, eWidth, 0);
            if (collisionPomme) {
                indexToRemove = i;
            }
        }
        if((typeof(indexToRemove) !== 'undefined')) {
            coordonneesPommes.splice(indexToRemove, 1);
            coordonneesQueue.unshift([ex - vitesseDeplacement, ey + decalageQueue]);
        }
    }
});


