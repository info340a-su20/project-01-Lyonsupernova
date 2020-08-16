// Modal click and remove

let openModalButtons = document.querySelectorAll('[data-modal-target]')
let overlays = document.querySelectorAll('.overlay')
let closeModalButtons = document.querySelectorAll('[data-close-button]')


openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget)
        openModal(modal)
    })
})

overlays.forEach(overlay => {
    overlay.addEventListener('click', () => {
        const modals = document.querySelector('.modal.active')
        closeModal(modals);
    })
})

closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal')
        closeModal(modal)
    })
})


function openModal(modal) {
    if (modal == null) return
    modal.classList.add('active')
    modal.nextElementSibling.classList.add('active')
}

function closeModal(modal) {
    if (modal == null) return
    modal.classList.remove('active')
    modal.nextElementSibling.classList.remove('active')
}

// button delete card 

let deleteButtons = document.querySelectorAll('.delete');
deleteButtons.forEach(button => {
    button.addEventListener('click', () => {
        let rowElem = button.closest(".row");
        let cardNestedElem = button.closest('.card');
        rowElem.removeChild(cardNestedElem);
    })
})


// sort chronologically 

// ths function is used for convert time from AM/PM to 24 hours conversison!
// using ' ' space to split AM and PM
// for example, 8:00 PM -> 20:00
const convertTime12to24 = (time12h) => {
    const [time, modifier] = time12h.split(' ');

    let [hours, minutes] = time.split(':');

    if (hours === '12') {
        hours = '00';
    }

    if (modifier === 'PM') {
        hours = parseInt(hours, 10) + 12;
    }

    return `${hours}:${minutes}`;
}




// this function is used to sort time based on the shedule
// rerender every time insert a new card;

function sortTime(i) {
    // 1. set time to each card
    let arrayCardTime = [];
    let timeCardElem = document.querySelectorAll('#row-' + i + ' .time-card'); // select a time card element
    timeCardElem.forEach(timeCard => {
        let cardElem = timeCard.parentElement; // get parent card element
        let cardTime = timeCard.textContent.replace(/\s+/g, '').toUpperCase(); // get time from each card
        // current card time format: 9:30-10:30AM
        let ampm = cardTime.slice(-2); // parsing AM / PM
        let currentTime = cardTime.split('-')[0]; // split the card time e.g 9:30
        let hour24Time = convertTime12to24(currentTime + ' ' + ampm);
        hour24Time = parseInt(hour24Time.replace(':', ''), 10);
        // 2. assign card into arrays
        arrayCardTime.push({ card: cardElem, time: hour24Time });
    })

    // 3. sorting according to time 
    arrayCardTime.sort((a, b) => (a.time > b.time) ? 1 : -1)

    // 4. use insert before / after to implement 
    let row1Elem = document.querySelector('#row-1');
    row1Elem.innerHTML = '' //  clear out the row-1 inner html
    for (let i = 0; i < arrayCardTime.length; i++) { // insert the card one by one from arrayCardTime
        row1Elem.appendChild(arrayCardTime[i].card);
    }
}