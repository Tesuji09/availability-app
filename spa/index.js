const mockData = {
user:{
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
  ]}
}

const mockRequestData = [
  {
    name: 'Joshua Zuo',
    date: "2018-07-18",
    allDay: true,
    startTime: "6:00 AM",
    endTime: "10:00 PM",
    status: 'accepted',
    acceptedBy: 'Jim Bob'
  },
  {
    name: 'Jenny Kim',
    date: "2018-07-18",
    allDay: false,
    startTime: "6:00 AM",
    endTime: "10:00 PM",
    status: 'pending',
    acceptedBy: ''
  }
]




function auth() {
  const email = $('#form1').val();
  const password = $('#form2').val();
  $.ajax('/login', {
    method: 'post',
    contentType: 'application/json',
    data: JSON.stringify({ email, password }),
    success: (data) => {
      storeJWT(data);
      if(data.user.role.includes('manager')){
        showStorePage(data);
        getRequestData();
      } else {
        showEmployeePage(data);
        getRequestData();
      }
    },
    error: (error) => {
      $('#loginWarning').html('Invalid email or password');
    }
  });
}

function getRequestData() {
  const authToken = localStorage.getItem('authToken')
  $.ajax('/request', {
    method: 'get',
    beforeSend: function(req) {
      req.setRequestHeader('Authorization', 'Bearer ' + authToken)
    },
    success: (data) => {
        displayRequestData(data);
    }
  });
}

function storeJWT(data) {
  localStorage.setItem('authToken', data.authToken);
  localStorage.setItem('email', data.user.email);
  localStorage.setItem('name', data.user.name);
  localStorage.setItem('id', data.user._id);
  localStorage.setItem('role', data.user.role);
  localStorage.setItem('data', JSON.stringify(data))
}



function showEmployeePage(data) {
  $('#go').hide();
  $('#main').show();
  $('header').show();
  displayEmployeeData(data);
}

function displayEmployeeData(data) {
  $('#welcome').html(`<strong>Welcome ${data.user.name}!</strong>`);
  if(data.user.availability.length > 0) setEmployeeAvailability(data);
}

function submitLogin() {
  $('#login').click(e => {
    e.preventDefault();
    auth();
    // showEmployeePage(mockData, mockRequestData)
    // showStorePage(mockStoreData)
  })
}
function setEmployeeAvailability(data) {
  $(`#sunStart option:contains("${data.user.availability[0].start}")`).prop('selected',true);
  $(`#sunEnd option:contains("${data.user.availability[0].end}")`).prop('selected',true);
  $(`#monStart option:contains("${data.user.availability[1].start}")`).prop('selected',true);
  $(`#monEnd option:contains("${data.user.availability[1].end}")`).prop('selected',true);
  $(`#tueStart option:contains("${data.user.availability[2].start}")`).prop('selected',true);
  $(`#tueEnd option:contains("${data.user.availability[2].end}")`).prop('selected',true);
  $(`#wedStart option:contains("${data.user.availability[3].start}")`).prop('selected',true);
  $(`#wedEnd option:contains("${data.user.availability[3].end}")`).prop('selected',true);
  $(`#thuStart option:contains("${data.user.availability[4].start}")`).prop('selected',true);
  $(`#thuEnd option:contains("${data.user.availability[4].end}")`).prop('selected',true);
  $(`#friStart option:contains("${data.user.availability[5].start}")`).prop('selected',true);
  $(`#friEnd option:contains("${data.user.availability[5].end}")`).prop('selected',true);
  $(`#satStart option:contains("${data.user.availability[6].start}")`).prop('selected',true);
  $(`#satEnd option:contains("${data.user.availability[6].end}")`).prop('selected',true);
}


function currentDate() {
  let today = new Date();
  let dd = today.getDate()+1;

  let mm = today.getMonth()+1;
  let yyyy = today.getFullYear();
  if(dd<10)
  {
      dd='0'+dd;
  }

  if(mm<10)
  {
      mm='0'+mm;
  }
  today = yyyy+'-'+mm+'-'+dd;
  return today;
}

function setDate() {
  $('#date').val(currentDate());
  $('#date').attr('min', currentDate())
}

function sendRequest(date, allDay, startTime, endTime) {
  const authToken = localStorage.getItem('authToken');
  const name = localStorage.getItem('name');
  const request = allDay ? {date, name, allDay} : {date, name, allDay, startTime, endTime}
  $.ajax('/request', {
    method: 'post',
    beforeSend: function(req) {
      req.setRequestHeader('Authorization', 'Bearer ' + authToken)
    },
    contentType: 'application/json',
    data: JSON.stringify(request),
    success: (data) => {
      $('#TORequests').append(requestHTML(data))
    },
    error: (error) => {

    }
  });
}

function displayRequestData(rData) {
  if(rData.requests.length > 0) {
    const requests = rData.requests.map((request) => {
      return(requestHTML(request));
  });
  $('#TORequests').html(requests);
  addRequestDeleteQuery();
  addConfirmation();
  }
}

function requestHTML(request) {
  return (`<tr class="employee" id ="${request._id}">
    <td>${request.name}</td>
    <td>${request.date}</td>
    <td>${(request.startTime === undefined || request.startTime === 'N/A') ? "All Day" : request.startTime + " to " + request.endTime}</td>
    <td id="button">${requestButton(request)}</td>
  </tr>`)
}

function requestButton(request) {
  if(!localStorage.getItem('role').includes('manager')) {
  return (request.status === 'accepted') ? request.acceptedBy : '<button type="button" class="btn btn-success acceptRequest" data-toggle="modal" data-target="#acceptModal">Cover Shift!</button> '
  } else {
    return (request.status === 'accepted') ? request.acceptedBy + '<button type="button" class="btn btn-danger deleteRequest" data-toggle="modal" data-target="#deleteModal">Delete!</button>' : '<button type="button" class="btn btn-danger deleteRequest" data-toggle="modal" data-target="#deleteModal">Delete!</button> '
}
}

function acceptRequest(id) {
  $('.accept-request').click( e => {
    const authToken = localStorage.getItem('authToken');
    const name = localStorage.getItem('name');
    $.ajax('/request', {
      method: 'put',
      beforeSend: function(req) {
        req.setRequestHeader('Authorization', 'Bearer ' + authToken)
      },
      contentType: 'application/json',
      data: JSON.stringify({ id, acceptedBy: name, status: 'accepted' }),
      success: (data) => {
        changeRequestState(name, id);
      }
    });
  })
}

function addConfirmation() {
  $('.acceptRequest').click(e => {
    const id = $(e.target).parents('.employee').attr('id');
    $('.accept-request').off();
    acceptRequest(id);
  })
}

function changeRequestState(name, id) {
  $(`#${id}`).children('#button').html(`${name}`)
}

function addRequest(rData) {
  const requests = rData.requests.map((request) => {
    return(requestHTML(request))
});
$('#TORequests').html(requests);
}

function submitRequest() {
  $('#submitRequest').click(e => {
    const date = $('#date').val();
    const allDay = $('#allDay').prop('checked');
    const startTime = $('#startTime').val();
    const endTime = $('#endTime').val();
    sendRequest(date, allDay, startTime, endTime);
    clearRequestForm();
  })
}

function closeRequestForm() {
  $('#makeRequest').on('hidden.bs.modal', e => clearRequestForm())
}

function toggleAllDay() {
  $('#allDay').change(e => {
    if ($('#allDay').prop('checked')) {
      $('#startTime option:contains("N/A")').prop('selected', true);
      $('#startTime').attr('disabled', true);
      $('#endTime option:contains("N/A")').prop('selected', true);
      $('#endTime').attr('disabled', true);
    } else {
      $('#startTime').attr('disabled', false);
      $('#endTime').attr('disabled', false);
    }
  })
}

function clearRequestForm() {
  $('#date').val($('#date').defaultValue)
  $('#allDay').prop('checked', false)
  $('#startTime option:contains("N/A")').prop('selected', true);
  $('#endTime option:contains("N/A")').prop('selected', true);
}


function saveEmployeeAvailability() {
  const authToken = localStorage.getItem('authToken');
  const id = localStorage.getItem('id');
  $('#saveAvail').click((e) => {
    function availabilityData() {
      return ([
        {start: $('#sunStart option:selected').val(), end: $('#sunEnd option:selected').val()},
        {start: $('#monStart option:selected').val(), end: $('#monEnd option:selected').val()},
        {start: $('#tueStart option:selected').val(), end: $('#tueEnd option:selected').val()},
        {start: $('#wedStart option:selected').val(), end: $('#wedEnd option:selected').val()},
        {start: $('#thuStart option:selected').val(), end: $('#thuEnd option:selected').val()},
        {start: $('#friStart option:selected').val(), end: $('#friEnd option:selected').val()},
        {start: $('#satStart option:selected').val(), end: $('#satEnd option:selected').val()}
      ])
    }
    const newData = {
      id,
      availability: availabilityData()
    }
    console.log(newData)
      $.ajax('/user/edit', {
      method: 'put',
      beforeSend: function(req) {
        req.setRequestHeader('Authorization', 'Bearer ' + authToken)
      },
      contentType: 'application/json',
      data: JSON.stringify(newData),
      success: (data) => {
        console.log(data);
      },
      error: (error) => {
        alert('server error please contact server admin')
      }
    });
  })
}

function checkState() {
  const data = JSON.parse(localStorage.getItem('data'))
  if(data !== null) {
    $.ajax(`/user/employee/${localStorage.getItem('id')}`, {
      method: 'get',
      beforeSend: function(req) {
        req.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('authToken'))
      },
      success: (confirmation) => {
        if(data.user.role.includes('manager')){

          showStorePage(data);
          getRequestData();
        } else {
          showEmployeePage(data);
          getRequestData();
        }
      },
      error: (error) => {
        logout()
      }
    });
  }
  login();
  logout();
}

function logout() {
  $('#logout').click(() => {
    localStorage.clear();
    window.location.reload();
});
}

function login() {
  submitLogin();
  setDate();
  submitRequest();
  toggleAllDay();
  saveEmployeeAvailability();
  closeRequestForm();
}

$(checkState)
