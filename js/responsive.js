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


// delete a card
let deleteButtons = document.querySelectorAll('.delete');
deleteButtons.forEach(button => {
  button.addEventListener('click', () => {
    let rowElem = button.closest(".row");
    let cardNestedElem = button.closest('.card');
    rowElem.removeChild(cardNestedElem);
  })
})


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
  let rowElem = event.target.closest(".row");
  let cardElem = document.querySelector('.card').cloneNode(true);
  cardElem.id = "card-new";
  let eventNameInput = document.querySelector('#' + rowElem.id + ' #event-name').value;
  let hostNameInput = document.querySelector('#' + rowElem.id + ' #host-name').value;
  let zoomLinkInput = document.querySelector('#' + rowElem.id + ' #zoom-link').value;
  let toDoListInput = document.querySelector('#' + rowElem.id + ' #to-do-list').value;
  let imgInput = document.querySelector('#' + rowElem.id + ' #source').value;
  document.querySelector('#' + rowElem.id + ' #event-name').value = "";
  document.querySelector('#' + rowElem.id + ' #host-name').value = "";
  document.querySelector('#' + rowElem.id + ' #zoom-link').value = "";
  document.querySelector('#' + rowElem.id + ' #to-do-list').value = "";
  document.querySelector('#' + rowElem.id + ' #source').value = "";
  let addButton = document.querySelector('#' + rowElem.id + ' .add-button');
  rowElem.insertBefore(cardElem, addButton);
  document.querySelector("#card-new .card-title").textContent = eventNameInput;
  document.querySelector("#card-new .title").textContent = eventNameInput;
  document.querySelector("#card-new .host").textContent = "Host: " + hostNameInput;
  document.querySelector("#card-new .zoom").textContent = "Zoom Link: " + zoomLinkInput;
  document.querySelector("#card-new .toDo").textContent = "To do List: " + toDoListInput;
  let modalName = 'modal-' + eventNameInput.replace(/\s+/g, '-').toLowerCase();
  document.querySelector("#card-new .modal").id = modalName;
  document.querySelector('#card-new h3').removeAttribute('data-modal-target')
  document.querySelector('#card-new img').removeAttribute('data-modal-target')
  document.querySelector("#card-new img").dataset.modalTarget = '#' + modalName;
  if (checkURL(imgInput)) {
    document.querySelector("#card-new img").src = imgInput;
    document.querySelector("#card-new img").alt = "user uploaded image";
  } else {
    document.querySelector("#card-new img").src = "img/info.png";
    document.querySelector("#card-new img").alt = "default image with nice info logo";
  }
  document.querySelector("#card-new h3").dataset.modalTarget = '#' + modalName;
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
      let cardNestedElem = button.closest('.card');
      rowElem.removeChild(cardNestedElem);
    })
  })
}



// how to set title name 
let editButtons = document.querySelectorAll(".edit-submit");
editButtons.forEach(button => {
  button.addEventListener("click", () => {
    let rowId= button.closest('.row').id;
    let userInputElem = document.querySelector('#' + rowId + " #title-name").value;
    document.querySelector('#' + rowId + " #title-name").value = "";
    let h2Elem = document.querySelector('#' + rowId + " .section-title");
    if(userInputElem.length != 0){
      h2Elem.textContent = userInputElem;
    }
    
  })
})


const modalFlags = [
  "modal-info340", 
  "modal-cse351",
  "modal-math381",
  "modal-sam",
  "modal-tim",
  "modal-marc",
  "modal-dog",
  "modal-7L",
  "modal-lyons"
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
  let imgElem = document.querySelector(modalID).parentElement.children[2];
  let cardTitleElem  = document.querySelector(modalID).parentElement.children[3];
  titleElem.textContent = modal.EventName;
  cardTitleElem.textContent = modal.EventName;
  hostElem.innerHTML = "<strong>Host: </strong>" + modal.HostName;
  toDoElem.innerHTML = "<strong>To Do List: </strong>" + modal.ToDoList;
  zoomElem.innerHTML = "<strong>Zoom Link: </strong>" + "<a href=&quot;" + modal.ZoomLink + "&quot;>" + modal.ZoomLink + "</a>"; 
  imgElem.src = modal.ImageSource;
  imgElem.alt = modal.EventName;
}