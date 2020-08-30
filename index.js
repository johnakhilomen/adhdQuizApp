document.write('<script type="text/javascript" src="store.js" ></script>');
    var questionNumber = 0;
    var score = 0;
    var index = 0;

    function updateQuestionNumber() {
        questionNumber++;
    }

    function updateScore() {
        score++;
    }

    function updateIndex() {
        index++;
    }

    function quizIntro() {
        $(".scoreInfo").hide();
        $(".questionDiv").hide();
        $(".correctAnswer").hide();
        $(".wrongAnswer").hide();
    }

    function generateQuizString(arr, index) {
        var quizString = 
        `<form>
        <legend>${arr[index].question}</legend>
        <input type="radio" id="choice-1" name="choice" value="${arr[index].answers[0]}" required>
        <label for="choice-1">${arr[index].answers[0]}</label>
        <br>
        <input type="radio" id="choice-2" name="choice" value="${arr[index].answers[1]}">
        <label for="choice-2">${arr[index].answers[1]}</label>
        <br>
        <input type="radio" id="choice-3" name="choice" value="${arr[index].answers[2]}"><label for="choice-3">${arr[index].answers[2]}</label><br><input type="radio" id="choice-4" name="choice" value="${arr[index].answers[3]}"><label for="choice-4">${arr[index].answers[3]}</label>
        <br>
        <div class="button"><input type="submit" class="submitAnswer"></div></form>`

        return quizString;
    }

    function generateQuestion(arr, index) {
            $(".questionDiv").html(generateQuizString(arr, index));
            $(".score").html(score);
            $(".questionNumber").html(questionNumber);
            $(".startQuiz").hide();
            $(".scoreInfo").show();
            $(".questionDiv").show();
            $(".correctAnswer").hide();
            $(".wrongAnswer").hide();
    }

    function startQuiz() {
        $(".startQuiz").on('click', '.startButton', function(event) {
            updateQuestionNumber();
            $(".score").html(score);
            $(".questionNumber").html(questionNumber);
            $(".startQuiz").hide();
            $(".scoreInfo").show();
            $(".questionDiv").show();
            generateQuestion(popQuiz, index);
        })
    }

    function finishQuiz() {
        $(".startQuiz").show();
        $(".startQuiz").html(`<p>Your final score is: ${score}</p>`);
        $(".scoreInfo").hide();
        $(".questionDiv").hide();
        $(".correctAnswer").hide();
        $(".wrongAnswer").hide();
    }

    function continueQuiz() {
        updateQuestionNumber();
        if (questionNumber <= popQuiz.length) {
        generateQuestion(popQuiz, index);
        } else {
            finishQuiz();
        }
    }

    function correctAnswer() {

        var correctAnswerString;
        if (questionNumber < popQuiz.length) {
            correctAnswerString = `<p>Your answer is right!!!</p><br><div><button class="nextQuestion">Next Question</button></div>`;
        } else {
            correctAnswerString = `<p>Your answer is right!!!</p><br>`;
        }
        return correctAnswerString;
    }

    function wrongAnswer(arr, index) {

        var wrongAnswerString; 
        if (questionNumber < popQuiz.length) {
            wrongAnswerString = `<p>Oops! Your answer is wrong!!!</p><p>Correct answer is: ${arr[index].correctAnswer}</p><br><div><button class="nextQuestion">Next Question</button></div>`;
        } else {
            wrongAnswerString = `<p>Oops! Your answer is wrong!!!</p><p>Correct answer is: ${arr[index].correctAnswer}</p><br><div><button>See Final Score</button></div>`;
        }
        
        return wrongAnswerString;
    }

    function checkAnswer(arr, index) {
        var radioValue = $('input[name="choice"]:checked').val();
        if(!radioValue)
        {
          alert("Please select an aswer to continue");
          return false;
        }
        if (radioValue === arr[index].correctAnswer) {
            updateScore();
            $(".score").html(score);
            $(".startQuiz").hide();
            $(".questionDiv").hide();
            $(".wrongAnswer").hide();
            $(".correctAnswer").show();
            $(".correctAnswer").html(correctAnswer());
        } else {
            $(".startQuiz").hide();
            $(".questionDiv").hide();
            $(".correctAnswer").hide();
            $(".wrongAnswer").show();
            $(".wrongAnswer").html(wrongAnswer(arr, index));
                
        }
    }

    function submitAnswer() {
        $(".questionDiv").on("click", ".submitAnswer", function(event){
        event.preventDefault();
        checkAnswer(popQuiz, index);
        })
    }

    function nextQuestion() {
        $(".correctAnswer, .wrongAnswer").on("click",".nextQuestion", function(event) {
            updateIndex();
            continueQuiz();
          })
    }

    function handleQuizApp() {
        quizIntro();
        startQuiz();
        submitAnswer();
        nextQuestion();
    }

    $(handleQuizApp);