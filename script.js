// En tu CSS añade:
.yoyo-wrapper {
    display: inline-block; /* o el display que uses */
}

// Y en el JavaScript:
animateYoyo(yoyo) {
    this.isAnimating = true;
    const targetSection = yoyo.getAttribute('data-target');
    
    // Crear un wrapper alrededor del yoyo si no existe
    let wrapper = yoyo.parentElement;
    if (!wrapper.classList.contains('yoyo-wrapper')) {
        wrapper = document.createElement('div');
        wrapper.className = 'yoyo-wrapper';
        yoyo.parentNode.insertBefore(wrapper, yoyo);
        wrapper.appendChild(yoyo);
    }
    
    const wrapperRect = wrapper.getBoundingClientRect();
    
    // Guardar estilos
    const originalStyles = {
        position: yoyo.style.position,
        left: yoyo.style.left,
        top: yoyo.style.top,
        margin: yoyo.style.margin,
        transform: yoyo.style.transform,
        transition: yoyo.style.transition
    };
    
    // Usar la posición del WRAPPER, no del yoyo
    yoyo.style.position = 'fixed';
    yoyo.style.left = `${wrapperRect.left + window.scrollX}px`;
    yoyo.style.top = `${wrapperRect.top + window.scrollY}px`;
    yoyo.style.margin = '0';
    yoyo.style.transform = 'none';
    
    // Resto de la animación igual...
}
