// Fetch API information
fetch('https://randomuser.me/api/?nat=us&results=12')
  .then((response) => { return response.json() })
  .then(data => { generateCard(data) })

// Function to create a generate a card with employee information
function generateCard (data) {
  data.results.forEach((employee) => {
    const card = document.createElement('DIV')
    const fullName = `${employee.name.first} ${employee.name.last}`

    const generateGallery =
     `<div class="card-img-container">
     <img class="card-img" src="${employee.picture.large}" alt="profile picture">
   </div>
   <div class="card-info-container">
     <h3 id="name" class="card-name" cap">${fullName}</h3>
     <p class="card-text">${employee.email}</p>
     <p class="card-text" cap>${employee.location.city}</p>
   </div>`

    card.className = 'card'
    card.insertAdjacentHTML('beforeend', generateGallery)
    card.addEventListener('click', () => createModal(employee))
    document.querySelector('#gallery').insertAdjacentElement('beforeend', card)
  })
}
// Function to create a modal with additional data for the employee
function createModal (employees) {
  const modal = document.createElement('DIV')
  const loc = employees.location
  const street = `${loc.street.number} ${loc.street.name}`
  const fullName = `${employees.name.first} ${employees.name.last}`
  const birthday = employees.dob.date
  const month = birthday.substr(5, 2)
  const day = birthday.substr(8, 2)
  const year = birthday.substr(2, 2)
  const configureBday = `${month}/${day}/${year}`

  const generateModal = `
  <div class="modal">
  <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
  <div class="modal-info-container">
    <img class="modal-img" src="${employees.picture.large}" alt="profile picture">
    <h3 id="name" class="modal-name cap">${fullName}</h3>
    <p class="modal-text">${employees.email}</p>
    <p class="modal-text cap">${loc.city}</p>
    <hr>
    <p class="modal-text">${employees.cell.replace(/-/, ' ')}</p>
    <p class="modal-text">${street}, ${loc.state} ${loc.postcode}</p>
    <p class="modal-text">Birthday: ${configureBday}</p>
  </div>
</div>`

  modal.className = 'modal-container'

  modal.insertAdjacentHTML('beforeend', generateModal)
  document.body.insertAdjacentElement('beforeend', modal)
  // Closes Modal once clicked
  document.querySelector('#modal-close-btn').addEventListener('click', () => {
    modal.remove()
  })
}
