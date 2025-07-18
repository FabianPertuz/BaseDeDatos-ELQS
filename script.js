document.addEventListener('DOMContentLoaded', function() {
    const quizForm = document.getElementById('quiz-form');
    const quizResult = document.getElementById('quiz-result');

    if (quizForm) {
        quizForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const answers = {
                q1: 'a',
                q2: 'a',
                q3: 'b',
                q4: 'b',
                q5: 'a',
                q6: 'b',
                q7: 'b',
                q8: 'c',
                q9: 'a',
                q10: 'c'
            };

            let score = 0;
            let total = Object.keys(answers).length;

            for (let key in answers) {
                const selected = quizForm.elements[key].value;
                if (selected === answers[key]) {
                    score++;
                }
            }

            let message = '';
            if (score === total) {
                message = '¡Excelente! Has comprendido los fundamentos de las bases de datos. 🎉';
            } else if (score === total - 1) {
                message = '¡Muy bien! Solo te faltó un poco. Repasa y vuelve a intentarlo. 👍';
            } else {
                message = '¡Ánimo! Puedes repasar la información de arriba y volver a intentarlo. 💡';
            }

            quizResult.textContent = `Obtuviste ${score} de ${total}. ${message}`;
        });
    }
});