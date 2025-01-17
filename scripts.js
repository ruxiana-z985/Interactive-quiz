class Question {
    constructor(question, options = [], answer) {
        this.question = question;
        this.options = options;
        this.answer = answer;
    }
}

let questions = [
    new Question(
        `What is the main goal of Gon Freecss at the beginning of the series?`,
        [`A) Become a doctor`, `B) Find his father`, `C) Defeat Hisoka`, `D) Collect all Greed Island cards`],
        1
    ),
    new Question(
        `What kind of animal is Gon's companion, Kite, reborn as?`,
        [`A) Dog`, `B) Cat`, `C) Ant`, `D) Bird`],
        1
    ),
];

const startButton = document.getElementById('start-btn');
const startContainer = document.getElementById('start-container');
const qContainer = document.querySelector('.container');
const quiz = document.querySelector('.question-container');
const nextBtn = document.querySelector('.nextBtn');

// Function to start the quiz
function startGame() {
    startContainer.classList.add('hide');
    qContainer.classList.add('show');
}

// Function to handle questions using closures
function changeQuestions() {
    let qNum = 0; // `qNum` is maintained inside the closure
    let score=0;

    // Inner function to render the current question
    return function renderQuestion() {
        if (qNum < questions.length) {
            const currentQuestion = questions[qNum];
            quiz.innerHTML = `
                <h1>${currentQuestion.question}</h1>
                <p class="user-answer">${currentQuestion.options[0]}</p>
                <p class="user-answer">${currentQuestion.options[1]}</p>
                <p class="user-answer">${currentQuestion.options[2]}</p>
                <p class="user-answer">${currentQuestion.options[3]}</p>
                
                
            `;
            const user_answer=quiz.querySelectorAll('.user-answer');
            user_answer.forEach(user => {
                user.addEventListener('click',function(e){
                  if(e.target.textContent==currentQuestion.options[currentQuestion.answer]) 
                    {
                        score++;
                        console.log(score);
                    
                    }

                });
            });


            qNum++; // Increment the question number
        } 
        else {
            quiz.innerHTML = 
            `<h1>Quiz Completed!</h1>
             <h2>Your score is ${score}</h2>
            `;
        
            nextBtn.disabled=true; // Hide the Next button
        }
    };
}

// Create an instance of the closure
const renderNextQuestion = changeQuestions();

// Add event listeners
startButton.addEventListener('click', () => {
    startGame();
    renderNextQuestion(); // Render the first question
});

nextBtn.addEventListener('click', renderNextQuestion);
