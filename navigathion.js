// Функции для управления видео
function playVideo() {
    const video = document.getElementById('kateVideo');
    if (video) {
        video.play();
    }
}

function pauseVideo() {
    const video = document.getElementById('kateVideo');
    if (video) {
        video.pause();
    }
}

function restartVideo() {
    const video = document.getElementById('kateVideo');
    if (video) {
        video.currentTime = 0;
        video.play();
    }
}

function skipBackward() {
    const video = document.getElementById('kateVideo');
    if (video) {
        video.currentTime = Math.max(0, video.currentTime - 10);
    }
}

function skipForward() {
    const video = document.getElementById('kateVideo');
    if (video) {
        video.currentTime = Math.min(video.duration, video.currentTime + 10);
    }
}


function initFeedbackForm() {
    const feedbackForm = document.getElementById('feedbackForm');
    
    if (feedbackForm) {
        console.log('Форма обратной связи найдена');
        
        feedbackForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Валидация полей
            if (!name || !email || !message) {
                alert('Пожалуйста, заполните все обязательные поля!');
                return;
            }
            
            // Валидация email
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                alert('Пожалуйста, введите корректный email адрес!');
                return;
            }
            
            // Сообщение об успехе
            alert(`Спасибо за ваше сообщение, ${name}!\nМы свяжемся с вами в ближайшее время по адресу: ${email}`);
            
            // Сброс формы
            feedbackForm.reset();
            
            // Создание элемента с сообщением об успехе
            const successMessage = document.createElement('div');
            successMessage.className = 'form-success';
            successMessage.innerHTML = `
                <h3>Сообщение отправлено!</h3>
                <p>Спасибо, ${name}! Мы получили ваше сообщение и свяжемся с вами в течение 24 часов.</p>
            `;
            
            feedbackForm.parentNode.insertBefore(successMessage, feedbackForm.nextSibling);
            
            // Плавное появление
            setTimeout(() => {
                successMessage.classList.add('show');
            }, 10);
            
            // Удаление сообщения через 5 секунд
            setTimeout(() => {
                successMessage.classList.remove('show');
                setTimeout(() => {
                    if (successMessage.parentNode) {
                        successMessage.parentNode.removeChild(successMessage);
                    }
                }, 300);
            }, 5000);
        });
    } else {
        console.log('Форма обратной связи не найдена на этой странице');
    }
}

// Функция для мобильного меню
function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileNav = document.getElementById('mobileNav');
    
    if (mobileMenuToggle && mobileNav) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileNav.classList.toggle('active');
            this.classList.toggle('active');
        });
        
        // Закрытие меню при клике на ссылку
        const mobileLinks = mobileNav.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileNav.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            });
        });
        
        // Закрытие меню при клике вне его
        document.addEventListener('click', function(event) {
            if (!mobileNav.contains(event.target) && 
                !mobileMenuToggle.contains(event.target) && 
                mobileNav.classList.contains('active')) {
                mobileNav.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        });
    }
}


function initAllScripts() {
    console.log('Инициализация скриптов...');
    
    // Инициализация формы обратной связи
    initFeedbackForm();
    
    initMobileMenu();
    
    
    const mainElement = document.getElementById('main');
    const containers = document.getElementsByClassName('container');
    const links = document.getElementsByTagName('a');
    
    console.log(`Найдено: main=${mainElement ? 'да' : 'нет'}, 
                containers=${containers.length}, 
                ссылок=${links.length}`);
}


if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllScripts);
} else {
    initAllScripts();
}

window.playVideo = playVideo;
window.pauseVideo = pauseVideo;
window.restartVideo = restartVideo;
window.skipBackward = skipBackward;
window.skipForward = skipForward;