function generateStartScreenHtml(){
    // This is returning the string that holds the html
    // code for the start screen
    return ` 
    <div class="First Page">
        <p>This quiz is to see how much you know about U.S History.</p>
        <button type="button" id="start-btn">Start</button>
    </div>
    `;
}

function generateQuestionNumberAndScoreHtml(){
    return `
 <ul class="question-and-score">
    <li id="question-number">
    Queston Number: ${store.questionNumber + 1}/${store.questions.length}
    </li>
    <li id = "score">
    Score: ${store.score}/${store.questions.length}
    </li>
    </ul>
  `;
}

function generateAnswersHtml() {
    //this function inputs our answers for each question
    const allAnswers = store.questions[store.questionNumber].answers
    let answersHtml = '';
    let i = 0;
    allAnswers.forEach(rightAnswer => {
        answersHtml += `
        <div id="option-container-${i}">
        <input type = "radio" name="option${i+1}" value= "${rightAnswer} tabindex= "${i+1}" required>
        <label for "option${i + 1}"> ${rightAnswer}</label>
        </div>`;
        i++;
    });
    return answersHtml;
}

function generateQuestionHtml() {
    // this function inputs our questions into our html 
    let currentQuestion = store.questions[store.questionNumber];
    return `
    <form id="question-form" class="queston-form">
        <fieldset>
            <div class="question">
            <legend>${currentQuestion.question}</legend>
            </div>
        <div class="options">
             <div class="answers">
            ${generateAnswersHtml()}
             </div>
            </div>
            <button type="submit" id="submit-answer-btn" tabindex="5">Submit</button>
            <button type="button" id="submit-question-btn" tabindex="6"> Next &gt;</button>
        </fieldset>
    </form>
        `;
}
function handleQuestionFormSubmission() {
  $('body').on('submit', '#question-form' , function (event){
      event.preventDefault();
      const currentQuestion = store.questions[store.currentQuestion];
      let selectedOption = $('input[name=options]:checked').val();
      let optionContainerID = `#option-container-${currentQuestion.rightAnswer.findIndex(
          i => i === selectedOption)}`;
      if (selectedOption === currentQuestion.correctAnswer) {
          store.score++;
          $(optionContainerID).append(generateFeedbackHTML('correct'));
      }
      else { $(optionContainerID).append(generateFeedbackHTML('incorrect'));
    }
    store.currentQuestion++;
    $('submit-answer-btn').hide();
    $('input[type=radio]').each(() => {
        $('input[type=radio]').attr('disable', true);
    });
    $('#next-question-btn').show();
  });
  }
function generateResultsScreen(){
return `
<div class="results">
  <form id="js-restart-quiz">
    <fieldset>
      <div class="row">
        <div class="col-12">
          <legend>Your Score is: ${store.score}/${store.questions.length}</legend>
        </div>
      </div>
       <div class="row">
        <div class="col-12">
          <button type="button" id="restart"> Restart Quiz </button>
        </div>
      </div>
    </fieldset>
</form>
</div>
`;
}

function generateFeedbackHTML(answerStatus) {
    let correctAnswer = store.questions[store.currentQuestion].correctAwnser;
    let htmlToDisplay = '';
    if (answerStatus === 'correct') {
        htmlToDisplay = `<div class="right-answer">Correct</div>`;
    }
    else if (answerStatus === 'incorrect') {
        htmlToDisplay =`<div class="wrong-answer">Incorrect. The correct answer is ${correctAnswer}.</div>`;
    }
    return htmlToDisplay; 
 }



function handleStartClick(){
    $("main").on('click', '#start-btn', function (event) {
        //alert("Clicked start")
        store.quizStarted = true;
        renderQuizHTML();
});
}

function handleNextQuestionClick(){  
    $('body').on('click', '#next-question-btn', (event) => {
    render();
  });
}

function restartQuiz(){
    store.quizStarted = false;
    store.currentQuestion = 0;
    store.score = 0;
}

function handleRestartButtonClick() {
    $('bdoy').on('click','#restart',()=> { 
        restartQuiz();
        render();
    });
}


// This function will display the appropriate html, based on the state that the 
// Quiz is in
function renderQuizHTML(){
    // The html that we want to display on the screen
    let htmlToDisplay = '';
    // Checking if our stores quizStarted variable is false
    if(store.quizStarted === false){
        //alert("Quiz hasnt started")
        // if it is false then we want to set out html that we want to display
        // as the startscreen html
        htmlToDisplay = generateStartScreenHtml();
        // We are setting the html code for the main tag inside of our html
        // to the start screens html that we stored inside of htmlToDisplay
        $("main").html(htmlToDisplay);
    }
    // setting the questions to not go over how many questions we have
    else if(store.questionNumber >= 0 && store.questionNumber < store.questions.length){
        htmlToDisplay = generateQuestionNumberAndScoreHtml();
        htmlToDisplay += generateQuestionHtml();
        $("main").html(htmlToDisplay);
    }
else {
    $('main').html(generateResultsScreen());
}

}

function handleQuizApp(){
    renderQuizHTML();
    handleStartClick();
    handleNextQuestionClick();
    handleQuestionFormSubmission();
    handleRestartButtonClick();
}

$(handleQuizApp);