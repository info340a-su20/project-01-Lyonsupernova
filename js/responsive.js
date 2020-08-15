// Modal click and remove

const openModalButtons = document.querySelectorAll('[data-modal-target]')
const overlays = document.querySelectorAll('.overlay')


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
const deleteButtons = document.querySelectorAll('.delete');
deleteButtons.forEach(button => {
  button.addEventListener('click', () => {
    let rowElem = button.closest(".row");
    let cardNestedElem = button.closest('.card');
    rowElem.removeChild(cardNestedElem);
  })
})


// add a new card from the user input

// select all of the input get values



// build card 
// create a card like element first test


// first select the button submit add event listener and create a card
const submitButtons = document.querySelectorAll(".submit");


submitButtons.forEach (element => {
  element.addEventListener("click", insert, false);
})
  /*submitButtons[1].addEventListener('click', insert);
  submitButtons[2].addEventListener('click', insert);*/
  let j = 10;
function insert(event) {
  let rowElem = event.target.closest(".row");
  let cardElem = document.querySelector('.card').cloneNode(true);
  cardElem.id = "card-new";
  let eventNameInput = document.getElementById('event-name').value;
  let hostNameInput = document.getElementById('host-name').value;
  let zoomLinkInput = document.getElementById('zoom-link').value;
  let toDoListInput = document.getElementById('to-do-list').value;
 


  let addButton = document.querySelector('#' + rowElem.id + ' .add-button');
  rowElem.insertBefore(cardElem, addButton);
  document.querySelector("#card-new .card-title").textContent = eventNameInput;
  document.querySelector("#card-new .card-title").textContent = hostNameInput;
  document.querySelector("#card-new .card-title").textContent = zoomLinkInput;
  document.querySelector("#card-new .card-title").textContent = toDoListInput;
  let modalName =  'modal-' + j;
  j += 1;
  document.querySelector("#card-new .modal").id = modalName;
  document.querySelector("#card-new img").dataset.target = modalName;
  document.querySelector("#card-new h3").dataset.target = modalName;
}



