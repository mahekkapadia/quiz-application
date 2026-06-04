let questions = [
    {
        question: "Which keyword is used to declare a variable in JavaScript?",
        options: [
            "int",
            "var",
            "define",
            "string"
        ],
        correct: "var"
    },
    {
        question: "Which HTML tag creates a hyperlink?",
        options: [
            "a",
            "link",
            "href",
            "url"
        ],
        correct: "a"
    },
    {
        question: "Which CSS property controls text size?",
        options: [
            "font-style",
            "text-style",
            "font-size",
            "text-size"
        ],
        correct: "font-size"
    },
    {
        question: "Which operator is used for strict equality in JavaScript?",
        options: [
            "=",
            "==",
            "!=",
            "==="
        ],
        correct: "==="
    },
    {
        question: "Which HTML element is used for the largest heading?",
        options: [
            "h1",
            "heading",
            "head",
            "h6"
        ],
        correct: "h1"
    },
    {
        question: "Which CSS property is used to add space outside an element?",
        options: [
            "padding",
            "margin",
            "spacing",
            "border"
        ],
        correct: "margin"
    },
    {
        question: "Which JavaScript function is used to show a popup alert box?",
        options: [
            "message()",
            "alert()",
            "pop-up()",
            "notify()"
        ],
        correct: "alert()"
    },
    {
        question: "Which HTML tag is used to create a line break?",
        options: [
            "break",
            "hr",
            "lb",
            "br"
        ],
        correct: "br"
    },
    {
        question: "Which CSS property is used to change the background color?",
        options: [
            "color",
            "bg-color",
            "background-color",
            "background-style"
        ],
        correct: "background-color"
    },
    {
        question: "Which JavaScript method is used to select an element by ID?",
        options: [
            "getElement()",
            "query()",
            "selectById()",
            "getElementById()"
        ],
        correct: "getElementById()"
    },
]


let timeText = document.getElementById("timeTxt");

let progressBar = document.getElementById("progressBar");

let queNum = document.getElementById("queNum");

let question = document.getElementById("question");

let option = document.getElementById("option");

let nextBtn = document.getElementById("nextBtn");

let result = document.getElementById("result");

let timeLeft = 10;

let timer;

let currentQuest = 0;

let score = 0;

let ans = false;

function loadques(){
    // old option
    option.innerHTML = "";

    // timer
    clearInterval(timer);
    timeLeft = 10;
    timeText.innerHTML = `⏰${timeLeft}`;
    startTimer();

    // current question
    let current = questions[currentQuest];
    question.innerHTML = current.question;

    // question number
    queNum.innerHTML = `Question ${currentQuest + 1} / ${questions.length}`;

    // progress bar
    let progress = ((currentQuest + 1) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;

    // answer
    ans = false;

    // options
    current.options.forEach(function(opt){
        let button = document.createElement("button");
        button.classList.add("option");
        button.innerHTML = opt;

        button.addEventListener("click", function(){
            if (ans){
                return;
            }

            ans = true;

            checkAns(opt);

            setTimeout(() => {
                currentQuest++;
                if (currentQuest < questions.length){
                    loadques();
                }
                else{
                    showResult();
                }
            }, 100);
        });

        option.appendChild(button);
    });

}

// check ans
function checkAns(selected){
    let correctAns = questions[currentQuest].correct;

    if (selected === correctAns){
        score++;
    }
}

// next
nextBtn.addEventListener("click", function(){
    currentQuest++;

    if (currentQuest < questions.length){
        loadques();
    }
    else{
        showResult();
    }
});

// timer
function startTimer(){
    timer = setInterval(function(){
        timeLeft--;
        timeText.innerHTML = `⏰${timeLeft}`;

        if (timeLeft == 0){
            clearInterval(timer);
            currentQuest++;

            if (currentQuest < questions.length){
                loadques();
            }
            else{
                showResult();
            }
        }
    }, 1000);
}

// result
function showResult(){
    question.style.display = "none";
    option.style.display = "none";
    nextBtn.style.display = "none";
    timeText.style.display = "none";
    result.innerHTML = "Quiz Completed <br> 🌟 Your Score :" + score + "/" + questions.length;
}

loadques();