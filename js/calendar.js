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
    let rowElem = button.closest(".row-main");
    let cardNestedElem = button.closest('.calendar-item');
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
  let timeCardElem = document.querySelectorAll('#row-main-' + i + ' .time-card'); // select a time card element
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
  let row1Elem = document.querySelector('#row-main-' + i);
  row1Elem.innerHTML = '' //  clear out the row-1 inner html
  for (let i = 0; i < arrayCardTime.length; i++) { // insert the card one by one from arrayCardTime
    row1Elem.appendChild(arrayCardTime[i].card);
  }
}



// check url legal
function checkURL(url) {
  return (url.match(/\.(jpeg|jpg|gif|png).*$/) != null);
}

// add a new card from the user input
let submitButtons = document.querySelectorAll(".submit");
submitButtons.forEach(element => {
  element.addEventListener("click", insert, false);
})
// insert
function insert(event) {
  let rowElem = document.querySelector('#row-main-' + event.target.id.slice(-1));
  let cardElem = document.querySelector('.calendar-item').cloneNode(true);
  cardElem.id = "card-new";
  let modayBodyName = event.target.parentElement.id;
  let eventNameInput = document.querySelector('#' + modayBodyName + ' #event-name').value;
  let hostNameInput = document.querySelector('#' + modayBodyName + ' #host-name').value;
  let zoomLinkInput = document.querySelector('#' + modayBodyName + ' #zoom-link').value;
  let toDoListInput = document.querySelector('#' + modayBodyName + ' #to-do-list').value;
  let imgInput = document.querySelector('#' + modayBodyName + ' #source').value;
  let startTimeInput = document.querySelector('#' + modayBodyName + ' #start-time').value;
  let endTimeInput = document.querySelector('#' + modayBodyName + ' #end-time').value;
  document.querySelector('#' + modayBodyName + ' #event-name').value = "";
  document.querySelector('#' + modayBodyName + ' #host-name').value = "";
  document.querySelector('#' + modayBodyName + ' #zoom-link').value = "";
  document.querySelector('#' + modayBodyName + ' #to-do-list').value = "";
  document.querySelector('#' + modayBodyName + ' #source').value = "";
  document.querySelector('#' + modayBodyName + ' #start-time').value = "";
  document.querySelector('#' + modayBodyName + ' #end-time').value = "";
  // let addButton = document.querySelector('#' + rowElem.id + ' .add-button');
  rowElem.appendChild(cardElem);
  document.querySelector("#card-new .content").textContent = eventNameInput;
  document.querySelector("#card-new .title").textContent = eventNameInput;
  document.querySelector("#card-new .host").textContent = "Host: " + hostNameInput;
  document.querySelector("#card-new .zoom").textContent = "Zoom Link: " + zoomLinkInput;
  document.querySelector("#card-new .toDo").textContent = "To do List: " + toDoListInput;
  let firstTwo = startTimeInput.substr(0,2);
  let ampm = firstTwo >= 12 ? "PM":"AM";
  startTimeInput = firstTwo > 12? startTimeInput.replace(firstTwo, parseInt(firstTwo) - 12) : startTimeInput;
  startTimeInput = firstTwo > 9? startTimeInput : startTimeInput.slice(1); // 09:30 => 9:30 
  firstTwo = endTimeInput.substr(0,2); // 10:30 ==> 10
  endTimeInput = firstTwo > 12? endTimeInput.replace(firstTwo, parseInt(firstTwo) - 12) : endTimeInput;
  endTimeInput = firstTwo > 9? endTimeInput : endTimeInput.slice(1);
  document.querySelector("#card-new .time span").textContent = startTimeInput + '-' + endTimeInput + ampm;
  let modalName = 'modal-' + eventNameInput.replace(/\s+/g, '-').toLowerCase();
  document.querySelector("#card-new .modal").id = modalName;
  document.querySelector('#card-new .time-card').removeAttribute('data-modal-target')
  document.querySelector('#card-new .content').removeAttribute('data-modal-target')
  document.querySelector("#card-new .time-card").dataset.modalTarget = '#' + modalName;
  if (checkURL(imgInput)) {
    document.querySelector("#card-new .time-card").style.backgroundImage = imgInput;
  } else {
    document.querySelector("#card-new .time-card").style.backgroundImage = 'url(img/info.png)';;
  }
  document.querySelector("#card-new .content").dataset.modalTarget = '#' + modalName;
  cardElem.removeAttribute('id');
  openModalButtons = document.querySelectorAll('[data-modal-target]')
  overlays = document.querySelectorAll('.overlay')
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
  deleteButtons = document.querySelectorAll('.delete');
  deleteButtons.forEach(button => {
    button.addEventListener('click', () => {
      let rowElem = button.closest(".row");
      let cardNestedElem = button.closest('.calendar-item');
      rowElem.removeChild(cardNestedElem);
    })
  })
  sortTime(event.target.id.slice(-1));
}


// set up the current time 
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];


let currentTimeElem = document.querySelector("#current-time");
let tomorrowTimeElm = document.querySelector("#tomorrow-date");
let futureTimeElem = document.querySelector("#future-date");
let today = new Date();
currentTimeElem.textContent = monthNames[today.getMonth()] + ' ' + today.getDate();
let tomorrow = today.setDate(new Date().getDate() + 1);
tomorrowTimeElm.textContent = monthNames[today.getMonth()] + ' ' + today.getDate();
let future = today.setDate(new Date().getDate() + 2);
futureTimeElem.textContent = monthNames[today.getMonth()] + ' ' + today.getDate();




// AJAX Request 


// 11 cards, json.data == 9 cards 
const modalFlags = [
  "modal-tim", 
  "modal-cse351",
  "modal-info340-tomorrow",
  "modal-math381",
  "modal-info340-future",
  "modal-sam",
  "modal-marc",
  "modal-dog",
  "modal-7L",
  
]

let index = 0;
let getJSONForData = $.getJSON('data/data.json', function (data) {
  data.forEach(card => {
    console.log(card);
    renderCard(card, index);
    index++;
  })
})


function renderCard(modal, i){
  let modalID = "#" + modalFlags[i];
  let titleElem = document.querySelector(modalID + ' .title');
  let hostElem  = document.querySelector(modalID + ' .host');
  let zoomElem  = document.querySelector(modalID + ' .zoom');
  let toDoElem  = document.querySelector(modalID + ' .toDo');
  let textElem  = document.querySelector(modalID).nextElementSibling.nextElementSibling.nextElementSibling;
  titleElem.textContent = modal.EventName;
  hostElem.innerHTML = "<strong>Host: </strong>" + modal.HostName;
  toDoElem.innerHTML = "<strong>To Do List: </strong>" + modal.ToDoList;

  let zoomLinkElem = document.createElement("a");
  zoomLinkElem.setAttribute('href', modal.ZoomLink);
  zoomLinkElem.textContent = modal.ZoomLink;
  zoomElem.innerHTML =  "<strong>Zoom: </strong>";
  zoomElem.appendChild(zoomLinkElem);
  textElem.textContent= modal.EventName;
}