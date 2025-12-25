// Улучшенное управление видео
document.addEventListener('DOMContentLoaded', function() {
    // Получаем элементы
    const kateVideo = document.getElementById('kateVideo');
    const progressBar = document.getElementById('progressBar');
    const progressTime = document.getElementById('progressTime');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const restartBtn = document.getElementById('restartBtn');
    const skipBackBtn = document.getElementById('skipBackBtn');
    const skipForwardBtn = document.getElementById('skipForwardBtn');
    const muteBtn = document.getElementById('muteBtn');
    const volumeBar = document.getElementById('volumeBar');
    const volumeIcon = document.getElementById('volumeIcon');
    const speedBtn = document.getElementById('speedBtn');
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    const durationValue = document.getElementById('durationValue');
    const speedOptions = document.querySelectorAll('.speed-options button');
    
    // Функции управления видео
    function togglePlay() {
        if (!kateVideo) return;
        
        if (kateVideo.paused) {
            kateVideo.play();
            playPauseBtn.innerHTML = '<span class="btn-icon">⏸</span><span class="btn-text">Пауза</span>';
        } else {
            kateVideo.pause();
            playPauseBtn.innerHTML = '<span class="btn-icon">▶</span><span class="btn-text">Воспроизвести</span>';
        }
    }
    
    function restartVideo() {
        if (!kateVideo) return;
        
        kateVideo.currentTime = 0;
        kateVideo.play();
        playPauseBtn.innerHTML = '<span class="btn-icon">⏸</span><span class="btn-text">Пауза</span>';
    }
    
    function skipBackward() {
        if (!kateVideo) return;
        
        kateVideo.currentTime = Math.max(0, kateVideo.currentTime - 10);
    }
    
    function skipForward() {
        if (!kateVideo) return;
        
        kateVideo.currentTime = Math.min(kateVideo.duration, kateVideo.currentTime + 10);
    }
    
    function toggleMute() {
        if (!kateVideo) return;
        
        kateVideo.muted = !kateVideo.muted;
        updateVolumeIcon();
        volumeBar.value = kateVideo.muted ? 0 : kateVideo.volume * 100;
    }
    
    function updateVolumeIcon() {
        if (!kateVideo) return;
        
        if (kateVideo.muted || kateVideo.volume === 0) {
            volumeIcon.textContent = '🔇';
        } else if (kateVideo.volume > 0.5) {
            volumeIcon.textContent = '🔊';
        } else {
            volumeIcon.textContent = '🔉';
        }
    }
    
    function setSpeed(speedValue) {
        if (!kateVideo) return;
        
        kateVideo.playbackRate = speedValue;
        speedBtn.innerHTML = `<span class="btn-text">Скорость: ${speedValue}x</span>`;
        
        // Убираем active у всех кнопок
        speedOptions.forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Добавляем active текущей кнопке
        const activeBtn = Array.from(speedOptions).find(btn => 
            parseFloat(btn.getAttribute('data-speed')) === speedValue
        );
        if (activeBtn) {
            activeBtn.classList.add('active');
        }
    }
    
    function toggleFullscreen() {
        const videoContainer = document.querySelector('.video_car');
        if (!videoContainer) return;
        
        if (!document.fullscreenElement) {
            videoContainer.requestFullscreen().catch(err => {
                console.log(`Ошибка при переходе в полноэкранный режим: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    }
    
    // Обновление прогресса видео
    function updateProgress() {
        if (!kateVideo || !progressBar) return;
        
        const value = (100 / kateVideo.duration) * kateVideo.currentTime;
        progressBar.value = value;
        
        // Форматирование времени
        const currentTime = formatTime(kateVideo.currentTime);
        const duration = formatTime(kateVideo.duration);
        if (progressTime) {
            progressTime.textContent = `${currentTime} / ${duration}`;
        }
    }
    
    // Форматирование времени в MM:SS
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
    
    // Назначаем обработчики кнопок
    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', togglePlay);
    }
    
    if (restartBtn) {
        restartBtn.addEventListener('click', restartVideo);
    }
    
    if (skipBackBtn) {
        skipBackBtn.addEventListener('click', skipBackward);
    }
    
    if (skipForwardBtn) {
        skipForwardBtn.addEventListener('click', skipForward);
    }
    
    if (muteBtn) {
        muteBtn.addEventListener('click', toggleMute);
    }
    
    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', toggleFullscreen);
    }
    
    // Обработчики для кнопок скорости
    speedOptions.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation(); // Останавливаем всплытие, чтобы меню не закрылось
            const speedValue = parseFloat(this.getAttribute('data-speed'));
            setSpeed(speedValue);
        });
    });
    
    // Инициализация видео
    if (kateVideo) {
        // Устанавливаем обработчики событий видео
        kateVideo.addEventListener('timeupdate', updateProgress);
        
        kateVideo.addEventListener('loadedmetadata', function() {
            if (durationValue) {
                durationValue.textContent = formatTime(kateVideo.duration);
            }
            updateProgress(); // Обновляем прогресс после загрузки метаданных
        });
        
        // Прогресс бар
        if (progressBar) {
            progressBar.addEventListener('input', function() {
                kateVideo.currentTime = (progressBar.value * kateVideo.duration) / 100;
            });
            
            progressBar.addEventListener('mousedown', function() {
                kateVideo.pause();
            });
            
            progressBar.addEventListener('mouseup', function() {
                kateVideo.play();
            });
        }
        
        // Громкость
        if (volumeBar) {
            volumeBar.addEventListener('input', function() {
                kateVideo.volume = volumeBar.value / 100;
                kateVideo.muted = volumeBar.value == 0;
                updateVolumeIcon();
            });
            
            // Инициализируем иконку громкости
            updateVolumeIcon();
        }
        
        // События видео
        kateVideo.addEventListener('play', function() {
            if (playPauseBtn) {
                playPauseBtn.innerHTML = '<span class="btn-icon">⏸</span><span class="btn-text">Пауза</span>';
            }
            // Добавляем класс для постоянного отображения панели управления
            const videoContainer = document.querySelector('.video_car');
            if (videoContainer) {
                videoContainer.classList.add('video-playing');
            }
        });
        
        kateVideo.addEventListener('pause', function() {
            if (playPauseBtn) {
                playPauseBtn.innerHTML = '<span class="btn-icon">▶</span><span class="btn-text">Воспроизвести</span>';
            }
            // Убираем класс для скрытия панели управления при паузе
            const videoContainer = document.querySelector('.video_car');
            if (videoContainer) {
                videoContainer.classList.remove('video-playing');
            }
        });
        
        kateVideo.addEventListener('ended', function() {
            if (playPauseBtn) {
                playPauseBtn.innerHTML = '<span class="btn-icon">🔄</span><span class="btn-text">Заново</span>';
            }
        });
        
        kateVideo.addEventListener('volumechange', updateVolumeIcon);
        
        // Полноэкранный режим
        document.addEventListener('fullscreenchange', function() {
            if (fullscreenBtn) {
                if (document.fullscreenElement) {
                    fullscreenBtn.innerHTML = '<span class="btn-icon">⛶</span><span class="btn-text">Выйти</span>';
                } else {
                    fullscreenBtn.innerHTML = '<span class="btn-icon">⛶</span><span class="btn-text">Полный экран</span>';
                }
            }
        });
        
        // Клавиши управления
        document.addEventListener('keydown', function(e) {
            if (document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
                switch(e.key) {
                    case ' ':
                    case 'Spacebar':
                        e.preventDefault();
                        togglePlay();
                        break;
                    case 'ArrowLeft':
                        e.preventDefault();
                        skipBackward();
                        break;
                    case 'ArrowRight':
                        e.preventDefault();
                        skipForward();
                        break;
                    case 'f':
                    case 'F':
                        e.preventDefault();
                        toggleFullscreen();
                        break;
                    case 'm':
                    case 'M':
                        e.preventDefault();
                        toggleMute();
                        break;
                    case '0':
                    case 'Home':
                        e.preventDefault();
                        restartVideo();
                        break;
                    case 'r':
                    case 'R':
                        e.preventDefault();
                        restartVideo();
                        break;
                }
            }
        });
        
        // Автоплей при клике на видео
        kateVideo.addEventListener('click', function() {
            togglePlay();
        });
    }
    
    // Управление меню выбора скорости
    const speedControl = document.querySelector('.speed-control');
    if (speedControl) {
        speedControl.addEventListener('mouseenter', function() {
            const speedOptions = this.querySelector('.speed-options');
            if (speedOptions) {
                speedOptions.style.display = 'block';
            }
        });
        
        speedControl.addEventListener('mouseleave', function() {
            const speedOptions = this.querySelector('.speed-options');
            if (speedOptions) {
                // Небольшая задержка, чтобы можно было нажать кнопку
                setTimeout(() => {
                    if (!speedControl.matches(':hover')) {
                        speedOptions.style.display = 'none';
                    }
                }, 300);
            }
        });
    }
    
    // Обработка формы обратной связи (оставляем как было)
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
                if (successMessage.parentNode) {
                    successMessage.remove();
                }
            }, 5000);
        });
    } else {
        console.log('Форма не найдена');
    }
});