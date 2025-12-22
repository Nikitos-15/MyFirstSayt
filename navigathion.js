 const video = document.getElementById('kateVideo');

  function playVideo() {
    if (video) {
        video.play();
    }
}

    function pauseVideo() {
    if (video) {
        video.pause();
    }
}

function getVideo() {
    return document.getElementById('kateVideo');
}
function restartVideo() {
    const video = getVideo();
    if (video) {
        video.currentTime = 0;
        video.play();
    }
}
function skipBackward() {
    const video = getVideo();
    if (video) {
        video.currentTime = Math.max(0, video.currentTime - 5);
    } else {
        console.error("Видео элемент не найден");
    }
}

function skipForward() {
    const video = getVideo();
    if (video) {
        video.currentTime = Math.min(video.duration, video.currentTime + 5);
    } else {
        console.error("Видео элемент не найден");
    }
}


const feedbackForm = document.getElementById('feedbackForm');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(event) {
            
            event.preventDefault();
        
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !message) {
                alert('Пожалуйста, заполните все обязательные поля!');
                return;
            }
            
           
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                alert('Пожалуйста, введите корректный email адрес!');
                return;
            }
         
            alert('Спасибо за ваше сообщение, ' + name + '!\nМы свяжемся с вами в ближайшее время по адресу: ' + email);
            
            feedbackForm.reset();
            
            const successMessage = document.createElement('div');
            successMessage.className = 'form-success show';
            successMessage.innerHTML = `
                <h3>Сообщение отправлено!</h3>
                <p>Спасибо, ${name}! Мы получили ваше сообщение и свяжемся с вами в течение 24 часов.</p>
            `;
            
            feedbackForm.parentNode.insertBefore(successMessage, feedbackForm.nextSibling);
            
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        });
    } else {
        console.log('forma dont search');
    }


document.getElementById(`main`);
document.getElementsByClassName(`container`);
document.getElementsByTagName(`a`);
