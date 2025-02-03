function performAnimation() {
    const panel = document.querySelector('.panel-main');
    const MAX_ROTATION = 5;
    
    panel.style.transition = 'transform 0.45s ease-out';
    panel.style.transformOrigin = 'center center';
    
    let animationFrame;
    
    document.addEventListener('mousemove', (e) => {
        if (animationFrame) cancelAnimationFrame(animationFrame);
        
        animationFrame = requestAnimationFrame(() => {
            const rect = panel.getBoundingClientRect();
            const panelCenterX = rect.left + rect.width / 2;
            const panelCenterY = rect.top + rect.height / 2;
            
            const distanceX = Math.abs(e.clientX - panelCenterX);
            const distanceY = Math.abs(e.clientY - panelCenterY);
            
            const isOutside = distanceX > rect.width / 2 || distanceY > rect.height / 2;
            
            if (isOutside) {
                const xAxis = ((e.clientX - panelCenterX) / window.innerWidth) * MAX_ROTATION;
                const yAxis = -((e.clientY - panelCenterY) / window.innerHeight) * MAX_ROTATION;
                
                const rotationY = Math.max(-MAX_ROTATION, Math.min(MAX_ROTATION, xAxis));
                const rotationX = Math.max(-MAX_ROTATION, Math.min(MAX_ROTATION, yAxis));
                
                panel.style.transform = `rotateY(${rotationY}deg) rotateX(${rotationX}deg)`;
            } else {
                panel.style.transform = 'rotateY(0deg) rotateX(0deg)';
            }
        });
    });
}

function openWindow(string) {
    window.open("https://" + string, '_blank');
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('bg-video').playbackRate = 0.75;
    document.getElementById('pfp-video').playbackRate = 0.75;
    performAnimation();

    const techStack = document.getElementById('tech-stack');
    const scrollArrow = document.querySelector('.scroll-arrow');

    if (techStack && scrollArrow) {
        techStack.addEventListener('scroll', () => {
            const isAtBottom = 
                techStack.scrollHeight - techStack.scrollTop <= techStack.clientHeight + 1;
            
            if (isAtBottom) {
                scrollArrow.style.opacity = 0;
            } else {
                scrollArrow.style.opacity = 1;
            }
        });
    } else {
        console.warn('Tech stack or scroll arrow elements not found');
    }
});