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
        
        // SOLUCIÓN: Calcular la diferencia entre boundingClientRect y posición real
        const yoyoRect = yoyo.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(yoyo);
        
        // Obtener la posición REAL del elemento en el documento
        let actualLeft = yoyo.offsetLeft;
        let actualTop = yoyo.offsetTop;
        
        // Subir por el árbol para calcular la posición absoluta real
        let parent = yoyo.offsetParent;
        let currentElement = yoyo;
        
        while (parent && !parent.isSameNode(document.body)) {
            actualLeft += parent.offsetLeft - parent.scrollLeft;
            actualTop += parent.offsetTop - parent.scrollTop;
            currentElement = parent;
            parent = parent.offsetParent;
        }

        console.log('Debug posición:', {
            boundingLeft: yoyoRect.left,
            boundingTop: yoyoRect.top,
            offsetLeft: yoyo.offsetLeft,
            offsetTop: yoyo.offsetTop,
            scrollX: window.scrollX,
            scrollY: window.scrollY,
            actualLeft,
            actualTop
        });

        // Guardar estilos originales COMPLETOS
        const originalStyles = {
            position: yoyo.style.position,
            top: yoyo.style.top,
            left: yoyo.style.left,
            margin: yoyo.style.margin,
            transform: yoyo.style.transform,
            transition: yoyo.style.transition,
            zIndex: yoyo.style.zIndex
        };

        // Aplicar posición fixed CORREGIDA
        yoyo.style.position = 'fixed';
        yoyo.style.left = `${actualLeft}px`;  // Usar offsetLeft calculado, NO boundingClientRect
        yoyo.style.top = `${actualTop}px`;    // Usar offsetTop calculado
        yoyo.style.margin = '0';
        yoyo.style.zIndex = '1001';
        yoyo.style.transform = 'none'; // Resetear transform temporalmente

        // Forzar reflow
        yoyo.offsetHeight;

        // Ahora animar desde la posición corregida
        setTimeout(() => {
            yoyo.style.transition = 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)';
            // Calcular la caída basada en la posición corregida
            const fallDistance = window.innerHeight - actualTop;
            yoyo.style.transform = `translateY(${fallDistance}px) rotate(1080deg) scale(0.8)`;
        }, 10);

        setTimeout(() => {
            this.createCircularTransition(targetSection, yoyo, originalStyles);
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

        setTimeout(() => {
            overlay.style.transform = 'scale(3.5)';
        }, 50);

        setTimeout(() => {
            this.showSection(targetSection);
            yoyo.style.opacity = '0';
            
            setTimeout(() => {
                overlay.style.transition = 'transform 0.6s ease, opacity 0.4s ease';
                overlay.style.transform = 'scale(0)';
                overlay.style.opacity = '0';

                setTimeout(() => {
                    this.resetYoyo(yoyo, originalStyles);
                    overlay.remove();
                    this.isAnimating = false;
                }, 600);
            }, 400);
        }, 800);
    }

    resetYoyo(yoyo, originalStyles) {
        // Primero resetear a posición absoluta temporalmente
        yoyo.style.position = 'absolute';
        yoyo.style.transition = 'none';
        yoyo.style.opacity = '0';
        
        // Forzar reflow
        yoyo.offsetHeight;
        
        // Ahora restaurar completamente
        yoyo.style.position = originalStyles.position || '';
        yoyo.style.top = originalStyles.top || '';
        yoyo.style.left = originalStyles.left || '';
        yoyo.style.margin = originalStyles.margin || '';
        yoyo.style.transform = originalStyles.transform || '';
        yoyo.style.zIndex = originalStyles.zIndex || '';
        
        // Forzar otro reflow
        yoyo.offsetHeight;
        
        // Finalmente restaurar opacidad y transición
        yoyo.style.opacity = '1';
        yoyo.style.transition = originalStyles.transition || '';
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
