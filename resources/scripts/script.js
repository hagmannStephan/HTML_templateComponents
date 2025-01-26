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
        point_1.style.top = "".concat(e.clientY + 30, "px");
        trail.appendChild(point_1);
        // Keep track of points
        trailPoints.push(point_1);
        // Schedule removal
        setTimeout(function () {
            if (point_1.parentElement === trail) {
                trail.removeChild(point_1);
            }
            // Ensure it's removed from trailPoints array
            var index = trailPoints.indexOf(point_1);
            if (index > -1) {
                trailPoints.splice(index, 1);
            }
        }, pointLifetime);
        // Remove excess points
        if (trailPoints.length > maxPoints) {
            var oldestPoint = trailPoints.shift();
            if ((oldestPoint === null || oldestPoint === void 0 ? void 0 : oldestPoint.parentElement) === trail) {
                trail.removeChild(oldestPoint);
            }
        }
        // Fade and shrink points
        trailPoints.forEach(function (p, index) {
            p.style.opacity = (index / trailPoints.length).toString();
            p.style.transform = "scale(".concat(1 - index / trailPoints.length, ")");
        });
    }
});
//# sourceMappingURL=script.js.map