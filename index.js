document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.nav-link');
            
    links.forEach((link, index) => {
        // Animación de entrada escalonada
        link.style.opacity = '0';
        link.style.transform = 'translateY(-20px)';
                
        setTimeout(() => {
            link.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            link.style.opacity = '1';
            link.style.transform = 'translateY(0)';
        }, index * 100);
    });

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({behavior: 'smooth', block: 'start'});
            }
        });
    });

    //funcionalidad dle slider
    const slider = document.getElementById('comparisonSlider');
    const overlay = document.getElementById('overlay');
    const handle = document.getElementById('sliderHandle');

    let isDragging = false;

    function updateSlider(x) {
        const sliderRect = slider.getBoundingClientRect();
        const position = Math.max(0, Math.min(x - sliderRect.left, sliderRect.width));
        const percentage = (position / sliderRect.width) * 100;

        overlay.style.width = percentage + '%';
        handle.style.left = percentage + '%';
    }

    handle.addEventListener('mousedown', () => {
        isDragging = true;
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            updateSlider(e.clientX);
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });

    slider.addEventListener('click', (e) => {
        updateSlider(e.clientX);
    });

    handle.addEventListener('touchstart', (e) => {  // AGREGADO
        isDragging = true;
        e.preventDefault();
    });

    document.addEventListener('touchmove', (e) => {
        if (isDragging) {
            updateSlider(e.touches[0].clientX);
        }
    });

    document.addEventListener('touchend', () => {
        isDragging = false;
    });

    // CAROUSEL FUNCTIONALITY
    let currentSlide = 0;
    const images = document.querySelectorAll('.carousel-img');
    const indicators = document.getElementById('carouselIndicators');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    // Crear indicadores
    images.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.classList.add('indicator');
        if (index === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => goToSlide(index));
        indicators.appendChild(indicator);
    });

    function updateCarousel() {
        images.forEach((img, index) => {
            img.classList.toggle('active', index === currentSlide);
        });

        const allIndicators = document.querySelectorAll('.indicator');
        allIndicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % images.length;
        updateCarousel();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + images.length) % images.length;
        updateCarousel();
    }

    function goToSlide(index) {
        currentSlide = index;
        updateCarousel();
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);

        // Auto-avanzar cada 5 segundos (opcional)
        // setInterval(nextSlide, 5000);
    }
});