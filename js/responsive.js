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
document.querySelectorAll()


// build card 
// create a card like element first test


// first select the button submit add event listener and create a card
const submitButtons = document.querySelector(".submit-button");
submitButtons.forEach(button => {
  let rowElem = button.closest(".row");
  let cardElem = document.createElement('div');
  cardElem.classList.add('card'); // add card element
  let imgElem = document.createElement('img'); // create image element
  imgElem.alt = "test"  // pass fake value to get test
  imgElem.src = "img/info.png";
  let h3Elem = document.createElement('h3');
  h3Elem.innerText = "test";
  cardElem.appendChild(imgElem); // add img element into card element
  cardElem.appendChild(h3Elem); // add h3 element into card element 
  rowElem.appendChild(cardElem); // add card into the row
  // <img data-modal-target="#modal-info340" src="img/info340.png" alt="Info340 course page">
     //                   <h3 class="card-title" data-modal-target="#modal-info340">Info 340</h3>

})