const quizData = [
    {
        question: "¿Qué es un dato?",
        options: [
            "Un hecho o cifra que representa información",
            "Un conjunto de tablas",
            "Una relación entre entidades",
            "Un tipo de software"
        ],
        correct: 0
    },
    {
        question: "¿Para qué sirve una base de datos?",
        options: [
            "Almacenar y organizar datos",
            "Solo para dibujar diagramas",
            "Para crear imágenes",
            "Para programar aplicaciones"
        ],
        correct: 0
    },
    {
        question: "¿Qué representa una entidad en un diagrama ER?",
        options: [
            "Una característica de un dato",
            "Un objeto del mundo real",
            "Una conexión entre tablas",
            "Un tipo de consulta"
        ],
        correct: 1
    },
    {
        question: "¿Qué es un diagrama ER?",
        options: [
            "Un tipo de gráfico de barras",
            "Una representación visual de entidades y relaciones",
            "Un esquema de base de datos en texto",
            "Un programa de computadora"
        ],
        correct: 1
    },
    {
        question: "¿Qué es una clave primaria?",
        options: [
            "Un atributo que identifica de manera única cada fila en una tabla",
            "Un atributo que relaciona dos tablas",
            "Un tipo de dato en una base de datos",
            "Una consulta SQL"
        ],
        correct: 0
    },
    {
        question: "¿Qué es una clave foránea?",
        options: [
            "Un atributo que identifica de manera única cada fila en una tabla",
            "Un atributo que crea una relación entre dos tablas",
            "Un tipo de dato en una base de datos",
            "Una función matemática"
        ],
        correct: 1
    },
    {
        question: "¿Qué es una relación uno a muchos?",
        options: [
            "Una relación donde una instancia de una entidad A se relaciona con una única instancia de una entidad B",
            "Una relación donde una instancia de una entidad A se relaciona con múltiples instancias de una entidad B",
            "Una relación donde múltiples instancias de una entidad A se relacionan con múltiples instancias de una entidad B",
            "Una relación que no existe"
        ],
        correct: 1
    },
    {
        question: "¿Qué es una relación muchos a muchos?",
        options: [
            "Una relación donde una instancia de una entidad A se relaciona con una única instancia de una entidad B",
            "Una relación donde una instancia de una entidad A se relaciona con múltiples instancias de una entidad B",
            "Una relación donde múltiples instancias de una entidad A se relacionan con múltiples instancias de una entidad B",
            "Una relación simple"
        ],
        correct: 2
    },
    {
        question: "¿Qué es un atributo en un diagrama ER?",
        options: [
            "Una característica de una entidad",
            "Una relación entre dos entidades",
            "Un tipo de dato en una base de datos",
            "Un programa de software"
        ],
        correct: 0
    },
    {
        question: "¿Qué es la cardinalidad en un diagrama ER?",
        options: [
            "El número de entidades en una base de datos",
            "El número de relaciones entre entidades",
            "El número de instancias de una entidad que pueden estar asociadas con instancias de otra entidad",
            "El tamaño de la base de datos"
        ],
        correct: 2
    }
];

let currentQuestion = 0;
let userAnswers = [];
let quizStarted = false;

document.addEventListener('DOMContentLoaded', function () {
    initializeApp();
});

function initializeApp() {
    initScrollAnimations();

    setupNavigationEvents();

    if (document.getElementById('cuestionario') && document.getElementById('cuestionario').classList.contains('active')) {
        initQuiz();
    }
}

function setupNavigationEvents() {
    document.addEventListener('click', function (e) {
        const nav = document.querySelector('nav');
        const menuToggle = document.querySelector('.mobile-menu-toggle');

        if (nav && menuToggle && nav.classList.contains('active')) {
            if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
                nav.classList.remove('active');
            }
        }
    });

    document.addEventListener('keydown', function (e) {
        const cuestionarioPage = document.getElementById('cuestionario');
        if (!cuestionarioPage || !cuestionarioPage.classList.contains('active')) return;

        switch (e.key) {
            case 'ArrowLeft':
                if (currentQuestion > 0) {
                    previousQuestion();
                }
                break;
            case 'ArrowRight':
                if (userAnswers[currentQuestion] !== undefined) {
                    nextQuestion();
                }
                break;
            case '1':
            case '2':
            case '3':
            case '4':
                const optionIndex = parseInt(e.key) - 1;
                if (quizData[currentQuestion] && optionIndex < quizData[currentQuestion].options.length) {
                    selectAnswer(optionIndex);
                }
                break;
        }
    });
}

function showPage(pageId) {
    try {
        const pages = document.querySelectorAll('.page');
        pages.forEach(page => {
            page.classList.remove('active');
            page.classList.add('hidden');
        });

        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
            targetPage.classList.remove('hidden');
        }

        const nav = document.querySelector('nav');
        if (nav) {
            nav.classList.remove('active');
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });

        if (pageId === 'cuestionario') {
            setTimeout(() => {
                initQuiz();
            }, 100);
        }

        setTimeout(() => {
            initScrollAnimations();
        }, 200);

    } catch (error) {
        console.error('Error al cambiar de página:', error);
    }
}

function toggleMobileMenu() {
    const nav = document.querySelector('nav');
    if (nav) {
        nav.classList.toggle('active');
    }
}

function redirigir(id) {
    const urls = {
        1: "https://www.youtube.com/watch?v=4wo_wZWk_UM",
        2: "https://www.youtube.com/watch?v=6S8A-1jBD5Y",
        3: "https://boardmix.com/es/examples/er-diagram-examples/"
    };

    if (urls[id]) {
        window.open(urls[id], "_blank");
    }
}

function initQuiz() {
    if (quizStarted) return;

    currentQuestion = 0;
    userAnswers = [];
    quizStarted = true;

    const quizResults = document.getElementById('quiz-results');
    const quizContainer = document.getElementById('quiz-container');

    if (quizResults) {
        quizResults.classList.add('hidden');
    }
    if (quizContainer) {
        quizContainer.classList.remove('hidden');
    }

    loadQuestion();
    updateNavigationButtons();
}

function loadQuestion() {
    if (!quizData[currentQuestion]) return;

    const question = quizData[currentQuestion];
    const quizContent = document.getElementById('quiz-content');

    if (!quizContent) return;

    const questionHTML = `
                <div class="quiz-question">
                    <h3>Pregunta ${currentQuestion + 1} de ${quizData.length}</h3>
                    <p><strong>${question.question}</strong></p>
                    <div class="quiz-options">
                        ${question.options.map((option, index) => `
                            <label class="quiz-option" onclick="selectAnswer(${index})">
                                <input type="radio" name="q${currentQuestion}" value="${index}" class="mr-2">
                                <span>${option}</span>
                            </label>
                        `).join('')}
                    </div>
                </div>
            `;

    quizContent.innerHTML = questionHTML;

    if (userAnswers[currentQuestion] !== undefined) {
        const selectedOption = document.querySelector(`input[value="${userAnswers[currentQuestion]}"]`);
        if (selectedOption) {
            selectedOption.checked = true;
            const parentLabel = selectedOption.closest('.quiz-option');
            if (parentLabel) {
                parentLabel.classList.add('selected');
            }
        }
    }

    updateQuestionInfo();

    if (typeof gsap !== 'undefined') {
        gsap.fromTo('.quiz-question',
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
        );
    }
}

function selectAnswer(answerIndex) {
    userAnswers[currentQuestion] = answerIndex;

    const options = document.querySelectorAll('.quiz-option');
    options.forEach(option => option.classList.remove('selected'));

    const selectedOption = document.querySelector(`input[value="${answerIndex}"]`);
    if (selectedOption) {
        selectedOption.checked = true;
        const parentLabel = selectedOption.closest('.quiz-option');
        if (parentLabel) {
            parentLabel.classList.add('selected');
        }
    }

    updateNavigationButtons();

    if (typeof gsap !== 'undefined') {
        const selectedLabel = document.querySelector(`input[value="${answerIndex}"]`).closest('.quiz-option');
        gsap.to(selectedLabel, {
            scale: 1.02,
            duration: 0.2,
            yoyo: true,
            repeat: 1,
            ease: "power2.inOut"
        });
    }
}

function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
        updateNavigationButtons();
    }
}

function nextQuestion() {
    if (currentQuestion < quizData.length - 1) {
        currentQuestion++;
        loadQuestion();
        updateNavigationButtons();
    } else {
        finishQuiz();
    }
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (prevBtn) {
        prevBtn.disabled = currentQuestion === 0;
        if (currentQuestion === 0) {
            prevBtn.classList.add('opacity-50', 'cursor-not-allowed');
        } else {
            prevBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        }
    }

    if (nextBtn) {
        const hasAnswer = userAnswers[currentQuestion] !== undefined;
        nextBtn.disabled = !hasAnswer;

        if (!hasAnswer) {
            nextBtn.classList.add('opacity-50', 'cursor-not-allowed');
        } else {
            nextBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        }

        if (currentQuestion === quizData.length - 1) {
            nextBtn.textContent = 'Finalizar';
            nextBtn.classList.remove('bg-blue-600', 'hover:bg-blue-700');
            nextBtn.classList.add('bg-green-600', 'hover:bg-green-700');
        } else {
            nextBtn.textContent = 'Siguiente';
            nextBtn.classList.remove('bg-green-600', 'hover:bg-green-700');
            nextBtn.classList.add('bg-blue-600', 'hover:bg-blue-700');
        }
    }
}

function updateQuestionInfo() {
    const questionInfo = document.getElementById('questionInfo');
    if (questionInfo) {
        questionInfo.textContent = `Pregunta ${currentQuestion + 1} de ${quizData.length}`;
    }
}

function finishQuiz() {
    let score = 0;
    const results = [];

    for (let i = 0; i < quizData.length; i++) {
        const question = quizData[i];
        const userAnswer = userAnswers[i];
        const isCorrect = userAnswer === question.correct;

        if (isCorrect) {
            score++;
        }

        results.push({
            question: question.question,
            userAnswer: userAnswer !== undefined ? question.options[userAnswer] : "Sin respuesta",
            correctAnswer: question.options[question.correct],
            isCorrect: isCorrect,
            userAnswerIndex: userAnswer,
            correctAnswerIndex: question.correct
        });
    }

    showResults(score, results);
}

function showResults(score, results) {
    const quizContainer = document.getElementById('quiz-container');
    const quizResults = document.getElementById('quiz-results');

    if (quizContainer) {
        quizContainer.classList.add('hidden');
    }
    if (quizResults) {
        quizResults.classList.remove('hidden');
    }

    const percentage = Math.round((score / quizData.length) * 100);

    let message = '';
    let messageClass = '';
    let bgClass = '';

    if (score === quizData.length) {
        message = '¡Excelente! Has comprendido perfectamente los fundamentos de las bases de datos.';
        messageClass = 'text-green-600';
        bgClass = 'bg-green-50 border-green-200';
    } else if (score >= Math.ceil(quizData.length * 0.8)) {
        message = '¡Muy bien! Tienes un buen dominio del tema. Solo algunos detalles por refinar.';
        messageClass = 'text-blue-600';
        bgClass = 'bg-blue-50 border-blue-200';
    } else if (score >= Math.ceil(quizData.length * 0.6)) {
        message = '¡Buen trabajo! Tienes una base sólida, pero puedes mejorar repasando algunos conceptos.';
        messageClass = 'text-yellow-600';
        bgClass = 'bg-yellow-50 border-yellow-200';
    } else {
        message = '¡Ánimo! Es normal no dominar todo al principio. Te recomendamos repasar el material y volver a intentarlo.';
        messageClass = 'text-orange-600';
        bgClass = 'bg-orange-50 border-orange-200';
    }

    const resultsHTML = `
                <div class="bg-white rounded-2xl p-8 shadow-lg">
                    <div class="result-summary text-center mb-8">
                        <h3 class="text-3xl font-bold text-gray-800 mb-4">Resultados del Quiz</h3>
                        <div class="score-display text-5xl font-bold mb-4">${score} / ${quizData.length}</div>
                        <div class="text-2xl font-semibold text-gray-600 mb-4">${percentage}%</div>
                        <div class="max-w-2xl mx-auto p-6 rounded-xl border-2 ${bgClass}">
                            <p class="text-lg ${messageClass} font-semibold">${message}</p>
                        </div>
                    </div>
                    
                    <div class="results-list">
                        <h4 class="text-2xl font-bold text-gray-800 mb-6 text-center">Detalle de respuestas</h4>
                        <div class="space-y-6">
                            ${results.map((result, index) => `
                                <div class="result-item ${result.isCorrect ? 'correct' : 'incorrect'} rounded-xl p-6 border-2">
                                    <div class="flex items-start justify-between mb-3">
                                        <h4 class="text-lg font-semibold text-gray-800 flex-1">
                                            ${index + 1}. ${result.question}
                                        </h4>
                                        <div class="ml-4 flex-shrink-0">
                                            ${result.isCorrect ?
            '<span class="bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">✓ Correcta</span>' :
            '<span class="bg-red-100 text-red-800 text-sm font-semibold px-3 py-1 rounded-full">✗ Incorrecta</span>'
        }
                                        </div>
                                    </div>
                                    <div class="space-y-2">
                                        <p class="text-gray-700">
                                            <strong>Tu respuesta:</strong> 
                                            <span class="${result.isCorrect ? 'correct-answer' : 'incorrect-answer'}">${result.userAnswer}</span>
                                        </p>
                                        ${!result.isCorrect ? `
                                            <p class="text-gray-700">
                                                <strong>Respuesta correcta:</strong> 
                                                <span class="correct-answer">${result.correctAnswer}</span>
                                            </p>
                                        ` : ''}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="text-center mt-10 space-y-4">
                        <button onclick="restartQuiz()" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg mr-4">
                             Reintentar Quiz
                        </button>
                        <button onclick="showPage('home')" class="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
                             Volver al Inicio
                        </button>
                    </div>
                </div>
            `;

    if (quizResults) {
        quizResults.innerHTML = resultsHTML;

        // Animar entrada de resultados
        if (typeof gsap !== 'undefined') {
            gsap.fromTo(quizResults.querySelector('.bg-white'),
                { opacity: 0, scale: 0.9 },
                { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.1)" }
            );
        }
    }
}

function restartQuiz() {
    currentQuestion = 0;
    userAnswers = [];
    quizStarted = false;

    const quizResults = document.getElementById('quiz-results');
    const quizContainer = document.getElementById('quiz-container');

    if (quizResults) {
        quizResults.classList.add('hidden');
    }
    if (quizContainer) {
        quizContainer.classList.remove('hidden');
    }

    initQuiz();
}

function initScrollAnimations() {
    if (typeof gsap === 'undefined') {
        console.warn('GSAP no está disponible');
        return;
    }

    try {
        gsap.registerPlugin(ScrollTrigger);

        ScrollTrigger.getAll().forEach(trigger => trigger.kill());

        gsap.utils.toArray('.space-y-6, .space-y-8, .grid').forEach(section => {
            gsap.fromTo(section,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 85%",
                        end: "bottom 15%",
                        toggleActions: "play none none none"
                    }
                }
            );
        });

        gsap.utils.toArray('.img-clickable').forEach(img => {
            gsap.fromTo(img,
                { opacity: 0, scale: 0.9, rotateY: 15 },
                {
                    opacity: 1,
                    scale: 1,
                    rotateY: 0,
                    duration: 0.8,
                    ease: "back.out(1.2)",
                    scrollTrigger: {
                        trigger: img,
                        start: "top 85%",
                        end: "bottom 15%",
                        toggleActions: "play none none none"
                    }
                }
            );
        });

        gsap.utils.toArray('.tabla-custom, .tabla-full').forEach(table => {
            gsap.fromTo(table,
                { opacity: 0, x: -30 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: table,
                        start: "top 80%",
                        end: "bottom 20%",
                        toggleActions: "play none none none"
                    }
                }
            );
        });
        gsap.utils.toArray('.bg-blue-50 .bg-white, .bg-green-50 .bg-white, .bg-orange-50 .bg-white').forEach(card => {
            if (card.offsetHeight < 200) { // Solo elements pequeños
                gsap.fromTo(card,
                    { opacity: 0, y: 20 }, // Sin scale para evitar reflow
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.4, // Más rápido
                        ease: "power2.out", // Menos intenso
                        scrollTrigger: {
                            trigger: card,
                            start: "top 90%",
                            toggleActions: "play none none none"
                        }
                    }
                );
            }
        });

        gsap.utils.toArray('h2, h3').forEach(title => {
            gsap.fromTo(title,
                { opacity: 0, y: -20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: title,
                        start: "top 85%",
                        end: "bottom 15%",
                        toggleActions: "play none none none"
                    }
                }
            );
        });

        ScrollTrigger.refresh();

    } catch (error) {
        console.error('Error en animaciones:', error);
    }
}

window.addEventListener('resize', function () {
    if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
    }
});

window.addEventListener('error', function (e) {
    console.error('Error capturado:', e.error);
});

window.addEventListener('load', function () {
    if (typeof gsap === 'undefined') {
        console.warn('GSAP no está disponible, las animaciones estarán deshabilitadas');
    } else {
        setTimeout(() => {
            initScrollAnimations();
        }, 100);
    }
});

document.addEventListener('visibilitychange', function () {
    if (typeof gsap !== 'undefined') {
        if (document.hidden) {
            gsap.globalTimeline.pause();
        } else {
            gsap.globalTimeline.resume();
        }
    }
});