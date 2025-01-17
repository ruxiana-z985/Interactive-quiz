class Question {
    constructor(question, options = [], answer, imgSrc) {
        this.question = question;
        this.options = options;
        this.answer = answer;
        this.imgSrc = imgSrc;
    }
}

let questions = [
    new Question(
        `What is the main goal of Gon Freecss at the beginning of the series?`,
        [`A) Become a doctor`, `B) Find his father`, `C) Defeat Hisoka`, `D) Collect all Greed Island cards`],
        1, "images/father-7121196_1280.png"
    ),
    new Question(
        `What kind of animal is Gon's companion, Kite, reborn as?`,
        [`A) Dog`, `B) Cat`, `C) Ant`, `D) Bird`],
        2, "images/ant-1096401_1280.png"
    ),
    new Question(`What triggers the change in Kurapika's eyes, and how does it affect his Nen abilities?`,
        [`A) His eyes turn scarlet when he activates his Chain Jail ability, giving him enhanced strength.`,
         `B) His eyes turn scarlet when he activates his Nen abilities, but only when he is near the Phantom Troupe.`,
         `C) His eyes turn scarlet when he is overcome by emotions, enhancing his Nen abilities and giving him access to Emperor Time.`,
         `D) His eyes turn scarlet when he uses his Judgment Chain ability, allowing him to access a temporary power boost.`],
        0, `images/eye-3182216_1280.png`
    )
];

const startButton = document.getElementById('start-btn');
const startContainer = document.getElementById('start-container');
const qContainer = document.querySelector('.container');
const quiz = document.querySelector('.question-container');
const nextBtn = document.querySelector('.nextBtn');
const dialog = document.getElementById('confirmation');
const hint = document.querySelector('.hint');

// Function to initialize the game and keep everything encapsulated
function createQuizGame() {
    let qNum = 0;
    let score = 0;
    let hintCounter=0;

    function renderNextQuestion() {
        if (qNum < questions.length) {
            const currentQuestion = questions[qNum];
            quiz.innerHTML = `
                <h1>${currentQuestion.question}</h1>
                <p class="user-answer">${currentQuestion.options[0]}</p>
                <p class="user-answer">${currentQuestion.options[1]}</p>
                <p class="user-answer">${currentQuestion.options[2]}</p>
                <p class="user-answer">${currentQuestion.options[3]}</p>
            `;
             hint.classList.add("blur");
            hint.src = currentQuestion.imgSrc; // Update hint image
            const imgContainer = document.querySelector('.image-container');
            imgContainer.addEventListener('click', function () {
                dialog.showModal(); // Show the dialog on image click

                const yesButton = document.getElementById('yes');
                const noButton = document.getElementById('no');

                // Handle the radio button clicks
                yesButton.addEventListener('change', function () {
                    if (yesButton.checked && hintCounter<=5) {
                        hint.classList.remove("blur"); // Unblur hint image
                        hintCounter++;
                        dialog.close();
                    }
                });

                noButton.addEventListener('change', function () {
                    if (noButton.checked) {
                        dialog.close();
                    }
                });
            });

            const userAnswers = quiz.querySelectorAll('.user-answer');
            userAnswers.forEach(user => {
                user.style.border = "1px solid white";
                user.style.padding = "10px";
                user.style.cursor = "pointer";
                user.addEventListener('mouseenter', () => {
                    user.style.backgroundColor = "grey";
                });
                user.addEventListener('mouseleave', () => {
                    user.style.backgroundColor = "transparent";
                });
                user.addEventListener('click', function (e) {
                    if (e.target.textContent === currentQuestion.options[currentQuestion.answer]) {
                        score++;
                        e.target.style.border = "2px solid green";
                        e.target.style.pointerEvents = "none";
                        e.target.style.color = "grey";
                    } else {
                        e.target.style.pointerEvents = "none";
                        e.target.style.color = "grey";
                    }
                });
            });

            qNum++; // Move to the next question
        
        } else {
            quiz.innerHTML = `
                <h1>Quiz Completed!</h1>
                <h2>Your score is ${score}</h2>
            `;
            nextBtn.disabled = true; // Disable the next button
        }
    }
   
    return renderNextQuestion;
}

// Create an instance of the closure
const renderNextQuestion = createQuizGame();

// Add event listeners
startButton.addEventListener('click', () => {
    startContainer.classList.add('hide');
    qContainer.classList.add('show');
    renderNextQuestion(); // Render the first question
});

nextBtn.addEventListener('click', renderNextQuestion);
