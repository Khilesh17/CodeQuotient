//Difficulty Elements
const difficultyRadioButtons = document.querySelectorAll(".difficultyRadio");
const difficultySelectorContainer = document.getElementById("difficultySelector");
const startButton = document.getElementById('startButton');

//Quizz Elements
const quizContainer = document.getElementById("quizContainer");
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('optionsContainer');
const feedbackElement = document.getElementById('feedback');
const timerElement = document.getElementById('timer');
const nextButton = document.getElementById('nextButton');
const submitButton = document.getElementById("submitButton");
const questionCount = document.getElementById("questionCount");

//Score Elements
const scoreContainer = document.getElementById("scoreContainer");
const scoreElement = document.getElementById('score');
const refreshButton = document.getElementById("restartButton");

let selectedQuestions = [];
let currentQuestionIndex = 0;
let selectedDifficulty = '';
let score = 0;  
let timeInterval;
let timeGivenForSolvingQuestion;

//Some Varibles Which can be toggled 
const timeGivenForSolvingEasyQuestion = 15;
const timeGivenForSolvingMediumQuestion = 20;
const timeGivenForSolvingHardQuestion = 30;
const numberOfQuestionsWantToShow = 5;


//......//
// Flow //
//......//

// Step 1 : check karege local storage me
// Step 2 : if Questions State Present then load
// Step 3 : Not prtesent the restart the Quiz

// How we are going to store the Current state of the quiz
// 1. After clicking the Next Button -> update the score
// 2. After Clicking the submit button -> new Question will load -> save curr Question index


window.onload = function () {

    clearInterval(timeInterval);

    //Step 1 : check local storage for quiz state 
    const quizState = localStorage.getItem('quizState');
    const QuestionsForLocalStorage = localStorage.getItem('QuestionsForLocalStorage');

    // console.log("Quiz Data : ", quizState);

    //Step 2 : if present then load that data 
    if (quizState) {
        const state = JSON.parse(quizState);
        const localQuestion = JSON.parse(QuestionsForLocalStorage);

        // console.log("Local storage all Question : ", localQuestion);

        currentQuestionIndex = state.currentQuestionIndex;
        selectedDifficulty = state.selectedDifficulty;
        score = state.score;
        selectedQuestions = localQuestion.questions;

        // console.log("currentQuestionIndex : ", currentQuestionIndex);
        console.log("Selected Question : ", selectedQuestions);

        difficultySelectorContainer.style.display = 'none';
        quizContainer.style.display = 'block';


        loadQuestion();
        setTimeInSeconds();
        startTimer();
    }
};


// Jab question is answered or the timer is updated then saving the state
function saveQuizState() {
    const quizState = {
        currentQuestionIndex: currentQuestionIndex,
        selectedDifficulty: selectedDifficulty,
        score: score,
    };
    localStorage.setItem('quizState', JSON.stringify(quizState));
}


//............//
// Start Quiz //
//............//
function startQuizHandler() {

    //Step 1 : Finding the Checked Radio Button
    difficultyRadioButtons.forEach(radioButton => {
        if (radioButton.checked) {
            selectedDifficulty = radioButton.value;
        }
    })

    //Validation
    if (selectedDifficulty === '') {
        alert("First Select the Difficulty Level");
        return;
    }


    //Step 2 : Hiding the difficulty Container
    difficultySelectorContainer.style.display = 'none';

    //Step 3 : Now Display the Quiz Conatiner
    quizContainer.style.display = 'block';

    //Added Additional Functionality
    //Giving time according to level of the Problem
    setTimeInSeconds();

    //Step 4 : loading the question
    getRandomQuestions();
    loadQuestion();

    console.log("Selected Difficulty : ", selectedDifficulty);
}

function setTimeInSeconds() {
    if (selectedDifficulty === "easy") {
        timeGivenForSolvingQuestion = timeGivenForSolvingEasyQuestion;
    }
    else if (selectedDifficulty === "medium") {
        timeGivenForSolvingQuestion = timeGivenForSolvingMediumQuestion;
    }
    else if (selectedDifficulty === "hard") {
        timeGivenForSolvingQuestion = timeGivenForSolvingHardQuestion;
    }
}

//Fetching 10 random questions of selected difficulty
function getRandomQuestions() {
    //step 1 : fetching all questions of selected category
    const questionsOfSelectedDifficulty = questions[selectedDifficulty];

    //Step 2 : Now the questions might be less than 10 so just for validation purpose
    const numberOfQuestions = Math.min(numberOfQuestionsWantToShow, questionsOfSelectedDifficulty.length);

    //Now Storing random 10 questions in selectedQuestions array
    for (let i = 0; i < numberOfQuestions; i++){
        const randomIndex = Math.floor(Math.random() * questionsOfSelectedDifficulty.length);

        selectedQuestions.push(questionsOfSelectedDifficulty[randomIndex]);

        //Removing the selected questions from question of selected difficulty array to avoid repeatation
        questionsOfSelectedDifficulty.splice(randomIndex, 1);
    }

    // console.log("Selected Question : ", selectedQuestions);
    const QuestionsForLocalStorage = {
        questions: selectedQuestions
    };
    localStorage.setItem('QuestionsForLocalStorage', JSON.stringify(QuestionsForLocalStorage));
}

//Loadinng the question one by one
function loadQuestion() {

    //Whenever the question will load the timer will restart for that question
    clearInterval(timeInterval);
    startTimer();

    //Setting up the Current Question count
    questionCount.textContent = `${currentQuestionIndex+1}/${selectedQuestions.length}`

    //Question 
    questionElement.textContent = selectedQuestions[currentQuestionIndex].question;

    //Options
    optionsElement.innerHTML = '';

    shuffleOptions(selectedQuestions[currentQuestionIndex].options); 

    selectedQuestions[currentQuestionIndex].options.forEach(option => {
        const label = document.createElement('label');
        const optionText = document.createTextNode(option);
        const radioButton = document.createElement("input");
        radioButton.name = "options";
        radioButton.type = "radio";
        radioButton.value = option;
        radioButton.classList.add("optionsRadioButton");

        radioButton.addEventListener("change", function () {
            console.log("Parent Label : ", label);
            
            if (radioButton.checked) {
                label.classList.add("checked");
            }
            else {
                label.classList.remove("checked");
            }
        });

        label.classList.add("options");
        label.appendChild(optionText);
        label.appendChild(radioButton);

        optionsElement.appendChild(label);
    });

    // startTimer(10);

    //After rendering Question we have to hide the next button and also hide the feedbak of correct and or not and display the submit button
    submitButton.style.display = 'block'
    nextButton.style.display = 'none';
    feedbackElement.textContent = '';
}

//...................//
//Shuffel the Options//
//...................//
function shuffleOptions(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

//...............//
// Submit Answer //
//...............//
function submitAnswerHandler() {
    
    //Step 1 : saare options fetch karege
    const options = document.querySelectorAll(".optionsRadioButton");

    //Step 2 : fitching the selected option
    let selectedOption = "";
    options.forEach(option => {
        if (option.checked) {
            selectedOption = option.value;
        }
    })

    if (selectedOption === "") {
        alert("First Select any one option then you can Submit");
        return;
    }

    //Step 3 : Now comparing the correct ans and selected ans
    const correctAnswer = selectedQuestions[currentQuestionIndex].answer;

    if (selectedOption === correctAnswer) {
        feedbackElement.textContent = 'Correct!';
        feedbackElement.classList.remove('incorrect');
        feedbackElement.classList.add('correct');
        score++;
    }
    else {
        feedbackElement.textContent = 'Incorrect!';
        feedbackElement.classList.remove('correct');
        feedbackElement.classList.add('incorrect');
    }

    submitButton.style.display = 'none';
    nextButton.style.display = 'block';
    clearInterval(timeInterval);
    timerElement.textContent = '';


    //TODO: submit krne ke baad State save kardege quiz ki
    saveQuizState();
}

//...............//
// Next Question //
//...............//
function nextQuestionHandler() {
    currentQuestionIndex++;
    if (currentQuestionIndex < selectedQuestions.length) {
        loadQuestion();

        //TODO: After loading also save the state bcz we have to know which question we are currently in it
        saveQuizState();
    }
    else {
        endQuiz();
    }
}

//..........//
// End Quiz //
//..........//
function endQuiz() {
    scoreElement.textContent = `${score} out of ${selectedQuestions.length}`;
    quizContainer.style.display = 'none';
    scoreContainer.style.display = 'block';

    //TODO: Clearing the Local storage.
    localStorage.removeItem('quizState');
    localStorage.removeItem('QuestionsForLocalStorage');
    
}

//.......//
// Timer //
//.......//
function startTimer() {
    // clearInterval(timeInterval);
    let timeLeft = timeGivenForSolvingQuestion;

    timeInterval = setInterval(() => {
        timerElement.textContent = `Time Left: ${timeLeft}`;
        timeLeft--;

        if (timeLeft < 0) {
            //Stopping the inserval
            clearInterval(timeInterval);
            handleTimeout();
        }
    }, 1000);
}

function handleTimeout() {
    feedbackElement.textContent = 'Time is up!';
    timerElement.textContent = '';
    feedbackElement.classList.add("incorrect");
    submitButton.style.display = 'none';
    nextButton.style.display = 'block'
}


//...............//
//Handling Events//
//...............//
startButton.addEventListener('click', startQuizHandler);
submitButton.addEventListener('click', submitAnswerHandler)
nextButton.addEventListener('click', nextQuestionHandler);
refreshButton.addEventListener("click", function() {
    location.reload(); // Reloads the page
});


//.....................//
// Additional Features //
//.....................//
// 1. Giving time according to level of the Problem
// 2. Refresh Button
// 3. Currently kis Question par hai
// 4. If page is refreshed in between the quiz then we have to restart the same question 
// 5. Also the timer





//....................//
// Got to learn About //
//....................//
// 1. clearInterval(timeInterval) => stops the setInterval with provided id
// 2. radio.checked => check the radio box is checked or not
// 3. location.reload() => relode the page



//..............//
// Flow Diagram //
//..............//

// Select Difficulty -> Play Quiz -> Score Board

// playQuiz -> next button -> laod the new Question + show the submit button

// new Question Loaded -> timer will Start

// Timer end -> submit button hide 