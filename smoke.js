// Ensure the script runs after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    console.log("Smoke.js is loaded");

    // Initialize smoke effect
    initSmokeEffect();
});

function initSmokeEffect() {
    // Create a full-screen canvas element for the smoke effect
    const canvas = document.createElement('canvas');
    canvas.id = 'smokeCanvas';
    canvas.style.position = 'fixed'; // Fixed positioning to cover the viewport
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none'; // Ensure the canvas does not interfere with interactions
    canvas.style.zIndex = '999'; // Ensure the canvas is above other content
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');

    // Adjust canvas size on window resize
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Define smoke particles
    const particles = [];
    const particleCount = 100;

    function createParticle() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 5 + 1,
            speedX: Math.random() * 2 - 1,
            speedY: Math.random() * 2 - 1,
            opacity: Math.random() * 0.5 + 0.3,
            life: Math.random() * 100 + 50
        };
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(createParticle());
    }

    function updateParticles() {
        particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            particle.opacity -= 0.01;
            particle.life -= 1;

            if (particle.opacity <= 0 || particle.life <= 0) {
                Object.assign(particle, createParticle());
            }
        });
    }

    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = 'lighter';

        particles.forEach(particle => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
            ctx.fill();
            ctx.closePath();
        });
    }

    function animate() {
        updateParticles();
        drawParticles();
        requestAnimationFrame(animate);
    }

    animate();
}
