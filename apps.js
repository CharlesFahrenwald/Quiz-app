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

function displayQuestionsAndScore(){
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
//render
function displayAnswers() {
    //this function inputs our answers for each question
    const allAnswers = store.questions[store.questionNumber].answers
    let answersHtml = '';
    let i = 0;
    allAnswers.forEach(answer => {
        answersHtml += `
        <div id="option-container-${i}">
        <input type = "radio" name="option" id="option${i + 1}" value= "${answer}" tabindex= "${i+1}" required>
        <label for "option${i + 1}"> ${answer}</label>
        </div>`;
        i++;
    });
    return answersHtml;
}

function displayQuestions() {
    // this function inputs our questions into our html 
    let questionNumber = store.questions[store.questionNumber];
    return `
    <form id="question-form" class="queston-form">
        <fieldset>
            <div class="question">
            <legend>${questionNumber.question}</legend>
            </div>
        <div class="options">
             <div class="answers">
            ${displayAnswers()}
             </div>
            </div>
            <button type="submit" id="submit-answer-btn" tabindex="5">Submit</button>
            <button type="button" id="next-question-btn" tabindex="6"> Next &gt;</button>
        </fieldset>
    </form>
        `;



}
function handleQuestionFormSubmission() {
  $('body').on('submit', '#question-form' , function (event){
      event.preventDefault();
      const questionNumber = store.questions[store.questionNumber];
      let selectedOption = $('input[name=option]:checked').val();
      let optionContainerID = `#option-container-${questionNumber.answers.findIndex(i => i === selectedOption)}`;
      if (selectedOption === questionNumber.correctAnswer) {
        store.score++;
        console.log("test", store.score)
        $(optionContainerID).append(generateFeedbackHTML('correct'));
      }
      else { 
        $(optionContainerID).append(generateFeedbackHTML('incorrect'));
    }
    store.questionNumber++;
    $('#submit-answer-btn').hide();
    $('input[type=radio]').each(() => {
        $('input[type=radio]').attr('disable', true);
    });
    $('#next-question-btn').show();
  });
  }




function resultsScreen(){
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
    let correctAnswer = store.questions[store.questionNumber].correctAnswer;
    let htmlToDisplay = '';
    if (answerStatus === 'correct') {
        htmlToDisplay = `<div class="right-answer">Correct</div>`;
    }
    else if (answerStatus === 'incorrect') {
        htmlToDisplay =`<div class="wrong-answer">Incorrect. The correct answer is ${correctAnswer}.</div>`;
    }
    return htmlToDisplay; 
 }



function handleStartButton(){
    $("main").on('click', '#start-btn', function (event) {
        //alert("Clicked start")
        store.quizStarted = true;
        renderQuizHTML();
});
}

function handleNextQuestionClick(){  
    $('body').on('click', '#next-question-btn', (event) => {
    renderQuizHTML();
  });
}

function restartQuiz(){
    store.quizStarted = false;
    store.questionNumber = 0;
    store.score = 0;
}

function handleRestartButtonClick() {
    $('body').on('click','#restart',()=> { 
        restartQuiz();
        renderQuizHTML();
    });
}



function renderQuizHTML(){
    let htmlToDisplay = '';
    if(store.quizStarted === false){  
        htmlToDisplay = generateStartScreenHtml();
        $("main").html(htmlToDisplay);
    }
    else if(store.questionNumber >= 0 && store.questionNumber < store.questions.length){
        htmlToDisplay = displayQuestionsAndScore();
        htmlToDisplay += displayQuestions();
        $("main").html(htmlToDisplay);
    }
else {
    $('main').html(resultsScreen());
}

}

function handleQuizApp() {
    renderQuizHTML();
    handleStartButton();
    handleNextQuestionClick();
    handleQuestionFormSubmission();
    handleRestartButtonClick();
}

$(handleQuizApp);
