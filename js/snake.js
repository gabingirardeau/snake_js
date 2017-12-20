$(document).ready(function () {
    var canvas = $("#snakeBoard");
    var ex = 10;
    var ey = 10;
    var canvasWidth = 300;
    var canvasHeight = 150;
    insertIcon();
    var titre = $("#titre");
    console.log(canvas.css("width"));
    console.log(canvas.css("height"));

    $("body").keydown(function (event) {
        var keyPress = event.which;
        move(keyPress);
        insertIcon();

    });

    function insertIcon() {
        if (canvas.get(0)) {
            var ctx = canvas.get(0).getContext("2d");
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            var img = $("#e_econocom");
            if (img.get(0)) {
                ctx.drawImage(img.get(0), ex, ey);
            }
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


