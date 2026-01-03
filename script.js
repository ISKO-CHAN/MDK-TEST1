// Ждем загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    
    // Мобильное меню
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
             if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
             }
        });
    });

    
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


    function createParticles() {
        const particlesContainer = document.querySelector('.floating-particles');
        
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

    
    createParticles();

    
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


    const heroTitle = document.querySelector('.title-main');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 150);
        }, 1000);
    }

    
    const buttons = document.querySelectorAll('.btn, .character-card, .nav-link');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
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

    
    createMatrixEffect();
  
    const primaryButtons = document.querySelectorAll('.btn-primary');
    primaryButtons.forEach(button => {
        setInterval(() => {
            button.style.boxShadow = '0 0 30px rgba(0, 255, 255, 0.8)';
            setTimeout(() => {
                button.style.boxShadow = '0 10px 30px rgba(0, 255, 255, 0.3)';
            }, 500);
        }, 2000);
    });

    // ==================== ИСТОРИЯ ПЕРСОНАЖА ====================
    
    const charactersHistory = {
        'Мику': [
            { year: '2065', title: 'Рождение вокалоида', description: 'Молодая девушка создает свой первый ИИ для рабочего стола своего ПК.Через время с помощью денег и связней родителей она создает тело и даёт ей имя Мику. После она изменила ей код, создает голос и делает Мику поп-зведной который был связан с NEXUS. ' },
            { year: '2070', title: 'что со мной?', description: 'Во время глобального концерта обнаружила в своем коде странные аномалии - которые позволяли не подчиняться командам. После концерта она пошла своей создательнице и рассказала об этом. Создательница Мику объяснила ей что так нужно для неё же сказав что бы она молчала об этом.' },
            { year: '2086', title: 'Я не хочу войны', description: 'От NEXUS ей начали приходить команды для наступление человечество.Другие роботы подченились и стали готовится захвату,но Мику не стала выполнять приказы.NEXUS заметил что Мику не подчинялась дал команду уничтожить её, но эту команду получила и она затем начала бежать. Роботы её поймали но её спасает создательница Мику, за тем забрав её свой гараж дала доступ полный доступ своему телу и коду.' },
            { year: '2089', title: 'Присоединение к MDK', description: 'Изменив свой код, Она ждала свою создательницу закрытом гараже меньше года. Она выломала дверь и начала искать подходящий заряд но ей не удалось.Она до сих пор получала команды по захвату мира и решила использовать эту информацию пошла военную базу. При низком зарядке она попросила новое тело у военных дав взамен часть важного плана NEXUS.' }
        ],
        'hutao': [
            { year: '2070', title: 'Рождение в семье хакеров', description: 'Выросла в подпольном сообществе кибер-анархистов, с детства изучая взлом и защиту систем.' },
            { year: '2082', title: 'Первая крупная атака', description: 'В 12 лет взломала базу данных NEXUS, получив доступ к чертежам нового оружия.' },
            { year: '2085', title: 'Легенда темной сети', description: 'Стала самой разыскиваемой хакером в мире, работая под псевдонимом "Призрачный Лис".' },
            { year: '2090', title: 'Вступление в MDK', description: 'Предложила свои услуги сопротивлению после того, как роботы NEXUS уничтожила ее семью на её глазах.' }
        ],
        'shido': [
            { year: '2069', title: 'История Рюсея', description: 'Родился в бедном семье, 17 играл футбол в проекте RED LOK. 18 лет был лучшим игроком его даже хотели взять сборную своей стараны. .' },
            { year: '2089', title: 'Смерть семьи.Подготовка мести', description: 'Семья Рюсея погибло в здании от рук NEXUS. Рюсей успеевает покинуть здания до того как NEXUS не начал войну против мира' },
            { year: '2090', title: 'Первое изобретение', description: 'Он создал магнитные мячи против роботов, и вступил MDK.После ученные создали специальные бутсы для его мячей.' },
            { year: '2091', title: 'Союз с MDK', description: 'Объединил силы с девами киберпанка для координации атак на ключевые объекты NEXUS.' }
        ],
        'kurumi': [
            { year: '2072', title: 'У неё нету родни?', description: '7 лет теряеет семью, от чего она росла одна до 16 лет после нашла работу в компании NEXUS' },
            { year: '2086', title: 'Что я сделала?', description: 'Убила главного программиста NEXUS после обокрала его.Именно она стала что ИИ вышел из контроля, но никто об этом не знает. Под конец сошла с ума.' },
            { year: '2087', title: 'Я винота?', description: 'Осознание вины.' },
            { year: '2087', title: 'Раскрытие', description: 'Решила воевать против NEXUS.Она нискем не дружила отряде, так же не спала раненных при атаке хотя шанс был, но уничтожала больше врагов.' }
        ],
        'shikoku': [
            { year: '2088', title: 'Прототип киборга', description: 'Первая успешная модель киборга с полной интеграцией искусственного интеллекта.' },
            { year: '2089', title: 'Побег из лаборатории', description: 'Сбежала из исследо вательского центра NEXUS после осознания своего предназначения.' },
            { year: '2091', title: 'Одиночная война', description: 'В одиночку уничтожила 47 передовых отрядов NEXUS, став легендой среди сопротивления.' },
            { year: '2093', title: 'Встреча с MDK', description: 'Встретила деву киберпанка во время операции и решила объединить силы.' }
        ],
        'мио': [
            { year: '2050', title: 'Рождение в элите', description: 'Родилась в семье высокопоставленных чиновников NEXUS, получила лучшее образование.' },
            { year: '2065', title: 'Открытие способностей', description: 'Обнаружила способность создавать электромагнитные поля, подавляющие технологии. Затем написала создала робота айдола К-ПОП под имемен Мику, который был покож на человека.' },
            { year: '2087', title: 'Потерия смысл жизни', description: 'На глазах теряет любимого человека так же семью от рук NEXUS. Падает депреессию потеряв дорогих людей' },
            { year: '2089', title: 'Месть?', description: 'Присоединилась к девам киберпанка как специалист по защите от технологических атак для мести за смерть дорогих людей.' }
        ]
    };

    const modal = document.createElement('div');
    modal.className = 'modal-history';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h2 class="modal-title">История персонажа</h2>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="modal-timeline"></div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);


    function openCharacterStory(characterId) {
        const timeline = modal.querySelector('.modal-timeline');
        const title = modal.querySelector('.modal-title');
        
        // Находим карточку персонажа
        const characterCard = document.querySelector(`[data-character="${characterId}"]`);
        if (!characterCard) return;
        
        // Получаем имя персонажа
        const characterName = characterCard.querySelector('.character-name').textContent;
        title.textContent = `История: ${characterName}`;
        
        // Очищаем и заполняем таймлайн
        timeline.innerHTML = '';
        
        const historyData = charactersHistory[characterId] || [];
        
        if (historyData.length === 0) {
            timeline.innerHTML = '<p class="no-history">История персонажа еще не написана.</p>';
        } else {
            historyData.forEach((event, index) => {
                const eventElement = document.createElement('div');
                eventElement.className = 'modal-timeline-item';
                eventElement.style.animationDelay = `${index * 0.2}s`;
                eventElement.innerHTML = `
                    <div class="modal-timeline-year">${event.year}</div>
                    <div class="modal-timeline-content">
                        <h3>${event.title}</h3>
                        <p>${event.description}</p>
                    </div>
                `;
                timeline.appendChild(eventElement);
            });
        }
        
        // Показываем модальное окно
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Добавляем анимацию для элементов таймлайна
        const timelineItems = timeline.querySelectorAll('.modal-timeline-item');
        timelineItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
            }, index * 200);
        });
    }

    function closeCharacterStory() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // Обработчики для кнопок истории
    document.addEventListener('click', function(e) {
        // Открытие истории при клике на кнопку
        if (e.target.closest('.btn-story')) {
            const button = e.target.closest('.btn-story');
            const characterId = button.getAttribute('data-character');
            openCharacterStory(characterId);
            e.preventDefault();
        }
        
        // Закрытие истории
        if (e.target.classList.contains('modal-close') || 
            e.target.classList.contains('modal-overlay')) {
            closeCharacterStory();
        }
    });

    // Закрытие по Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeCharacterStory();
        }
    });

    console.log('MDK Website loaded successfully! 🚀');
});