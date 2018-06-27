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
  const email = $('#form3').val()
  const password = $('#form2').val()
  console.log({email, password})
  $.ajax('/login', {
    method: 'post',
    contentType: 'application/json',
    data: JSON.stringify({ email, password }),
    success: (data) => {
      console.log('first ajax request');
      console.log(data);
      storeJWT(data);
      if(data.user.role.includes('manager')){
        getStorePage()
      } else {
        showEmployeePage(data)
      }
    }
  });
}

function storeJWT(data) {
  localStorage.setItem('authToken', data.authToken);
  localStorage.setItem('email', data.user.email);
  localStorage.setItem('name', data.user.name)
}



function showEmployeePage(data, rData) {
  console.log('goooooo')
  $('#go').hide();
  $('#main').show();
  $('header').show();
  displayEmployeeData(data);
  displayRequestData(rData);
}

function displayEmployeeData(data, rData) {
  $('#welcome').html(`<strong>Welcome ${data.user.name}!</strong>`);
  if(data.user.availability.length > 0) setEmployeeAvailability(data);
}

function submitLogin() {
  $('#login').click(e => {
    e.preventDefault();
    //auth();
    showEmployeePage(mockData, mockRequestData)
  })
}
function setEmployeeAvailability(data) {
  console.log(data.user.availability[0].start)
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
  console.log(currentDate());
}

function sendRequest(date, allDay, startTime, endTime) {
  const authToken = localStorage.getItem('authToken');
  const name = localStorage.getItem('name');
  const request = allDay ? {date, name, allDay} : {date, name, allDay, startTime, endTime}
  $.ajax('/request', {
    method: 'post',
    // beforeSend: function(req) {
    //   req.setRequestHeader('Authorization', 'Bearer ' + authToken)
    // },
    contentType: 'application/json',
    data: JSON.stringify(request),
    success: (data) => {
    }
  });
}

function displayRequestData(rData) {
  const requests = rData.map((request) => {
    console.log(request);
      return(`<tr>
        <td>${request.name}</td>
        <td>${request.date}</td>
        <td>${request.startTime}, ${request.endTime}</td>
        <td>${(request.status === 'accepted') ? request.acceptedBy : '<button type="button" class="btn btn-success">Cover Shift!</button> '}</td>
      </tr>`)
  });
  console.log(requests)
  $('#TORequests').html(requests);
}

function acceptRequest() {

}

function submitRequest() {
  $('#submitRequest').click(e => {
    const date = $('#date').val();
    const allDay = $('#allDay').prop('checked');
    const startTime = $('#startTime').val();
    const endTime = $('#endTime').val();
    console.log(startTime)
    sendRequest(date, allDay, startTime, endTime);
  })
}

function login() {
  submitLogin();
  setDate();
  submitRequest()
}

$(login)
