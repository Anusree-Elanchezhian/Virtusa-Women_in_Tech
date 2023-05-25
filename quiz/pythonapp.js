/* Created and coded by Abhilash Narayan */
/* Quiz source: w3schools.com */
var quiz = {
    "JS": [
        {
            "id": 1,
            "question": "How do you insert COMMENTS in Python code?",
            "options": [
                {
                    "a": "/*This is a comment*/",
                    "b": "#This is a comment",
                    "c": "//This is a comment",
                }
            ],
            "answer": "#This is a comment",
            "score": 0,
            "status": ""
        },
        {
            "id": 2,
            "question": "Which statement is false for __init__?",
            "options": [
                {
                    "a": "__init__ is called manually on object creation.",
                    "b": "__init__ is a constructor method in Python.",
                    "c": "All classes have a __init__ method associated with them.",
                    "d": "__init__ allocates memory for objects."
                }
            ],
            "answer": "__init__ is called manually on object creation.",
            "score": 0,
            "status": ""
        },
        {
            "id": 3,
            "question": "Let func = lambda a, b : (a * b + a * b), what is the output of func(float(4),6) ?",
            "options": [
                {
                    "a": "24.0",
                    "b": "48.0",
                    "c": "48",
                    "d": "Error"
                }
            ],
            "answer": "48.0",
            "score": 0,
            "status": ""
        },
        {
            "id": 4,
            "question": "Which among the below options picks out negative numbers from the given list?",
            "options": [
                {
                    "a": "[num for num<0 in list]",
                    "b": "[num<0 in list]",
                    "c": "[num for num in list if num<0]",
                    "d": "[num in list for num<0]"
                }
            ],
            "answer": "[num for num in list if num<0]",
            "score": 0,
            "status": ""
        },
        {
            "id": 5,
            "question": "Which of the following is untrue for Python namespaces?",
            "options": [
                {
                    "a": "Python namespaces are implemented as a dictionary in Python.",
                    "b": "Python namespaces have keys as addresses of the objects.",
                    "c": "Lifecycle of a namespace depends upon the scope of the objects they are mapped to.",
                    "d": "Namespaces ensure that object names in a program are unique.",
                }
            ],
            "answer": "Python namespaces have keys as addresses of the objects.",
            "score": 0,
            "status": ""
        }
    ]
}
var quizApp = function () {
    this.score = 0;
    this.qno = 1;
    this.currentque = 0;
    var totalque = quiz.JS.length;
    this.displayQuiz = function (cque) {
        this.currentque = cque;
        if (this.currentque < totalque) {
            $("#tque").html(totalque);
            $("#previous").attr("disabled", false);
            $("#next").attr("disabled", false);
            $("#qid").html(quiz.JS[this.currentque].id + '.');
            $("#question").html(quiz.JS[this.currentque].question);
            $("#question-options").html("");
            for (var key in quiz.JS[this.currentque].options[0]) {
                if (quiz.JS[this.currentque].options[0].hasOwnProperty(key)) {
                    $("#question-options").append(
                        "<div class='form-check option-block'>" +
                        "<label class='form-check-label'>" +
                        "<input type='radio' class='form-check-input' name='option' id='q" + key + "' value='" + quiz.JS[this.currentque].options[0][key] + "'><span id='optionval'>" +
                        quiz.JS[this.currentque].options[0][key] +
                        "</span></label>"
                    );
                }
            }
        }
        if (this.currentque <= 0) {
            $("#previous").attr("disabled", true);
        }
        if (this.currentque >= totalque) {
            $('#next').attr('disabled', true);
            for (var i = 0; i < totalque; i++) {
                this.score = this.score + quiz.JS[i].score;
            }
            return this.showResult(this.score);
        }
    }
    this.showResult = function (scr) {
        $("#result").addClass('result');
        $("#result").html("<h1 class='res-header'>Total Score: &nbsp;" + scr + '/' + totalque + "</h1>");
        for (var j = 0; j < totalque; j++) {
            var res;
            if (quiz.JS[j].score == 0) {
                res = '<span class="wrong">' + quiz.JS[j].score + '</span><i class="fa fa-remove c-wrong"></i>';
            } else {
                res = '<span class="correct">' + quiz.JS[j].score + '</span><i class="fa fa-check c-correct"></i>';
            }
            $("#result").append(
                '<div class="result-question"><span>Q ' + quiz.JS[j].id + '</span> &nbsp;' + quiz.JS[j].question + '</div>' +
                '<div><b>Correct answer:</b> &nbsp;' + quiz.JS[j].answer + '</div>' +
                '<div class="last-row"><b>Score:</b> &nbsp;' + res +
                '</div>'
            );
        }
    }
    this.checkAnswer = function (option) {
        var answer = quiz.JS[this.currentque].answer;
        if (option == quiz.JS[this.currentque].answer) {
            if (quiz.JS[this.currentque].score == "") {
                quiz.JS[this.currentque].score = 1;
                quiz.JS[this.currentque].status = "correct";
            }
        } else {
            quiz.JS[this.currentque].status = "wrong";
        }
    }
    this.changeQuestion = function (cque) {
        this.currentque = this.currentque + cque;
        this.displayQuiz(this.currentque);
    }
}
var jsq = new quizApp();
var selectedopt;
$(document).ready(function () {
    jsq.displayQuiz(0);
    $('#question-options').on('change', 'input[type=radio][name=option]', function (e) {
        //var radio = $(this).find('input:radio');
        $(this).prop("checked", true);
        selectedopt = $(this).val();
        console.log(selectedopt);
    });
});
$('#next').click(function (e) {
    e.preventDefault();
    if (selectedopt) {
        jsq.checkAnswer(selectedopt);
    }
    jsq.changeQuestion(1);
});
$('#previous').click(function (e) {
    e.preventDefault();
    if (selectedopt) {
        jsq.checkAnswer(selectedopt);
    }
    jsq.changeQuestion(-1);
});