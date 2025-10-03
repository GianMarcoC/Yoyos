animateYoyo(yoyo) {
    this.isAnimating = true;
    const targetSection = yoyo.getAttribute('data-target');

    const originalStyle = {
        transform: yoyo.style.transform,
        transition: yoyo.style.transition,
        position: yoyo.style.position,
        top: yoyo.style.top,
        left: yoyo.style.left,
        margin: yoyo.style.margin
    };

    const yoyoRect = yoyo.getBoundingClientRect();

    // Aquí corregimos para usar directamente las coordenadas relativas a viewport
    const fixedLeft = yoyoRect.left;
    const fixedTop = yoyoRect.top;

    yoyo.style.position = 'fixed';
    yoyo.style.top = `${fixedTop}px`;
    yoyo.style.left = `${fixedLeft}px`;
    yoyo.style.margin = '0';
    yoyo.style.zIndex = '1001';

    setTimeout(() => {
        yoyo.style.transition = 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)';
        yoyo.style.transform = `translateY(calc(100vh - ${fixedTop}px)) rotate(1080deg) scale(0.8)`;
    }, 10);

    setTimeout(() => {
        this.createCircularTransition(targetSection, yoyo, originalStyle);
    }, 650);
}
