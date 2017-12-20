$(document).ready(function () {
    insertIcon();
    var ex = 10;
    var ey = 10;

    function insertIcon() {
        var canvas = $("#snakeBoard");
        if (canvas.get(0)) {
            var ctx = canvas.get(0).getContext("2d");
            var img = $("#e_econocom");
            if (img.get(0)) {
                ctx.drawImage(img.get(0), ex, ey);
            }
        }

    }

    function move(keyPress) {
        if (keyPress == 37 && ex > 10) {
            ex -= 1;
        } else if (keyPress == 38 && ey > 10) {
            ey -= 1.
        } else if (keyPress == 39 && ex < 1200) {
            ex += 1
        } else if (keyPress == 40 && ey < 800) {
            ey += 1
        } else {
            alert('stop');
        }
        console.log('ex=' + ex + ' | ey=' + ey);
    }

    $("body").keydown(function (event) {
        var keyPress = event.which;
        move(keyPress);
        console.log(keyPress);
    });
});


