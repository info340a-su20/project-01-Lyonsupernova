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
