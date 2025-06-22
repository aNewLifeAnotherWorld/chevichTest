document.addEventListener('DOMContentLoaded', () => {
    // Lazy Loading для изображений
    const images = document.querySelectorAll('img[loading="lazy"]');
    const lazyObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.src = entry.target.getAttribute('data-src');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    images.forEach(img => {
        img.setAttribute('data-src', img.src);
        img.removeAttribute('src');
        lazyObserver.observe(img);
    });

    // Lazy Loading и анимации для секций
    const sections = document.querySelectorAll('.hero, .providers, .pricing, .compare, .reviews, .faq, .contacts');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                sectionObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Плавный скролл с Locomotive Scroll
    const scroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true,
        inertia: 0.8,
        multiplier: 0.7,
        getDirection: true
    });
    scroll.on('scroll', (instance) => {
        // Параллакс для .hero__form
        document.querySelectorAll('.hero__form').forEach(el => {
            el.style.transform = `translateY(${instance.scroll.y * 0.2}px)`;
        });
    });

    // Анимации с GSAP и ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    sections.forEach(section => {
        gsap.from(section, {
            opacity: 0,
            y: 50,
            scale: 0.95,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Sticky меню
    gsap.to('.menu', {
        scrollTrigger: {
            trigger: '.menu',
            start: 'top top',
            end: 'bottom top',
            toggleClass: 'sticky',
            pin: true
        }
    });

    // Логика для счетчиков
    document.querySelectorAll('.counter__plus').forEach(button => {
        button.addEventListener('click', () => {
            const counterValue = button.parentElement.querySelector('.counter__value');
            let value = parseInt(counterValue.textContent);
            counterValue.textContent = value + 1;
        });
    });

    document.querySelectorAll('.counter__minus').forEach(button => {
        button.addEventListener('click', () => {
            const counterValue = button.parentElement.querySelector('.counter__value');
            let value = parseInt(counterValue.textContent);
            if (value > 0) {
                counterValue.textContent = value - 1;
            }
        });
    });

    // Модальное окно
    const modal = document.getElementById("modal");
    const btn = document.querySelector(".pricing-card__button:nth-child(1)");
    const span = document.getElementsByClassName("close")[0];
    btn.onclick = function() {
        modal.style.display = "block";
    }
    span.onclick = function() {
        modal.style.display = "none";
    }
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // Прокрутка вверх
const scrollTopButton = document.querySelector('.scroll-to-top');
scrollTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Показывать/скрывать стрелку при скролле
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopButton.style.opacity = '1';
        scrollTopButton.style.pointerEvents = 'auto';
    } else {
        scrollTopButton.style.opacity = '0';
        scrollTopButton.style.pointerEvents = 'none';
    }
});

});