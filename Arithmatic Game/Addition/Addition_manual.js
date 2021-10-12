var play_now = false;
var current_score;
 
var time_remain;
var correct_ans;
  
var wrongAnsCnt;
var totalQueCnt;

var url = window.location.href; //get url first
var level = url.split('?')[1]; //get level  


// for specifying game type in title
var game_type;
if(Number(window.location.href.split("=")[1]) == 1) game_type = "One Digit and One Digit";
if(Number(window.location.href.split("=")[1]) == 2) game_type = "One Digit and Two Digit";
if(Number(window.location.href.split("=")[1]) == 3) game_type = "One Digit and Three Digit";
if(Number(window.location.href.split("=")[1]) == 4) game_type = "Two Digit and Two Digit";
if(Number(window.location.href.split("=")[1]) == 5) game_type = "Two Digit and Three Digit";
if(Number(window.location.href.split("=")[1]) == 6) game_type = "Three Digit and Three Digit";

document.getElementById("level").innerHTML = `<h1>Level ${Number(window.location.href.split("=")[1])}: ${game_type}</h1>`

// when click started 
document.getElementById('start_reset_game').onclick = function () {

    // if we are play_now
    if (play_now == true) {
        location.reload(); // reload page
        
    } else {// if we are not play_now
        //change to play_now
        play_now = true;
        current_score = 0;
        totalQueCnt = 0;
        wrongAnsCnt = 0; //number of wrong ans attempts
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

// input ans 
function checkans(){
    var user_inp = document.getElementById('ans').value 
    if(user_inp == "") alert("Empty fields not allowed..")
    // if we play_now

    else if (play_now == true) {
        if (user_inp == correct_ans) {
            //correct answer
            // console.log('correct runnig..');
            current_score++
            document.getElementById('score-value').innerHTML = current_score;
            hide_func('wrong_tag');
            show_func('correct_tag')
            // audio for correct ans
            var correct_audio = new Audio('../music/correct_ans.wav');
            correct_audio.play();

            
            // making the input field with null
            document.getElementById('ans').value = '';

            setTimeout(function () {
                hide_func('correct_tag')
            }, 1500);

            //generate new question
            generateQue();
            setTimeout(function () {

            }, 1500);
            
        }

        else {
            //wrong answer
            // console.log('wrong runnig..');
            hide_func('correct_tag');
            show_func('wrong_tag')
            
            wrongAnsCnt++;
            console.log(wrongAnsCnt)

            // wrong ans audio
            var wrong_audio = new Audio('../music/mixkit-wrong-answer-fail-notification-946.wav');
            wrong_audio.play();
            
            setTimeout(function () {
                hide_func('wrong_tag')
            }, 1500);
 
        }
    }
} 


// for redirecting in study material
function move_to_study_material(){
    window.location.replace("../../Study material/Addition_study_material.html")
}

// functions
function countdown_start() {
    action = setInterval(function () {
        time_remain -= 1;
        document.getElementById('timeremainingvalue').innerHTML = time_remain;
        if (time_remain == 0) { //Game_over
            stopCountDown();
            //show_func Game_over
            show_func('Game_over');

            // game over audio
            var game_over_audio = new Audio('../music/end.mp3');
            game_over_audio.play();

            // if score is greater than equal to 90
            console.log(current_score)
            if(current_score >= 1){
                document.getElementById('Game_over').innerHTML = "<p>Congratulations !! You have successfully completed this level.</p><button class=\"btn btn-primary\" onclick=\"next_level()\">Start Next Level</button>"
                document.getElementById('Game_over').style.display = "block"
            }

            // if number of wrong answers is greater than 3 redirect to study material section
            else if((wrongAnsCnt*100)/totalQueCnt >= 40){
                document.getElementById('Game_over').innerHTML = "<p>Go to study material... Read the concept and try again</p><button class=\"btn btn-primary\" onclick=\"move_to_study_material()\">Go to study material</button>"
                document.getElementById('Game_over').style.display = "block"
            } 
            else{ 
                document.getElementById('Game_over').innerHTML = "<p>Game Over!</p> <p>Your Score is " +  current_score +".</p>"
                document.getElementById('Game_over').style.height="200px"
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

// redirect to next level
function next_level(){
    var next = Number(window.location.href.split("=")[1]) + 1
        console.log(next)
        if (next <= 6) {
            window.location.href = window.location.pathname + "?level=" + next;
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
function move_main(){
    window.location.replace("../main.html")
}

function generateQue() {
    // levelwise number generation
    var x;
    var y;
    var a; //for creating same type of wrong ans
    var b; //for creating same type of wrong ans
    if(level == "level=1"){
        x = Math.floor(Math.random() * 10); //one digit number 
        y = Math.floor(Math.random() * 10); //one digit number 
        a = 0;
        b = 10;
    }
    else if(level == "level=2"){
        x = Math.floor(Math.random() * 10); //one digit number 
        y = 10 + Math.floor(Math.random() * 90); //two digit number  
        a = 1;
        b = 90;
    }
    else if(level == "level=3"){
        x = Math.floor(Math.random() * 10); //one digit number 
        y = 100 + Math.floor(Math.random() * 900); //three digit number
        a = 10;
        b = 90;
    }
    else if(level == "level=4"){
        x = 10 + Math.floor(Math.random() * 90); //two digit number
        y = 10 + Math.floor(Math.random() * 90); //two digit number  
        a = 100;
        b = 90;
    }
    else if(level == "level=5"){
        x = 10 + Math.floor(Math.random() * 90); //two digit number
        y = 100 + Math.floor(Math.random() * 900); //three digit number
        a = 100;
        b = 90;
    }
    else{
        x = 100 + Math.floor(Math.random() * 900); //three digit number
        y = 100 + Math.floor(Math.random() * 900); //three digit number
        a = 100;
        b = 900;
    }

    correct_ans = x + y;
    document.getElementById('ques').innerHTML = x + '+' + y; 
}

