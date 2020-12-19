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




function handleStartClick(){
    $("#start").on('click', function (event) {
        //alert("Clicked start")
        generateQuestionHtml();
});
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
  let question = store.questions[store.questionNumber];
 for(let i=0; i < question.options.length; i++)
 {
    $('.js.answers').append(
        <input type = "radio" name="options" id="option${i + 1}" value = "${question.options[ i ]}" tabindex = "${i + 1}"> 
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
            store.score++;
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

        store.currentQuestion++;
        $("#js-score").text(`Score: ${store.score}/${store.questions.length}`);
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

     
     
     
 function endOfQuiz() {
     $('body').on('click', '#next-question',(event) => {
         store.currentQuestion === store.questions.length
         ? generateResultsScreen()
         : generateQuestionHtml();
     });
 }

     
     
     
     
function handleRestartButtonClick() {
    $('body').on('click','#restart',(event)=> {
        generateQuestionHtml();
    });
}



function handleQuizApp(){
    handleStartClick();
    endOfQuiz();
    handleQuestionFormSubmission();
    handleRestartButtonClick();
}

$(handleQuizApp);
