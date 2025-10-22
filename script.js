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
    new GalleryManager(); // ¡Esta línea es importante!
    
    document.querySelector('.apk-btn')?.addEventListener('click', () => {
        alert('¡Próximamente disponible para descarga!');
    });
});

// Botón de descarga
document.querySelector('.apk-btn')?.addEventListener('click', () => {
    alert('¡Próximamente disponible para descarga!');
});

class GalleryManager {
    constructor() {
        this.track = document.getElementById('galleryTrack');
        this.images = [];
        this.init();
    }

    init() {
        this.loadGalleryImages();
    }

    loadGalleryImages() {
        this.images = [
            'images/gallery/foto1.jpg',
            'images/gallery/foto2.jpg',
            'images/gallery/foto3.jpg',
            'images/gallery/foto4.jpg',
            'images/gallery/foto5.jpg',
            'images/gallery/foto6.jpg',
            'images/gallery/foto7.jpg',
            'images/gallery/foto8.jpg',
            'images/gallery/foto9.jpg',
            'images/gallery/foto10.jpg',
            'images/gallery/foto11.jpg',
            'images/gallery/foto12.jpg',
            'images/gallery/foto13.jpg',
            'images/gallery/foto14.jpg'
        ];

        if (this.images.length === 0) {
            this.showPlaceholder();
            return;
        }

        // Crear elementos de imagen
        this.images.forEach((imageSrc, index) => {
            const galleryItem = this.createGalleryItem(imageSrc, index);
            this.track.appendChild(galleryItem);
        });

        // Duplicar para efecto infinito
        this.duplicateImages();
    }

    createGalleryItem(imageSrc, index) {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        
        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = `Foto ${index + 1} de la comunidad Yoyo`;
        img.className = 'gallery-img';
        
        img.onerror = () => {
            this.showErrorImage(img);
        };
        
        galleryItem.appendChild(img);
        return galleryItem;
    }

    duplicateImages() {
        if (this.images.length > 0) {
            const originalItems = this.track.innerHTML;
            this.track.innerHTML += originalItems;
        }
    }

    showErrorImage(imgElement) {
        imgElement.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjI1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM4ODgiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkltYWdlbiBubyBlbmNvbnRyYWRhPC90ZXh0Pjwvc3ZnPg==';
    }

    showPlaceholder() {
        const placeholder = document.createElement('div');
        placeholder.className = 'gallery-placeholder';
        placeholder.innerHTML = `
            <div style="text-align: center; padding: 40px;">
                <div style="font-size: 48px; margin-bottom: 20px;">🖼️</div>
                <h3>Galería de la Comunidad</h3>
                <p>Próximamente fotos de nuestra comunidad</p>
            </div>
        `;
        this.track.appendChild(placeholder);
    }
}