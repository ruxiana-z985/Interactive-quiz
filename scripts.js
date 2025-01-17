class question{
    constructor(question,options=[],answer){
        this.question = question;
        this.options = options;
        this.answer = answer;
}
}

let questions = [
    new question(`What is the main goal of Gon Freecss at the beginning of the series?`,
        [`A) Become a doctor`,`B) Find his father`,`C) Defeat Hisoka`,`D) Collect all Greed Island cards`],1),
    new question(`What kind of animal is Gon's companion, Kite, reborn as?`,[`A) Dog`,`B) Cat`,`C) Ant`,`D) Bird`],1),
]

const startButton = document.getElementById('start-btn');
const startContainer=document.getElementById('start-container');
const questionContainer=document.querySelector('.container');

function startGame(){
 startContainer.classList.add('hide');
 questionContainer.classList.add('show');


}
startButton.addEventListener('click',startGame);