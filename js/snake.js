$(document).ready(function () {
    insertIcon();
    console.log("premier lancement");
    function insertIcon() {
        var canvas = $("#snakeBoard");
        if(canvas.get(0)) {
            var ctx = canvas.get(0).getContext("2d");
            var img = $("#e_econocom");
            if(img.get(0)) {
                ctx.drawImage(img.get(0),10,10);
            }
        }

    }
});