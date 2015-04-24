
document.addEventListener('mousedown', function(evt) {

    // Only interested on the context menu
    if (evt.button != 2) {
        return;
    }

    // If the target is not a image, bye.
    if (event.target.tagName != 'IMG') {
        return;
    }

    // If the target is not a gif, bye.
    if (!/\.gif($|\?)/i.test(event.target.src)) {
        chrome.extension.sendMessage({
            sender: "GIFNOPE",
            command: "DISABLE_MENU"
        });
        return;
    }

    chrome.extension.sendMessage({
        sender: "GIFNOPE",
        command: "ENABLE_MENU"
    });
});

/* Listen for messages */
chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {

    if (msg.sender && (msg.sender == "GIFNOPE")) {

        if (msg.command == "PAUSE_ALL") {

            var gifs = window.document.querySelectorAll("img");

            for (var i=0, l = gifs.length; i < l; i++) {

                if (/\.gif($|\?)/i.test(gifs[i].src)) {
                    stopGif(gifs[i]);
                }
            }
        }

        if (msg.command == "PAUSE") {

            var gif;

            gif = window.document.querySelector("[src='" + msg.target + "']");

            if (!gif) {
                alert("Can't reach this image. It may be inside an iframe.");
                return;
            }

            stopGif(gif);
        }

        sendResponse();
    }
});

function stopGif(gif) {

    waitUntilReady();

    function waitUntilReady() {
        gif.complete ? replaceGif() : setTimeout(waitUntilReady, 10);
    }

    function replaceGif() {

        var width = gif.clientWidth,
            height = gif.clientHeight,
            canvas,
            display,
            ctx;

        canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        canvas.style.cssText = document.defaultView.getComputedStyle(gif, "").cssText;

        display = document.defaultView.getComputedStyle(gif, "").display;

        ctx = canvas.getContext('2d');
        ctx.drawImage(gif, 0, 0, gif.width, gif.height);

        var x = canvas.width / 2;
        var y = canvas.height / 2;
        ctx.font = '300% sans-serif';
        ctx.textAlign = 'center';
        ctx.fillStyle = 'black';
        ctx.fillRect(x - 90, y - 40, 180, 60);
        ctx.fillStyle = 'white';
        ctx.fillText('GIF Paused', x, y);

        document.querySelector('body').appendChild(canvas);

        gif.style.display = 'none';
        gif.parentNode.replaceChild(canvas, gif);

        canvas.addEventListener('click', function () {
            canvas.style.display = 'none';
            gif.style.display = display;
            canvas.parentNode.replaceChild(gif, canvas);
        });
    }

}