class YoyoNavigator {
    constructor() {
        this.yoyos = document.querySelectorAll('.yoyo');
        this.sections = document.querySelectorAll('.section');
        this.init();
    }

    init() {
        this.yoyos.forEach(yoyo => {
            yoyo.addEventListener('click', (e) => {
                this.navigateToYoyo(e.target);
            });
        });

        this.setupCtaButtons();
        
        // Mostrar sección inicial por defecto
        this.showSection('inicio');
    }

    navigateToYoyo(yoyo) {
        const targetSection = yoyo.getAttribute('data-target');
        if (targetSection) {
            this.showSection(targetSection);
            
            // Scroll suave al principio de la página
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }

    showSection(sectionId) {
    // Ocultar todas las secciones
    this.sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Mostrar sección objetivo
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        
        // Scroll al principio después de un pequeño delay
        setTimeout(() => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }, 100);
    }
}

    setupCtaButtons() {
        document.querySelectorAll('.cta-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const targetSection = e.target.getAttribute('data-target');
                if (targetSection) {
                    this.showSection(targetSection);
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
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