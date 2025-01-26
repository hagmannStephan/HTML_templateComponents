let lastClientX = 0;
const trail = document.getElementById('cursorTrail');
const trailPoints = [];
const maxPoints = 20;
const pointLifetime = 1000;

document.addEventListener('mousemove', (e) => {
    const image = document.getElementById('beeCursorTracker');
    
    const offsetX = -15;
    const offsetY = -15;
    
    image.style.left = `${e.clientX + offsetX}px`;
    image.style.top = `${e.clientY + offsetY}px`;

    // Determine rotation based on cursor movement direction
    if (e.clientX < lastClientX) {
        image.style.transform = 'scaleX(-1)';
    } else if (e.clientX > lastClientX) {
        image.style.transform = 'scaleX(1)';
    }

    lastClientX = e.clientX;

    if (Math.random() < 0.2) {
        // Create a new point
        const point = document.createElement('div');
        point.classList.add('trail-point');
        point.style.left = `${e.clientX}px`;
        point.style.top = `${e.clientY}px`;
        trail.appendChild(point);

        // Keep track of points
        trailPoints.push(point);

        setTimeout(() => {
            trail.removeChild(point);
        }, pointLifetime);

        // Remove excess points
        if (trailPoints.length > maxPoints) {
            const oldestPoint = trailPoints.shift();
            oldestPoint.remove();
        }

        // Fade and shrink points
        trailPoints.forEach((p, index) => {
            p.style.opacity = (index / trailPoints.length);
            p.style.transform = `scale(${1 - index / trailPoints.length})`;
        });
    }
});