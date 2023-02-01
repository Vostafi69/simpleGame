const btnStart = document.querySelector('.start-game-btn');
const recordList = document.querySelector('.records-list');
const btnResetResults = document.querySelector('.records-btn');

const row = 5;
const col = 5;

let container = document.querySelector('.game');
let restTime = document.querySelector('.time__rest');

// Perems

const colors = ["87, 189, 253", "175, 224, 255", "151, 71, 255", "231, 169, 255", "47, 119, 228"];

const gameText = document.querySelector('.game-status-alert');

const numbers = [];
let i = 0;
while (numbers.length < 25) {
    numbers.push(i);
    i++;
}

let tempArraysOfAnswers = [];

// /Perems





window.onload = () => {

    document.body.classList.add('loaded_hiding');
    window.setTimeout(function () {
      document.body.classList.add('loaded');
      document.body.classList.remove('loaded_hiding');
    }, 500);

    const getTable = (row, col) => {

        let table = document.createElement('table');
        let tempNumbers = [];

        for (let j = 0; j < row; j++) {
            let tr = document.createElement('tr');
            for (let i = 0; i < col; i++) {
                let td = document.createElement('td');
                
                while (td.innerText == "") {
                    let rnd = Math.floor(Math.random() * numbers.length);
                    
                    if (tempNumbers.includes(numbers[rnd]) == false) {
                        tempNumbers.push(numbers[rnd]);
                        td.innerText = numbers[rnd];
                    }
                    
                }
                

                tr.appendChild(td);
            }
            table.appendChild(tr);
        }
        container.appendChild(table);
    }
    
    getTable(row, col);

    let fillTable = () => {
        tempArraysOfAnswers = [];

        if (document.querySelector('table') != null) {
            let tds = document.getElementsByTagName('td');
           
            for (let i = 0; i < tds.length; i++) {
                let rnd = Math.floor(Math.random() * colors.length);
                let fontSizeRandom = Math.floor(Math.random() * (46 - 12) + 12);
                tds[i].style.fontSize = fontSizeRandom + "px";
                tds[i].style.backgroundColor = "rgba(" + colors[rnd] + ")";
                tds[i].style.boxShadow = '0 0 10px 5px rgba(' + colors[rnd] + ", .2)";
            }
        }
    }

    fillTable();

    let mouseOverEvent = (event) => {
        if (event.target.tagName == "TD") {
            event.target.style.transform = "scale(1.1)";
        }
    }   

    let mouseOutEvent = (event) => {
        if (event.target.tagName == "TD") {
            event.target.style.transform = "none";
        }
    }

    let createRecordNote = (time) => {
        let RecordNote = document.createElement('li');
        RecordNote.classList.add('records-list__item');
        let noteSpan = document.createElement('span');
        noteSpan.innerHTML = time
        RecordNote.appendChild(noteSpan);
        recordList.appendChild(RecordNote);
    }

    let mouseClickEvent = (event) => {
        if (event.target.tagName == "TD") {
            if (event.target.innerHTML == tempArraysOfAnswers.length) {
                tempArraysOfAnswers.push(event.target.innerHTML);
                event.target.style.backgroundColor = "#9BE08A";
                event.target.style.pointerEvents = "none";
                event.target.style.boxShadow = '0 0 10px 5px rgb(155, 224, 138, .2)';
            }
            if (tempArraysOfAnswers.length == numbers.length) {
                localStorage.setItem("record_" + localStorage.length, restTime.innerHTML);
                createRecordNote(restTime.innerHTML);
                timerHandle();
            }
        }
    }

    let timer;

    let timerHandle = () => {
        if (timer) {
            timer = clearInterval(timer);
            restTime.innerHTML = 'Время: ' + 0 + ' сек.';
            document.querySelector('.start-game-btn span').innerHTML = "Начать игру";
            container.classList.add('game_block');
            gameText.classList.remove('to-bottom');
            gameText.classList.add('alert-animation');
        }
        else {
            let i = 1;
            container.removeChild(document.querySelector('table'));
            getTable(row, col);
            fillTable();
            document.querySelector('table').addEventListener('mouseover', mouseOverEvent);
            document.querySelector('table').addEventListener('mouseout', mouseOutEvent);
            document.querySelector('table').addEventListener('click',  mouseClickEvent);
            container.classList.remove('game_block');
            gameText.classList.add('to-bottom');
            gameText.classList.remove('alert-animation');
            document.querySelector('.start-game-btn span').innerHTML = "Закончить";
            timer = setInterval(() => {
                restTime.innerHTML = 'Время: ' + i + ' сек.';
                i++;
            }, 1000);
        }
    }

    btnStart.addEventListener('click', timerHandle);
    btnResetResults.addEventListener('click', () => {
        localStorage.clear();
        while (recordList.firstChild) {
            recordList.removeChild(recordList.firstChild);
        }
    });

    let localStorageHandle = () => {
        for (let i = 0; i < localStorage.length; i++) {
            createRecordNote(localStorage.getItem("record_" + i));       
        }
    }

    localStorageHandle();
}
