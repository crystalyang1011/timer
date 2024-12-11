let totalGroups;
let currentGroup = 0;
let isExercise = true; // true for exercise, false for rest
let exerciseDuration;
let breakDuration;
let timeLeft = exerciseDuration; // initial time for exercise
let timerInterval;

let statusDom = document.getElementById('status');
let timerDom = document.getElementById('timer');

function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDom.textContent = 
        String(minutes).padStart(2, '0') + ':' + String(seconds).padStart(2, '0');

    timerDom.style.color =  isExercise ? 'red' : 'green';
    statusDom.style.color = isExercise ? 'red' : 'green';

    document.getElementById('group').textContent = `${currentGroup + 1}/${totalGroups}`

    if (timeLeft <= 0) {
        // clearInterval(timerInterval);
        if (isExercise) {
            isExercise = false;
            timeLeft = breakDuration; // switch to rest period
            statusDom.textContent = 'Rest Time';
        } else {
            currentGroup++;
            if (currentGroup < totalGroups) {
                isExercise = true;
                timeLeft = exerciseDuration; // switch back to exercise period
                statusDom.textContent = 'Exercise Time';
            } else {
                statusDom.textContent = 'All Done!';
                timerDom.textContent = '00:00';
                timerDom.style.color = 'blue'
                statusDom.style.color = 'blue'
                clearInterval(timerInterval);
            }
        }
    } else {
        timeLeft--;
    }
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
    timerInterval = setInterval(updateTimer, 1000);
}