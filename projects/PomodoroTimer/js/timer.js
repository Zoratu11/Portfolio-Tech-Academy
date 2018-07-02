//display stuff
const plus = document.getElementById("plus");
const minus = document.getElementById("minus");
const minute = document.getElementById("minute");
const second = document.getElementById("second");

//The actual buttons
const workButton = document.getElementById("workButton");
const breakButton = document.getElementById("breakButton");
const startButton = document.getElementById("startButton");
const resetButton = document.getElementById("resetButton");

//alarm audio
const alarm = document.getElementById("alarm");

plus.addEventListener("click", addMinute);
minus.addEventListener("click", subtractMinute);

workButton.addEventListener("click", setTo25Minutes);
breakButton.addEventListener("click", setTo5Minutes);
startButton.addEventListener("click", startTimer);
resetButton.addEventListener("click", reset);

function addMinute() {
    let value = parseInt(minute.innerHTML);
    value += 1;
    
    if(value < 10) {
        minute.innerHTML = "0" + value;
    } else {
        minute.innerHTML = value;
    }
}

function subtractMinute() {
    let value = parseInt(minute.innerHTML);
    if(value === 0) {
        return;
    }
    value -= 1;

    if(value < 10) {
        minute.innerHTML = "0" + value;
    } else {
        minute.innerHTML = value;
    }
}

function setTo25Minutes() {
    minute.innerHTML = 25;
}

function setTo5Minutes() {
    minute.innerHTML = "0" + 5;
}

function startTimer() {
    plus.removeEventListener("click", addMinute);
    minus.removeEventListener("click", subtractMinute);
    workButton.removeEventListener("click", setTo25Minutes);
    breakButton.removeEventListener("click", setTo5Minutes);
    startButton.removeEventListener("click", startTimer);

    window.interval = setInterval(() => {
        let secondValue = parseInt(second.innerHTML);
        let minuteValue = parseInt(minute.innerHTML);
        if(secondValue === 0) {
            if(minuteValue === 0) {
                alarm.play();
                clearInterval(window.interval);

                plus.addEventListener("click", addMinute);
                minus.addEventListener("click", subtractMinute);
                workButton.addEventListener("click", setTo25Minutes);
                breakButton.addEventListener("click", setTo5Minutes);
                startButton.addEventListener("click", startTimer);
                return;
            } else {
                minuteValue -= 1;
                secondValue = 60;
            }
        }

        secondValue -= 1;

        if(minuteValue < 10) {
            minute.innerHTML = "0" + minuteValue;
        } else {
            minute.innerHTML = minuteValue;
        }

        if(secondValue < 10) {
            second.innerHTML = "0" + secondValue;
        } else {
            second.innerHTML = secondValue;
        }
    }, 1000);

}

function reset() {
    clearInterval(window.interval);
    minute.innerHTML = 25;
    second.innerHTML = "00";

    plus.addEventListener("click", addMinute);
    minus.addEventListener("click", subtractMinute);
    workButton.addEventListener("click", setTo25Minutes);
    breakButton.addEventListener("click", setTo5Minutes);
    startButton.addEventListener("click", startTimer);
}