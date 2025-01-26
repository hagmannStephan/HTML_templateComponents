let lastClientX = 0;
const trail = document.getElementById('cursorTrail');
const trailPoints: HTMLElement[] = [];
const maxPoints = 20;
const pointLifetime = 1000;

document.addEventListener('mousemove', (e) => {
    const image = document.getElementById('beeCursorTracker') as HTMLElement;
    
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
        point.style.top = `${e.clientY + 30}px`;
        trail.appendChild(point);

        // Keep track of points
        trailPoints.push(point);

        // Schedule removal
        setTimeout(() => {
            if (point.parentElement === trail) {
                trail.removeChild(point);
            }
            // Ensure it's removed from trailPoints array
            const index = trailPoints.indexOf(point);
            if (index > -1) {
                trailPoints.splice(index, 1);
            }
        }, pointLifetime);

        // Remove excess points
        if (trailPoints.length > maxPoints) {
            const oldestPoint = trailPoints.shift();
            if (oldestPoint?.parentElement === trail) {
                trail.removeChild(oldestPoint);
            }
        }

        // Fade and shrink points
        trailPoints.forEach((p, index) => {
            p.style.opacity = (index / trailPoints.length).toString();
            p.style.transform = `scale(${1 - index / trailPoints.length})`;
        });
    }
});