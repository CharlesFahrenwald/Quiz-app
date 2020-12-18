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
 const html = $(`<ul class="question-and-score">
    <li id="question-number">
    Queston Number: ${store.questionNumber + 1}/${store.questions.length}
    </li>
    <li id = "score">
    Score: ${store.score}/${store.questions.length}
    </li>
    </ul>`);
    $(".question-and-score").html(html);
}

function generateAnswersHtml() {
    //this function inputs our answers for each question
    const question = store.questions[store.questionNumber];
 for(let i=0; i < question.options.length; i++)
 {
    $('.js.answers').append(
        <input type = "radio" name="options" id="option${i + 1}" value = "${question.options[ i ]}" tabindex = 
        "${i + 1}"> 
        <label for ="option${i+1}"> ${question.options[i]}</label> <br/>
        <span id="js-r${i + 1}"></span>
        };
}

function generateQuestionHtml() {
    // this function inputs our questions into our html 
    let question = store.questions[store.currentQuestion];
        generateQuestionAndScoreHtml();
        const questionHtml = $(' <div>
       <form id= "js-question" class="question-form"
               <fieldset>
               <div class="row question">
                <legend> ${question.question}</legend>
                </div>
               <div class= "row options">
               <div class="js-options"> </div>
               </div>               
  <div class= "row">
                <button type = "submit" id="answer" tabindex="5">Submit</button>
          <button type = "button" id="next-question" tabindex="6"> Next >></button>
      </div>
    </fieldset>
    </form>
  </div>`);
    $("main").html(questionHtml);
    updateOptions();
    $("#next-question").hide();                     
}
function handleQuestionFormSubmission() {
  $('body').on('submit', '#js-questions' , function (event){
      event.preventDefault();
      let current = store.questions[store.currentQuestion];
      let selectedOption = $('input[name=options]:checked').val();
      if (!selectedOption) {
          
            alert("Choose an option");
            return;
        }
        let number = current.options.findIndex(i => i === selectedOption);
        let id = "#js-r" + ++number;
        $('span').removeClass("correct incorrect");
        if(selectedOption === current.answer) {
            STORE.score++;
            $(`<img src='./icons8-offline-pin-100.png' alt='correct-icon'><br />You got it right!<br/>`).insertBefore("#next-question");
            $('.question').addClass("hidden");
            $('.options').addClass("hidden");
            $(`fieldset`).addClass("correct");
        }
        else {
            $(`<img src='./icons8-error-100.png' alt='incorrect-icon'><br />incorrect... <br/> The correct answer was "${current.answer}"<br/>`).insertBefore("#next-question");
            $("fieldset").addClass("incorrect");
            $('.question').addClass("hidden");
            $('.options').addClass("hidden");
        }

        STORE.currentQuestion++;
        $("#js-score").text(`Score: ${STORE.score}/${STORE.questions.length}`);
        $('#answer').hide();
        $("input[type=radio]").attr('disabled', true);
        $('#next-question').show();
  });
  }
function generateResultsScreen(){
let resultHtml = $( `
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
`);
    store.currentQuestion = 0;
    store.score = 0;
    $("main").html(resultHtml);
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
    $("#start").on('click', function (event) {
        //alert("Clicked start")
        generateQuestionHtml();
});
}

function handleNextQuestionClick(){  
    $('body').on('click', '#next-question-btn', (event) => {
    render();
  });
}

function handleRestartButtonClick() {
    $('bdoy').on('click','#restart',(event)=> { 
        generateQuestionHtml();
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
