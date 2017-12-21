$(document).ready(function () {
    var canvas = $("#snakeBoard");
    var ctx = canvas.get(0).getContext("2d");
    // Initialisation position Icone Econocom
    var ex = 10;
    var ey = 10;
    var serpent =[10,10];
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

    function loadFruit (){
        var cSize = cf + 1;
        var newCx;
        var newCy;
        newCx = getNombreAleatoire(cSize, (canvasWidth - cSize));
        newCy = getNombreAleatoire(cSize, (canvasHeight - cSize));
        if(coordonneesPommes.length == 10){
            return true;
        }else if(coordonneesPommes.length == 0){
            var col = false;
        }else{
            var col = false;
            for (j = 0; j < coordonneesPommes.length; j++) {
                var pomme = coordonneesPommes[j];
                testPommeValide = collision(pomme,newCx,newCy,5);
                if(testPommeValide){
                    col = true;
                }
            
        
            }
        }
        var colS = collision (serpent,newCx,newCy,20);
        if (colS){
            col=true;
        }
        if(!col ){
            coordonneesPommes.push([newCx, newCy]);
            insertCircle(newCx, newCy);
        }
        loadFruit();
    }

    function collision(element,newCx,newCy,space){
        var cSize = cf + 1;
        var xInvalid = (newCx >= (element[0] - space) && newCx <= (element[0] + space + cSize));
        var yInvalid = (newCy >= (element[1] - space) && newCy <= (element[1] + space + cSize));
        return (xInvalid && yInvalid);
    }
             var yInvalid = (newCy >= (cy - 5) && newCy <= (cy + 5 + cSize));

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
    };
});


