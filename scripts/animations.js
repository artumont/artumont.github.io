function panelPerspective() {
    const panel = document.getElementById('perspective-animation');
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

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('bg-video').playbackRate = 0.75;
    document.getElementById('pfp-video').playbackRate = 0.75;
    panelPerspective();
});