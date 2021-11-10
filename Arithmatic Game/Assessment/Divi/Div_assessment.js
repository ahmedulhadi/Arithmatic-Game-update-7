var url = window.location.href; //get url first
var level = url.split('?')[1]; //get level  

var play_now = false;
var current_score;

var time_remain;
var correct_ans;
var wrong_ans;
var newQuesCnt;
var correctAnswrcnt;
var msg_displayed;


// for specifying game type in title
var game_type;
if (Number(window.location.href.split("=")[1]) == 1) game_type = "One Digit and One Digit";
if (Number(window.location.href.split("=")[1]) == 2) game_type = "One Digit and Two Digit";
if (Number(window.location.href.split("=")[1]) == 3) game_type = "One Digit and Three Digit";
if (Number(window.location.href.split("=")[1]) == 4) game_type = "Two Digit and Two Digit";
if (Number(window.location.href.split("=")[1]) == 5) game_type = "Two Digit and Three Digit";
if (Number(window.location.href.split("=")[1]) == 6) game_type = "Three Digit and Three Digit";

document.getElementById("level").innerHTML = `<h1>Level ${Number(window.location.href.split("=")[1])}: ${game_type}</h1>`

// when click started 
document.getElementById('start_reset_game').onclick = function() {

    // if we are play_now
    if (play_now == true) {
        location.reload(); // reload page   
    } else {
        // if we are not play_now
        //change to play_now
        play_now = true;
        current_score = 0;
        newQuesCnt = 1; //number of ques
        correctAnswrcnt = 0; // number of correct answers given 
        document.getElementById('score-value').innerHTML = current_score;

        //show_func countdown num
        show_func('time_remain');
        time_remain = 60;
        document.getElementById("timeremainingvalue").innerHTML = time_remain;
        hide_func('Game_over')

        //change to reset
        document.getElementById('start_reset_game').innerHTML = 'Reset Game';

        // start countdown
        countdown_start()

        //gerate new questions
        generateQue();
    }
}


//clciking on asnwer box
for (i = 1; i < 5; i++) {
    document.getElementById('box' + i).onclick = function() {
        // if we play_now
        if (play_now == true) {
            if (this.innerHTML == correct_ans) {
                //correct answer
                // console.log('correct runnig..');
                current_score++
                correctAnswrcnt++
                document.getElementById('score-value').innerHTML = current_score;
                hide_func('wrong_tag');
                show_func('correct_tag')

                // audio for correct ans
                var correct_audio = new Audio("../../music/correct_ans.wav");
                correct_audio.play();

                setTimeout(function() {
                    hide_func('correct_tag')
                }, 1500);

                //generate new question
                newQuesCnt++;
                generateQue();
            } else {
                //wrong answer
                // console.log('wrong runnig..');
                hide_func('correct_tag');
                show_func('wrong_tag')

                // wrong ans audio
                var wrong_audio = new Audio('../../music/mixkit-wrong-answer-fail-notification-946.wav');
                wrong_audio.play();

                setTimeout(function() {
                    hide_func('wrong_tag')
                }, 1500);

                //generate new question
                newQuesCnt++;
                generateQue();
            }
        }
    }
}

// stop the counter
function stopCountDown() {
    clearInterval(action)
}

//hide_func elements
function hide_func(id) {
    document.getElementById(id).style.display = 'none';
}

//show_func elements
function show_func(id) {
    document.getElementById(id).style.display = 'block';
}

// for redirecting in main
document.getElementById("exit_game").addEventListener("click", move_main);

function move_main() {
    window.location.replace("../../index.html")
}


// functions
function countdown_start() {
    action = setInterval(function() {
        time_remain -= 1;
        document.getElementById('timeremainingvalue').innerHTML = time_remain;
        if (time_remain == 0 || newQuesCnt == 6) { //Game_over if time remaining is zero or total number of ques is 5
            stopCountDown();

            //show_func Game_over
            show_func('Game_over');

            // game over audio
            var game_over_audio = new Audio('../../music/end.mp3');
            game_over_audio.play();

            if (correctAnswrcnt > 3 && Number(window.location.href.split("=")[1]) == 6) {
                document.getElementById('Game_over').innerHTML = "<p>Congratulations !! You have passed this level !!</p> <p>Your Score is " + current_score + ".</p>";
            } else if (correctAnswrcnt > 3) {
                //    if scored more than 3 then go to next level
                document.getElementById('Game_over').innerHTML = "<p>Congratulations !! You have passed this level !!</p> <p>Your Score is " + current_score + ".</p><button class=\"assessment_btn\" onclick=\"redirect_next_level()\">Start Next Level</button>";
            } else {
                // else redirected to study material
                document.getElementById('Game_over').innerHTML = "<p>Failed !!!. Your Level has been assested</p> <p>Your Score is " + current_score + ".</p><button class=\"assessment_btn\" onclick=\"redirect_first_level()\">Play Your Level</button>";
            }

            //time remaining disappear
            hide_func('time_remain');
            hide_func('correct_tag');
            hide_func('wrong_tag');
            play_now = false;
            document.getElementById('start_reset_game').innerHTML = 'Start Game'
        }
    }, 1000);
}

// redirected to first level
function redirect_first_level() {
    window.location.replace("../../Division/Division_card.html" + "?level=" + Number(window.location.href.split("=")[1]));
}

// for redirecting in next level when one is completed
function redirect_next_level() {
    var next_level = Number(window.location.href.split("=")[1]) + 1
    console.log(next_level)
    if (next_level <= 6) {
        window.location.href = window.location.pathname + "?level=" + next_level;
    }
}

function generateQue() {
    // levelwise number generation
    var x;
    var y;
    var a; //for creating same type of wrong ans
    var b; //for creating same type of wrong ans
    if (level == "level=1") {
        x = Math.floor(Math.random() * 10); //one digit number  
        if (x == 0) {
            x++; //if zero generated then make it one
            y = x * Math.floor(Math.random() * 10); //one digit number
        } else if (x < 4) y = x * Math.floor(Math.random() * (3 - 1 + 1)); //one digit number if x is less than 4
        else if (x == 4) y = x * Math.floor(Math.random() * (2 - 1 + 1)); //one digit number if x is 4
        else y = x; //one digit number if x is greater than 4

        if (y == 0) y++;
        a = 0;
        b = 10;
    } else if (level == "level=2") {
        x = Math.floor(Math.random() * 10); //one digit number  
        if (x == 0) {
            x++; //if zero generated then make it one
            y = x * (Math.floor(Math.random() * 90) + 10); // two digit number
        } else if (x < 4) y = x * (Math.floor(Math.random() * (33 - 4 + 1)) + 4); //two digit number if x is less than 4
        else if (x == 4) y = x * (Math.floor(Math.random() * (14 - 3 + 1)) + 3); //two digit number if x is 4
        else y = x * (Math.floor(Math.random() * (10 - 2 + 1)) + 2);; //two digit number if x is greater than 4

        a = 1;
        b = 90;
    } else if (level == "level=3") {
        x = Math.floor(Math.random() * 10); //one digit number  
        if (x == 0) {
            x++; //if zero generated then make it one
            y = x * (Math.floor(Math.random() * 900) + 100); // three digit number
        } else if (x < 4) y = x * (Math.floor(Math.random() * (333 - 34 + 1)) + 34); //three digit number if x is less than 4
        else if (x == 4) y = x * (Math.floor(Math.random() * (249 - 26 + 1)) + 26); //three digit number if x is 4
        else y = x * (Math.floor(Math.random() * (111 - 12 + 1)) + 12);; //three digit number if x is greater than 4

        a = 100;
        b = 900;
    } else if (level == "level=4") {
        x = Math.floor(Math.random() * 90) + 10; //two digit number  
        if (x == 10) {
            y = x * (Math.floor(Math.random() * 10) + 1); //two digit number
        } else if (x < 25) y = x * Math.floor(Math.random() * (4 - 1 + 1)); //two digit number 
        else if (x > 25 && x < 30) y = x * (Math.floor(Math.random() * (3 - 1 + 1)) + 1); //two digit number
        else if (x > 30 && x < 49) y = x * 2; //two digit number
        else y = x; //two digit number  

        if (y == 0) y++
            a = 10;
        b = 90;
    } else if (level == "level=5") {
        x = Math.floor(Math.random() * 90) + 10; //two digit number 
        console.log(x)
        if (x == 10) {
            y = x * (Math.floor(Math.random() * 90) + 10); //three digit number
        } else if (x < 25) y = x * (Math.floor(Math.random() * (39 - 4 + 1)) + 4); //three digit number 
        else if (x > 25 && x < 30) y = x * (Math.floor(Math.random() * (34 - 3 + 1)) + 3); //three digit number
        else if (x > 30 && x < 49) y = x * (Math.floor(Math.random() * (20 - 3 + 1)) + 3); //three digit number
        else y = x * (Math.floor(Math.random() * (10 - 2 + 1)) + 2); //three digit number  
        a = 100;
        b = 90;
    } else {
        x = Math.floor(Math.random() * 900) + 100; //three digit number  
        if (x == 100) {
            y = x * (Math.floor(Math.random() * 10) + 1); //three digit number
        } else if (x < 250) y = x * Math.floor(Math.random() * (4 - 1 + 1)); //three digit number 
        else if (x > 249 && x < 300) y = x * (Math.floor(Math.random() * (3 - 1 + 1)) + 1); //three digit number
        else if (x > 299 && x < 490) y = x * 2; //three digit number
        else y = x; //three digit number 
        a = 1;
        b = 10;
    }


    correct_ans = x >= y ? (x / y) : (y / x); //conditional operator is used to get rid of negative answers
    document.getElementById('ques').innerHTML = x >= y ? (x + '÷' + y) : (y + '÷' + x);

    var correctPosition = 1 + Math.round(3 * Math.random());
    document.getElementById('box' + correctPosition).innerHTML = correct_ans // fill one box with correct answer

    //fill others with wrong ans
    var answers = [correct_ans]
    for (i = 1; i < 5; i++) {
        if (i != correctPosition) {
            var wrong_ans;
            do {
                wrong_ans = Math.abs((a + Math.round(b * Math.random())) - (a + Math.round(b * Math.random())))
            }
            while (answers.indexOf(wrong_ans) > -1)

            document.getElementById('box' + i).innerHTML = wrong_ans
            answers.push(wrong_ans)
        }
    }
}