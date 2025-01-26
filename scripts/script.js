var lastClientX = 0;
var trail = document.getElementById('cursorTrail');
var trailPoints = [];
var maxPoints = 20;
var pointLifetime = 1000;
document.addEventListener('mousemove', function (e) {
    var image = document.getElementById('beeCursorTracker');
    var offsetX = -15;
    var offsetY = -15;
    image.style.left = "".concat(e.clientX + offsetX, "px");
    image.style.top = "".concat(e.clientY + offsetY, "px");
    // Determine rotation based on cursor movement direction
    if (e.clientX < lastClientX) {
        image.style.transform = 'scaleX(-1)';
    }
    else if (e.clientX > lastClientX) {
        image.style.transform = 'scaleX(1)';
    }
    lastClientX = e.clientX;
    if (Math.random() < 0.2) {
        // Create a new point
        var point_1 = document.createElement('div');
        point_1.classList.add('trail-point');
        point_1.style.left = "".concat(e.clientX, "px");
        point_1.style.top = "".concat(e.clientY, "px");
        trail.appendChild(point_1);
        // Keep track of points
        trailPoints.push(point_1);
        setTimeout(function () {
            trail.removeChild(point_1);
        }, pointLifetime);
        // Remove excess points
        if (trailPoints.length > maxPoints) {
            var oldestPoint = trailPoints.shift();
            oldestPoint.remove();
        }
        // Fade and shrink points
        trailPoints.forEach(function (p, index) {
            p.style.opacity = (index / trailPoints.length);
            p.style.transform = "scale(".concat(1 - index / trailPoints.length, ")");
        });
    }
});
function setupIframeMouseTracking() {
    var iframes = document.querySelectorAll('iframe');
    var image = document.getElementById('beeCursorTracker');
    var lastClientX = 0;
    // Main document mouse move handler
    document.addEventListener('mousemove', function (e) {
        var offsetX = -15;
        var offsetY = -15;
        image.style.left = "".concat(e.clientX + offsetX, "px");
        image.style.top = "".concat(e.clientY + offsetY, "px");
        if (e.clientX < lastClientX) {
            image.style.transform = 'scaleX(-1)';
        }
        else if (e.clientX > lastClientX) {
            image.style.transform = 'scaleX(1)';
        }
        lastClientX = e.clientX;
    });
    // Inject tracking script into iframes
    iframes.forEach(function (iframe) {
        iframe.addEventListener('load', function () {
            iframe.contentWindow.postMessage({
                type: 'initMouseTracking',
                offsetX: -15,
                offsetY: -15
            }, '*');
        });
    });
    // Listen for mouse move events from iframes
    window.addEventListener('message', function (event) {
        if (event.data.type === 'iframeMouseMove') {
            var _a = event.data, clientX = _a.clientX, clientY = _a.clientY;
            image.style.left = "".concat(clientX - 15, "px");
            image.style.top = "".concat(clientY - 15, "px");
        }
    }, false);
}
// Call on page load
document.addEventListener('DOMContentLoaded', setupIframeMouseTracking);
//# sourceMappingURL=script.js.map