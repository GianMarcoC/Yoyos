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
        margin: yoyo.style.margin,
        zIndex: yoyo.style.zIndex,
        opacity: yoyo.style.opacity
    };

    // 2. Obtener posición relativa al viewport (sin scroll)
    const yoyoRect = yoyo.getBoundingClientRect();

    // Aplicar position: fixed usando las coordenadas respecto al viewport
    yoyo.style.position = 'fixed';
    yoyo.style.top = `${yoyoRect.top}px`;
    yoyo.style.left = `${yoyoRect.left}px`;
    yoyo.style.margin = '0';
    yoyo.style.zIndex = '1001';

    // 3. Pequeño delay para aplicar transición y animación
    setTimeout(() => {
        yoyo.style.transition = 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)';
        // El translateY mueve desde la posición actual (top) hasta el fondo de la ventana
        yoyo.style.transform = `translateY(calc(100vh - ${yoyoRect.top}px)) rotate(1080deg) scale(0.8)`;
    }, 10);

    // 4. Luego ejecutamos la transición circular y resto del flujo
    setTimeout(() => {
        this.createCircularTransition(targetSection, yoyo, originalStyle);
    }, 650);
}
