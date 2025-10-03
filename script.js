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

    // 2. Calcular posición y aplicar corrección manual
    const yoyoRect = yoyo.getBoundingClientRect();
    
    const absoluteYoyoLeft = yoyoRect.left + window.pageXOffset;
    const absoluteYoyoTop = yoyoRect.top + window.pageYOffset;
    
    // CORRECCIÓN MANUAL - ajusta estos valores según cuánto se desplaza
    const correctionPixels = 500; // Prueba con 100, 120, 150, etc.
    const correctedLeft = absoluteYoyoLeft - correctionPixels;
    
    console.log('Corrección aplicada:', {
        originalLeft: absoluteYoyoLeft,
        correctedLeft: correctedLeft,
        pixelsRestados: correctionPixels
    });

    // Aplicar posición fixed CON CORRECCIÓN
    yoyo.style.position = 'fixed';
    yoyo.style.top = `${absoluteYoyoTop}px`;
    yoyo.style.left = `${correctedLeft}px`; // ← Usamos la posición corregida
    yoyo.style.margin = '0';
    yoyo.style.zIndex = '1001';

    // El resto del código se mantiene igual...
    setTimeout(() => {
        yoyo.style.transition = 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)';
        yoyo.style.transform = `translateY(calc(100vh - ${absoluteYoyoTop}px)) rotate(1080deg) scale(0.8)`;
    }, 10);

    setTimeout(() => {
        this.createCircularTransition(targetSection, yoyo, originalStyle);
    }, 650);
}
