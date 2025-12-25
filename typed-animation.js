// Анимация текста с Typed.js
document.addEventListener('DOMContentLoaded', function() {
    // 1. Анимация заголовка
    const typedHeader = new Typed('#typed-header h2', {
        strings: [
            '"Сталинский орган" — так немцы называли Катюшу',
            'Оружие возмездия: 16 снарядов за 10 секунд',
            'Голос Победы: рев Катюши вселял ужас в фашистов'
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        startDelay: 1000,
        loop: true,
        showCursor: true,
        cursorChar: '|',
        contentType: 'html'
    });
    
    // 2. Анимация фактов в блоке
    const typedFacts = new Typed('#typed-facts', {
        strings: [
            '^1000Первая батарея Катюш состояла всего из 7 установок...^2000',
            '^1000Немцы называли её "Stalinorgel" (Орган Сталина) за характерный звук залпа...^2000',
            '^1000За один залп Катюша покрывала площадь в 10 футбольных полей...^2000',
            '^1000Гитлер объявил награду за поимку любой установки БМ-13...^2000',
            '^1000Секретность была такова, что даже солдаты не знали полного названия оружия...^2000'
        ],
        typeSpeed: 40,
        backSpeed: 20,
        backDelay: 3000,
        startDelay: 500,
        loop: true,
        showCursor: true,
        cursorChar: '▌',
        contentType: 'html'
    });
    
    // 3. Добавим анимацию для некоторых статистических данных в таблице
    const statsElements = document.querySelectorAll('.comparison-table td:nth-child(2)');
    statsElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.8s ease ' + (index * 0.1) + 's';
        
        // Анимация при прокрутке
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(element);
    });
    
    // 4. Анимация для заголовка страницы
    const mainTitle = document.querySelector('.content_block h1');
    if (mainTitle) {
        mainTitle.style.opacity = '0';
        mainTitle.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            mainTitle.style.transition = 'all 1s ease';
            mainTitle.style.opacity = '1';
            mainTitle.style.transform = 'translateY(0)';
        }, 500);
    }
    
    // 5. Анимация для кнопок управления видео
    const videoButtons = document.querySelectorAll('.control-btn');
    videoButtons.forEach((btn, index) => {
        btn.style.opacity = '0';
        btn.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            btn.style.transition = 'all 0.5s ease ' + (index * 0.1) + 's';
            btn.style.opacity = '1';
            btn.style.transform = 'scale(1)';
        }, 1000);
    });
});

// 6. Инициализация частиц Particles.js
if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#ffffff" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#ffffff",
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: true,
                straight: false,
                out_mode: "out",
                bounce: false
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: true, mode: "repulse" },
                onclick: { enable: true, mode: "push" }
            }
        },
        retina_detect: true
    });
}