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
    
    // 1. Guardar estilos originales
    const originalStyle = {
        transform: yoyo.style.transform,
        transition: yoyo.style.transition,
        position: yoyo.style.position,
        top: yoyo.style.top,
        left: yoyo.style.left,
        margin: yoyo.style.margin
    };

    // 2. Calcular posición CORRECTA considerando el scroll
    const navRect = document.querySelector('.yoyo-nav').getBoundingClientRect();
    const yoyoRect = yoyo.getBoundingClientRect();
    
    // Obtener posición absoluta en la página (incluye scroll)
    const absoluteYoyoLeft = yoyoRect.left + window.pageXOffset;
    const absoluteYoyoTop = yoyoRect.top + window.pageYOffset;
    
    // Aplicar posición fixed MANTENIENDO la posición visual exacta
    yoyo.style.position = 'fixed';
    yoyo.style.top = `${absoluteYoyoTop}px`;
    yoyo.style.left = `${absoluteYoyoLeft}px`;
    yoyo.style.margin = '0';
    yoyo.style.zIndex = '1001';

    console.log('Posición calculada:', {
        absoluteLeft: absoluteYoyoLeft,
        absoluteTop: absoluteYoyoTop,
        scrollX: window.pageXOffset,
        scrollY: window.pageYOffset
    });

    // 3. Animación de CAÍDA desde posición corregida
    setTimeout(() => {
        yoyo.style.transition = 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)';
        yoyo.style.transform = `translateY(calc(100vh - ${absoluteYoyoTop}px)) rotate(1080deg) scale(0.8)`;
    }, 10);

    // 4. Crear transición circular
    setTimeout(() => {
        this.createCircularTransition(targetSection, yoyo, originalStyle);
    }, 650);
}

    createCircularTransition(targetSection, yoyo, originalStyle) {
        // Crear overlay de transición desde centro inferior
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

        // 1. Expandir círculo
        setTimeout(() => {
            overlay.style.transform = 'scale(3.5)';
        }, 50);

        // 2. Cambiar sección
        setTimeout(() => {
            this.showSection(targetSection);
            yoyo.style.opacity = '0';
            
            // 3. Contraer y limpiar
            setTimeout(() => {
                overlay.style.transition = 'transform 0.6s ease, opacity 0.4s ease';
                overlay.style.transform = 'scale(0)';
                overlay.style.opacity = '0';

                setTimeout(() => {
                    this.resetYoyo(yoyo, originalStyle);
                    overlay.remove();
                    this.isAnimating = false;
                }, 600);
            }, 400);
        }, 800);
    }

    resetYoyo(yoyo, originalStyle) {
        // Restaurar estilos originales COMPLETAMENTE
        yoyo.style.position = originalStyle.position || '';
        yoyo.style.top = originalStyle.top || '';
        yoyo.style.left = originalStyle.left || '';
        yoyo.style.margin = originalStyle.margin || '';
        yoyo.style.transform = originalStyle.transform || '';
        yoyo.style.transition = originalStyle.transition || '';
        yoyo.style.zIndex = '';
        yoyo.style.opacity = '1';
        
        // Fuerza un reflow para asegurar el reset
        yoyo.offsetHeight;
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

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    new YoyoNavigator();
});

// Botón de descarga
document.querySelector('.apk-btn')?.addEventListener('click', () => {
    alert('¡Próximamente disponible para descarga!');
});

// Transiciones suaves
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.section').forEach(section => {
        section.style.transition = 'opacity 0.5s ease';
    });
});