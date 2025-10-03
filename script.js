class YoyoNavigator {
    constructor() {
        this.yoyos = document.querySelectorAll('.yoyo');
        this.sections = document.querySelectorAll('.section');
        this.isAnimating = false;
        this.init();
    }

    init() {
        this.yoyos.forEach(yoyo => {
            yoyo.addEventListener('click', (e) => {
                if (this.isAnimating) return;
                this.animateYoyo(e.target);
            });
        });

        this.setupCtaButtons();
    }

    animateYoyo(yoyo) {
        this.isAnimating = true;
        const targetSection = yoyo.getAttribute('data-target');
        
        // SOLUCIÓN SIMPLE: Usar transform para la animación sin cambiar position
        const yoyoRect = yoyo.getBoundingClientRect();
        
        // Guardar transform original
        const originalTransform = yoyo.style.transform;
        const originalTransition = yoyo.style.transition;
        const originalZIndex = yoyo.style.zIndex;
        
        // Preparar para animación
        yoyo.style.zIndex = '1001';
        yoyo.style.transition = 'none';
        
        // Posicionar relativamente sin cambiar el layout
        yoyo.style.transform = `translate(${window.scrollX}px, ${window.scrollY}px)`;
        
        // Forzar reflow
        yoyo.offsetHeight;
        
        // Ahora animar
        yoyo.style.transition = 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)';
        yoyo.style.transform = `translate(${window.scrollX}px, calc(100vh - ${yoyoRect.top}px)) rotate(1080deg) scale(0.8)`;

        setTimeout(() => {
            this.createCircularTransition(targetSection, yoyo, {
                transform: originalTransform,
                transition: originalTransition,
                zIndex: originalZIndex
            });
        }, 650);
    }

    createCircularTransition(targetSection, yoyo, originalStyles) {
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 50%;
            transform: scale(0);
            transform-origin: center bottom;
            transition: transform 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            z-index: 999;
            pointer-events: none;
        `;

        document.body.appendChild(overlay);

        requestAnimationFrame(() => {
            overlay.style.transform = 'scale(3.5)';
        });

        setTimeout(() => {
            this.showSection(targetSection);
            yoyo.style.opacity = '0';
            
            setTimeout(() => {
                overlay.style.transition = 'transform 0.6s ease, opacity 0.4s ease';
                overlay.style.transform = 'scale(0)';
                overlay.style.opacity = '0';

                setTimeout(() => {
                    // Reset usando transform
                    yoyo.style.transition = 'none';
                    yoyo.style.transform = originalStyles.transform;
                    yoyo.style.zIndex = originalStyles.zIndex;
                    yoyo.style.opacity = '1';
                    
                    setTimeout(() => {
                        yoyo.style.transition = originalStyles.transition;
                        overlay.remove();
                        this.isAnimating = false;
                    }, 50);
                }, 600);
            }, 400);
        }, 800);
    }

    showSection(sectionId) {
        this.sections.forEach(section => {
            section.style.opacity = '0';
            section.classList.remove('active');
        });

        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            setTimeout(() => {
                targetSection.style.opacity = '1';
            }, 50);
        }
    }

    setupCtaButtons() {
        document.querySelectorAll('.cta-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (this.isAnimating) return;
                const targetSection = e.target.getAttribute('data-target');
                if (targetSection) {
                    const targetYoyo = document.querySelector(`.yoyo[data-target="${targetSection}"]`);
                    if (targetYoyo) {
                        this.animateYoyo(targetYoyo);
                    }
                }
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new YoyoNavigator();
});

document.querySelector('.apk-btn')?.addEventListener('click', () => {
    alert('¡Próximamente disponible para descarga!');
});
