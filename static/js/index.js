let totalGroups;
let currentGroup = 0;
let isExercise = true; // true for exercise, false for rest
let exerciseDuration;
let breakDuration;
let timeLeft = exerciseDuration; // initial time for exercise
let timerInterval;

let statusDom = document.getElementById('status');
let timerDom = document.getElementById('timer');

let exerciseCountdownAudio = document.getElementById('exerciseCountdownAudio');
let breakCountdownAudio = document.getElementById('breakCountdownAudio');

function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDom.textContent = 
        String(minutes).padStart(2, '0') + ':' + String(seconds).padStart(2, '0');

    timerDom.style.color =  isExercise ? 'red' : 'green';
    statusDom.style.color = isExercise ? 'red' : 'green';

    document.getElementById('group').textContent = `${currentGroup + 1}/${totalGroups}`

    // turn up audio
    if (isExercise && seconds === 10) {
        exerciseCountdownAudio.currentTime = 0; // reset
        exerciseCountdownAudio.play();
    } else if (!isExercise && seconds === 4) {
        breakCountdownAudio.currentTime = 0;
        breakCountdownAudio.play();
    }

    if (timeLeft <= 0) {
        if (isExercise) {
            isExercise = false;
            timeLeft = breakDuration; // switch to rest period
            statusDom.textContent = 'Rest Time';

            exerciseCountdownAudio.pause(); // pause audio
            exerciseCountdownAudio.currentTime = 0;
        } else {
            currentGroup++;
            if (currentGroup < totalGroups) {
                isExercise = true;
                timeLeft = exerciseDuration; // switch back to exercise period
                statusDom.textContent = 'Exercise Time';

                breakCountdownAudio.pause();
                breakCountdownAudio.currentTime = 0;
            } else {
                statusDom.textContent = 'All Done!';
                timerDom.textContent = '00:00';
                timerDom.style.color = 'blue'
                statusDom.style.color = 'blue'
                clearInterval(timerInterval);
                //make sure every audios have paused
                exerciseCountdownAudio.pause();
                exerciseCountdownAudio.currentTime = 0;
                breakCountdownAudio.pause();
                breakCountdownAudio.currentTime = 0;
            }
        }
    } else {
        timeLeft--;
    }
}

function warmingUp() {
    statusDom.textContent = "Starting warming up...";
    setTimeout(function() {
        statusDom.textContent = "Warming up complete!";
        setTimeout(() => {
            statusDom.textContent = "Start Exercise!";
        }, 1000);
        timerInterval = setInterval(updateTimer, 1000);
    }, 5000); 
}

function startTimer() {
    // Update variables with user input values
    totalGroups = parseInt(document.getElementById('totalGroups').value) || 3;
    exerciseDuration = parseInt(document.getElementById('exerciseDuration').value) || 90;
    breakDuration = parseInt(document.getElementById('breakDuration').value) || 15;
    
    currentGroup = 0;
    isExercise = true;
    timeLeft = exerciseDuration;
    statusDom.textContent = 'Exercise Time';
    warmingUp()
}