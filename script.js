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
        
        // 1. Guardar estilos originales COMPLETOS
        const originalStyle = {
            transform: yoyo.style.transform,
            transition: yoyo.style.transition,
            position: yoyo.style.position,
            top: yoyo.style.top,
            left: yoyo.style.left,
            right: yoyo.style.right,
            bottom: yoyo.style.bottom,
            margin: yoyo.style.margin,
            width: yoyo.style.width,
            height: yoyo.style.height
        };

        // 2. Calcular posición ABSOLUTA exacta
        const yoyoRect = yoyo.getBoundingClientRect();
        const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;
        
        // Posición absoluta en la página
        const absoluteYoyoLeft = yoyoRect.left + scrollX;
        const absoluteYoyoTop = yoyoRect.top + scrollY;
        
        // Guardar dimensiones originales
        const originalWidth = yoyoRect.width;
        const originalHeight = yoyoRect.height;

        // 3. Aplicar posición fixed MANTENIENDO la posición visual exacta
        // IMPORTANTE: Remover cualquier transform existente temporalmente
        const currentTransform = yoyo.style.transform;
        yoyo.style.transform = 'none';
        
        yoyo.style.position = 'fixed';
        yoyo.style.top = `${absoluteYoyoTop}px`;
        yoyo.style.left = `${absoluteYoyoLeft}px`;
        yoyo.style.width = `${originalWidth}px`;
        yoyo.style.height = `${originalHeight}px`;
        yoyo.style.margin = '0';
        yoyo.style.zIndex = '1001';

        console.log('Posición fixed aplicada:', {
            left: absoluteYoyoLeft,
            top: absoluteYoyoTop,
            width: originalWidth,
            height: originalHeight
        });

        // 4. Forzar reflow antes de la animación
        yoyo.offsetHeight;

        // 5. Animación de CAÍDA desde posición corregida
        setTimeout(() => {
            yoyo.style.transition = 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)';
            // Restaurar transform original si existía y añadir animación
            const transformParts = currentTransform ? [currentTransform] : [];
            transformParts.push(`translateY(calc(100vh - ${absoluteYoyoTop}px))`, 'rotate(1080deg)', 'scale(0.8)');
            yoyo.style.transform = transformParts.join(' ');
        }, 10);

        // 6. Crear transición circular
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
        // Primero remover todos los estilos temporales
        yoyo.style.cssText = '';
        
        // Luego restaurar estilos originales uno por uno
        Object.keys(originalStyle).forEach(property => {
            if (originalStyle[property] !== undefined && originalStyle[property] !== '') {
                yoyo.style[property] = originalStyle[property];
            }
        });
        
        // Asegurar que estos estilos estén limpios
        yoyo.style.zIndex = '';
        yoyo.style.opacity = '1';
        yoyo.style.width = '';
        yoyo.style.height = '';
        
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
