class YoyoNavigator {
    constructor() {
        this.yoyos = document.querySelectorAll('.yoyo');
        this.sections = document.querySelectorAll('.section');
        this.isAnimating = false;
        this.originalStyles = new Map(); // Para guardar mejor los estilos
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
        
        // 1. Guardar estilos originales de forma más robusta
        this.saveOriginalStyles(yoyo);

        // 2. Calcular posición CORRECTA considerando el scroll
        const yoyoRect = yoyo.getBoundingClientRect();
        
        // Obtener posición absoluta en la página (incluye scroll)
        const absoluteYoyoLeft = yoyoRect.left + window.scrollX;
        const absoluteYoyoTop = yoyoRect.top + window.scrollY;
        
        // Aplicar posición fixed MANTENIENDO la posición visual exacta
        yoyo.style.position = 'fixed';
        yoyo.style.top = `${absoluteYoyoTop}px`;
        yoyo.style.left = `${absoluteYoyoLeft}px`;
        yoyo.style.margin = '0';
        yoyo.style.zIndex = '1001';
        yoyo.style.width = `${yoyoRect.width}px`; // Mantener dimensiones
        yoyo.style.height = `${yoyoRect.height}px`;

        // Forzar reflow para asegurar que los estilos se aplican
        yoyo.offsetHeight;

        console.log('Posición calculada:', {
            absoluteLeft: absoluteYoyoLeft,
            absoluteTop: absoluteYoyoTop,
            scrollX: window.scrollX,
            scrollY: window.scrollY,
            clientRect: yoyoRect
        });

        // 3. Animación de CAÍDA desde posición corregida
        requestAnimationFrame(() => {
            yoyo.style.transition = 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)';
            yoyo.style.transform = `translateY(calc(100vh - ${absoluteYoyoTop}px)) rotate(1080deg) scale(0.8)`;
        });

        // 4. Crear transición circular
        setTimeout(() => {
            this.createCircularTransition(targetSection, yoyo);
        }, 650);
    }

    saveOriginalStyles(yoyo) {
        const computedStyle = window.getComputedStyle(yoyo);
        this.originalStyles.set(yoyo, {
            position: computedStyle.position,
            top: computedStyle.top,
            left: computedStyle.left,
            margin: computedStyle.margin,
            transform: computedStyle.transform,
            transition: computedStyle.transition,
            width: computedStyle.width,
            height: computedStyle.height,
            zIndex: computedStyle.zIndex,
            opacity: computedStyle.opacity
        });
    }

    resetYoyo(yoyo) {
        const originalStyle = this.originalStyles.get(yoyo);
        if (!originalStyle) return;

        // Primero quitar la transición para un reset instantáneo
        yoyo.style.transition = 'none';
        yoyo.style.transform = originalStyle.transform;
        
        // Restaurar estilos originales
        yoyo.style.position = originalStyle.position;
        yoyo.style.top = originalStyle.top;
        yoyo.style.left = originalStyle.left;
        yoyo.style.margin = originalStyle.margin;
        yoyo.style.width = originalStyle.width;
        yoyo.style.height = originalStyle.height;
        yoyo.style.zIndex = originalStyle.zIndex;
        yoyo.style.opacity = originalStyle.opacity;

        // Forzar reflow
        yoyo.offsetHeight;

        // Restaurar transición original después del reset
        setTimeout(() => {
            yoyo.style.transition = originalStyle.transition;
        }, 50);

        // Limpiar del mapa
        this.originalStyles.delete(yoyo);
    }

    createCircularTransition(targetSection, yoyo) {
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
        requestAnimationFrame(() => {
            overlay.style.transform = 'scale(3.5)';
        });

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
                    this.resetYoyo(yoyo);
                    overlay.remove();
                    this.isAnimating = false;
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
            requestAnimationFrame(() => {
                targetSection.style.opacity = '1';
            });
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
