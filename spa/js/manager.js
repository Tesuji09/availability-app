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
  addUserQuery();
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
        addUserQuery();
      }
   });
  });
}

function closeRequestForm() {
  $('#modalAddUser').on('hidden.bs.modal', e => clearEmpForm())
}

function clearEmpForm() {
  console.log('close request form is working')
  $('#email').val('')
  $('#firstName').val('')
  $('#lastName').val('')
  $('#password').val('')
  $('#reEnterPassword').val('')
}

function displayUser(user) {
  console.log('diplayUser is running')
  $('#avail').append(e => storeInformation(user));
}
function storeInformation(user) {
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
          <section><h6>Monday</h6> <p>${(user.availability[1].start !== 'unavailable') ? 'Start: ' + user.availability[1].start + ' to ' + user.availability[1].end : 'Unavailable'}</p></section><hr>
          <section><h6>Tuesday</h6> <p>${(user.availability[2].start !== 'unavailable') ? 'Start: ' + user.availability[2].start + ' to ' + user.availability[2].end : 'Unavailable'}</p></section><hr>
          <section><h6>Wednesday</h6> <p>${(user.availability[3].start !== 'unavailable') ? 'Start: ' + user.availability[3].start + ' to ' + user.availability[3].end : 'Unavailable'}</p></section><hr>
          <section><h6>Thursday</h6> <p>${(user.availability[4].start !== 'unavailable') ? 'Start: ' + user.availability[4].start + ' to ' + user.availability[4].end : 'Unavailable'}</p></section><hr>
          <section><h6>Friday</h6> <p>${(user.availability[5].start !== 'unavailable') ? 'Start: ' + user.availability[5].start + ' to ' + user.availability[5].end : 'Unavailable'}</p></section><hr>
          <section><h6>Saturday</h6> <p>${(user.availability[6].start !== 'unavailable') ? 'Start: ' + user.availability[6].start + ' to ' + user.availability[6].end : 'Unavailable'}</p></section><hr>
          <button type="button" class="btn btn-danger btn-lg small queryDelete" data-toggle="modal" data-target="#deleteModal">Remove User
          <i class="fa fa-minus-circle ml-2"></i></button>
          </select>
        </div>
        </div>
      </div>
    </div>`);
}

function showStoreData(data) {
  const html = data.allUsers.map( user => {
    if(user.role.includes('manager')) { return null }
    return(storeInformation(user));
  })
  console.log(html)
  $('#avail').html(html)
  $('#welcome').html(`<strong>Welcome ${data.user.name}!</strong>`);
}

function addUserQuery() {
  $('.queryDelete').click(e => {
    deleteUser();
    const id = $(e.target).parents('.employee').data('id');
    console.log(id)
    addId(id);
    console.log('this is the id: ' + id)
  })
}

function addRequestQuery() {
  $('.deleteRequest').click(e => {
    deleteRequest();
    console.log($(e.target).parents('.employee').attr('id'))
    const id = $(e.target).parents('.employee').attr('id');
    addId(id);
    console.log('this is the id: ' + id)
  })
}

function addId(id) {
  $('.remove-user').data('id', id)
}

function deleteUser() {
  $('.remove-user').off();
  $('.remove-user').click(e => {
    const _id = $('.remove-user').data('id')
    const authToken = localStorage.getItem('authToken');
    console.log(_id)
    $.ajax(`/user/delete/${_id}`, {
      method: 'delete',
      beforeSend: function(req) {
        req.setRequestHeader('Authorization', 'Bearer ' + authToken)
      },
      success: (data) => {
        console.log('this is the delete success');
        removeHTML(_id);
      }
   });
  })
}

function deleteRequest() {
  $('.remove-user').off();
  $('.remove-user').click(e => {
    const _id = $('.remove-user').data('id')
    const authToken = localStorage.getItem('authToken');
    console.log(_id)
    $.ajax(`/request/delete/${_id}`, {
      method: 'delete',
      beforeSend: function(req) {
        req.setRequestHeader('Authorization', 'Bearer ' + authToken)
      },
      success: (data) => {
        console.log('this is the delete success');
        removeHTML(_id);
      }
   });
  })
}


function removeHTML(id) {
  $(`#${id}`).remove();
}
