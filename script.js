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
    }
    navigateToYoyo(yoyo) {
        const targetSection = yoyo.getAttribute('data-target');
        if (targetSection) {
            this.showSection(targetSection);
        }
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