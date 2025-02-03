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
    if (!string || typeof string !== 'string') return;
    
    if (!string.startsWith("mailto")) {
        window.open("https://" + string, '_blank');
    } else {
        window.open(string, '_blank');
    }
}

function scrollArrowAnimation() {
    const scrollableContainers = document.querySelectorAll('.content-scrollable');
    scrollableContainers.forEach(container => {
        const scrollArrow = container.querySelector('.scroll-arrow');
        
        if (scrollArrow) {
            container.addEventListener('scroll', () => {
                const isAtBottom = 
                    container.scrollHeight - container.scrollTop <= container.clientHeight + 1;
                
                if (isAtBottom) {
                    scrollArrow.style.visibility = 'hidden';
                } else {
                    scrollArrow.style.visibility = 'visible';
                }
            });
        } else {
            console.warn('Scroll arrow not found for container:', container);
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('bg-video').playbackRate = 0.75;
    document.getElementById('pfp-video').playbackRate = 0.75;
    performAnimation();
    scrollArrowAnimation();
});