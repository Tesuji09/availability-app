const mockStoreData = [
  {
  email : 'josh@yahoo.com',
  name : "Joshua Zuo",
  role: ['employee'],
  availability: [
    {start: '6:00 AM', end: '10:00 PM'},
    {start: '6:00 AM', end: '10:00 PM'},
    {start: '6:00 AM', end: '10:00 PM'},
    {start: '6:00 AM', end: '10:00 PM'},
    {start: '6:00 AM', end: '10:00 PM'},
    {start: '6:00 AM', end: '10:00 PM'},
    {start: '6:00 AM', end: '10:00 PM'}
  ]},
    {
    email : 'jim@yahoo.com',
    name : "Jim Bob",
    role: ['employee'],
    availability: [
      {start: '6:00 AM', end: '10:00 PM'},
      {start: '6:00 AM', end: '10:00 PM'},
      {start: '6:00 AM', end: '10:00 PM'},
      {start: '6:00 AM', end: '10:00 PM'},
      {start: '6:00 AM', end: '10:00 PM'},
      {start: '6:00 AM', end: '10:00 PM'},
      {start: '6:00 AM', end: '10:00 PM'}
    ]}
]




function showStorePage(data) {
  console.log('showstorepage')
  showStoreData(data);
  $('#go').hide();
  $('main').show();
  $('header').show();
  $('#question').replaceWith(
    `<button type="submit" class="btn btn-outline-white btn-lg" id="toggleAdd" data-toggle="modal" data-target="#modalAddUser">Add Employee
      <i class="fa fa-user-plus ml-2"></i>
    </button>`
  );
  $('#saveAvail').remove()
  addUser();
  deleteUser();
}

function addUser() {
  $('#addEmp').click((e) => {
    e.preventDefault();
    const authToken = localStorage.getItem('authToken');
    const email = $('#email').val();
    const name = `${$('#firstName').val()} ${$('#lastName').val()}`;
    const password = $('#password').val();
    console.log( { name, email, password })
    $.ajax('/user/employee', {
      method: 'post',
      beforeSend: function(req) {
        req.setRequestHeader('Authorization', 'Bearer ' + authToken)
      },
      contentType: 'application/json',
      data: JSON.stringify({ name, email, password }),
      success: (data) => {
        console.log(data);
        displayUser(data);
      }
   });
    displayUser();
  });
}

function closeRequestForm() {
  $('#modalAddUser').on('hidden.bs.modal', e => clearEmpForm())
}

function clearEmpForm() {
  $('#email').val('')
  $('#firstName').val('')
  $('#lastName').val('')
  $('#password').val('')
  $('#reEnterPassword').val('')
}

function displayUser(user) {
  $('#avail').append(e => {
    return(
      `<div class="col-lg-3 col-md-12 mb-4" data-id="${user.id}" id="${user.id}">
        <div class="card">
          <div class="card-header">
            <h4 class="btn btn-in w-100 text-muted" data-toggle="collapse" data-target="#${user.name.replace(/\s+/g, '')}Info" aria-expanded="false" aria-controls="${user.name.replace(/\s+/g, '')}Info">
              <strong>${user.name}</strong>
            </h4>
          </div>
          <div class="collapse" id="${user.name.replace(/\s+/g, '')}Info">
          <div class="card-body text-muted">
            <section><h6>Sunday</h6> <p>${(user.availability[0].start !== 'unavailable') ? 'Start: ' + user.availability[0].start + ' to ' + user.availability[0].end : 'Unavailable'}</p></section><hr>
            <section><h6>Monday</h6> <p>${(user.availability[1].start !== 'unavailable') ? 'Start: ' + user.availability[1].start + ' to ' + user.availability[0].end : 'Unavailable'}</p></section><hr>
            <section><h6>Tuesday</h6> <p>${(user.availability[2].start !== 'unavailable') ? 'Start: ' + user.availability[2].start + ' to ' + user.availability[0].end : 'Unavailable'}</p></section><hr>
            <section><h6>Wednesday</h6> <p>${(user.availability[3].start !== 'unavailable') ? 'Start: ' + user.availability[3].start + ' to ' + user.availability[0].end : 'Unavailable'}</p></section><hr>
            <section><h6>Thursday</h6> <p>${(user.availability[4].start !== 'unavailable') ? 'Start: ' + user.availability[4].start + ' to ' + user.availability[0].end : 'Unavailable'}</p></section><hr>
            <section><h6>Friday</h6> <p>${(user.availability[5].start !== 'unavailable') ? 'Start: ' + user.availability[5].start + ' to ' + user.availability[0].end : 'Unavailable'}</p></section><hr>
            <section><h6>Saturday</h6> <p>${(user.availability[6].start !== 'unavailable') ? 'Start: ' + user.availability[6].start + ' to ' + user.availability[0].end : 'Unavailable'}</p></section><hr>
            <button type="button" class="btn btn-outline-white btn-danger btn-lg">Remove User
  -              <i class="fa fa-minus-circle ml-2"></i>
            </select>
          </div>
          </div>
        </div>
      </div>`);
  })
  deleteUser();
}


function showStoreData(data) {
  const html = data.allUsers.map( user => {
  return(
    `<div class="col-lg-3 col-md-12 mb-4 employee" data-id="${user._id}" id="${user._id}">
      <div class="card">
        <div class="card-header">
          <h4 class="btn btn-in w-100 text-muted" data-toggle="collapse" data-target="#${user.name.replace(/\s+/g, '')}Info" aria-expanded="false" aria-controls="${user.name.replace(/\s+/g, '')}Info">
            <strong>${user.name}</strong>
          </h4>
        </div>
        <div class="collapse" id="${user.name.replace(/\s+/g, '')}Info">
        <div class="card-body text-muted">
          <section><h6>Sunday</h6> <p>${(user.availability[0].start !== 'unavailable') ? 'Start: ' + user.availability[0].start + ' to ' + user.availability[0].end : 'Unavailable'}</p></section><hr>
          <section><h6>Monday</h6> <p>${(user.availability[1].start !== 'unavailable') ? 'Start: ' + user.availability[1].start + ' to ' + user.availability[0].end : 'Unavailable'}</p></section><hr>
          <section><h6>Tuesday</h6> <p>${(user.availability[2].start !== 'unavailable') ? 'Start: ' + user.availability[2].start + ' to ' + user.availability[0].end : 'Unavailable'}</p></section><hr>
          <section><h6>Wednesday</h6> <p>${(user.availability[3].start !== 'unavailable') ? 'Start: ' + user.availability[3].start + ' to ' + user.availability[0].end : 'Unavailable'}</p></section><hr>
          <section><h6>Thursday</h6> <p>${(user.availability[4].start !== 'unavailable') ? 'Start: ' + user.availability[4].start + ' to ' + user.availability[0].end : 'Unavailable'}</p></section><hr>
          <section><h6>Friday</h6> <p>${(user.availability[5].start !== 'unavailable') ? 'Start: ' + user.availability[5].start + ' to ' + user.availability[0].end : 'Unavailable'}</p></section><hr>
          <section><h6>Saturday</h6> <p>${(user.availability[6].start !== 'unavailable') ? 'Start: ' + user.availability[6].start + ' to ' + user.availability[0].end : 'Unavailable'}</p></section><hr>
          <button type="button" class="btn btn-outline-white btn-danger btn-lg remove-user">Remove User
-              <i class="fa fa-minus-circle ml-2"></i>
          </select>
        </div>
        </div>
      </div>
    </div>`);
  })
  $('#avail').html(html)
  $('#welcome').html(`<strong>Welcome ${data.user.name}!</strong>`);
}

function deleteUser() {
  $('.remove-user').click(e => {
    const authToken = localStorage.getItem('authToken');
    const id = $(e.target).parents('.employee').data()
    $.ajax(`/user/delete/${id}`, {
      method: 'delete',
      beforeSend: function(req) {
        req.setRequestHeader('Authorization', 'Bearer ' + authToken)
      },
      success: (data) => {
        console.log('this is the delete success');
        removeUser(id);
      }
   });
  })
}

function removeUser(id) {
  $(`#${id}`).remove();
}
