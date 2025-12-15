// Ждем загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    
    // Мобильное меню
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    // Проверяем, что элементы существуют, чтобы избежать ошибок в консоли
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // ВАЖНО: УДАЛЕН КОД ПЛАВНОЙ ПРОКРУТКИ,
    // КОТОРЫЙ БЛОКИРОВАЛ ССЫЛКИ НА ДРУГИЕ СТРАНИЦЫ (глав сайт (2).html, персы.html и т.д.)
    
    // Закрываем мобильное меню после клика по ссылке
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
             if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
             }
        });
    });

    // Анимация при скролле
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Наблюдаем за элементами для анимации
    const animateElements = document.querySelectorAll('.timeline-item, .character-card, .download-content');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Параллакс эффект для hero секции
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.cyber-grid, .floating-particles');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });

        // Изменение прозрачности навбара
        const navbar = document.querySelector('.navbar');
        if (navbar) {
             if (scrolled > 100) {
                navbar.style.background = 'rgba(10, 10, 15, 0.98)';
            } else {
                navbar.style.background = 'rgba(10, 10, 15, 0.95)';
            }
        }
    });

    // Анимация статистик персонажей
    const characterCards = document.querySelectorAll('.character-card');
    
    characterCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const statFills = this.querySelectorAll('.stat-fill');
            statFills.forEach(fill => {
                const width = fill.style.width;
                fill.style.width = '0%';
                setTimeout(() => {
                    fill.style.width = width;
                }, 100);
            });
        });
    });

    // Создание дополнительных частиц
    function createParticles() {
        const particlesContainer = document.querySelector('.floating-particles');
        
        // Добавлена проверка на наличие контейнера, чтобы избежать ошибки "Cannot read properties of null (reading 'appendChild')"
        if (!particlesContainer) return; 

        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: #00ffff;
                border-radius: 50%;
                pointer-events: none;
                opacity: 0.7;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: particleFloat ${3 + Math.random() * 4}s ease-in-out infinite;
                animation-delay: ${Math.random() * 2}s;
            `;
            particlesContainer.appendChild(particle);
        }
    }

    // Добавляем CSS для анимации частиц
    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
        @keyframes particleFloat {
            0%, 100% { 
                transform: translateY(0px) translateX(0px);
                opacity: 0.7;
            }
            25% { 
                transform: translateY(-15px) translateX(5px);
                opacity: 1;
            }
            50% { 
                transform: translateY(-30px) translateX(-5px);
                opacity: 0.5;
            }
            75% { 
                transform: translateY(-15px) translateX(10px);
                opacity: 1;
            }
        }

        .animate-in {
            animation: slideInUp 0.8s ease-out forwards;
        }

        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(50px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .nav-menu.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background: rgba(10, 10, 15, 0.98);
            padding: 2rem;
            border-top: 1px solid rgba(0, 255, 255, 0.3);
        }

        .hamburger.active span:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }

        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }

        .hamburger.active span:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }

        @media (max-width: 768px) {
            .nav-menu {
                display: none;
            }
        }
    `;
    document.head.appendChild(particleStyle);

    // Создаем частицы
    createParticles();

    // Эффект печатающегося текста для заголовка
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Запускаем эффект печати для главного заголовка
    const heroTitle = document.querySelector('.title-main');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 150);
        }, 1000);
    }

    // Звуковые эффекты при наведении (имитация)
    const buttons = document.querySelectorAll('.btn, .character-card, .nav-link');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            // Добавляем визуальный эффект "звука"
            this.style.filter = 'brightness(1.2)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.filter = 'brightness(1)';
        });
    });

    // Эффект глитча для заголовков
    function glitchEffect(element) {
        const originalText = element.textContent;
        const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
        let glitchInterval;
        
        element.addEventListener('mouseenter', function() {
            let iterations = 0;
            
            glitchInterval = setInterval(() => {
                element.textContent = originalText
                    .split('')
                    .map((char, index) => {
                        if (index < iterations) {
                            return originalText[index];
                        }
                        return glitchChars[Math.floor(Math.random() * glitchChars.length)];
                    })
                    .join('');
                
                if (iterations >= originalText.length) {
                    clearInterval(glitchInterval);
                    element.textContent = originalText;
                }
                
                iterations += 1/3;
            }, 30);
        });
    }

    // Применяем глитч эффект к заголовкам персонажей
    const characterNames = document.querySelectorAll('.character-name');
    characterNames.forEach(name => {
        glitchEffect(name);
    });

    // Счетчик для статистик
    function animateCounter(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const current = Math.floor(progress * (end - start) + start);
            element.textContent = current + '%';
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // Анимация счетчиков при наведении на карточки персонажей
    characterCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const statFills = this.querySelectorAll('.stat-fill');
            statFills.forEach(fill => {
                const width = parseInt(fill.style.width);
                if (width) {
                    // Создаем временный элемент для отображения процентов
                    let counter = fill.parentElement.querySelector('.stat-counter');
                    if (!counter) {
                        counter = document.createElement('span');
                        counter.className = 'stat-counter';
                        counter.style.cssText = `
                            position: absolute;
                            right: 0;
                            top: 50%;
                            transform: translateY(-50%);
                            font-size: 0.8rem;
                            color: #00ffff;
                            font-weight: bold;
                        `;
                        fill.parentElement.style.position = 'relative';
                        fill.parentElement.appendChild(counter);
                    }
                    animateCounter(counter, 0, width, 1000);
                }
            });
        });
    });

    // Добавляем эффект матрицы в фон
    function createMatrixEffect() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            opacity: 0.1;
        `;
        
        // Проверяем, что body существует, чтобы избежать ошибки
        if (!document.body) return;
        document.body.appendChild(canvas);
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
        const matrixArray = matrix.split("");
        
        const fontSize = 10;
        const columns = canvas.width / fontSize;
        
        const drops = [];
        for (let x = 0; x < columns; x++) {
            drops[x] = 1;
        }
        
        function draw() {
            ctx.fillStyle = 'rgba(10, 10, 15, 0.04)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#00ffff';
            ctx.font = fontSize + 'px monospace';
            
            for (let i = 0; i < drops.length; i++) {
                const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }
        
        setInterval(draw, 35);
        
        window.addEventListener('resize', function() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    // Запускаем матрицу эффект
    createMatrixEffect();

    // Добавляем пульсацию для кнопок
    const primaryButtons = document.querySelectorAll('.btn-primary');
    primaryButtons.forEach(button => {
        setInterval(() => {
            button.style.boxShadow = '0 0 30px rgba(0, 255, 255, 0.8)';
            setTimeout(() => {
                button.style.boxShadow = '0 10px 30px rgba(0, 255, 255, 0.3)';
            }, 500);
        }, 2000);
    });

    console.log('MDK Website loaded successfully! 🚀');
});