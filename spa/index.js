const mockData = {
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
    {start: '6:00 AM', end: '10:00 PM'},
  ]
}
function auth(e) {
  e.preventDefault()
  const email = $('#form3').val()
  const password = $('#form2').val()
  console.log({email, password})
  $.ajax('/login', {
    method: 'post',
    contentType: 'application/json',
    data: JSON.stringify({ email, password }),
    success: (data) => {
      console.log('first ajax request')
      if(data.role.includes('manager')){
        getStoreData()
      } else {
        getEmployeeData()
      }
      storeJWT(data)
    }
  });
}

function storeJWT(data) {
  localStorage.setItem('authToken', data.authToken);
  localStorage.setItem('email', data.email);
}

function getEmployeeData() {
  const authToken = localStorage.getItem('authToken');
  $.ajax('/employee', {
    method: 'get',
    beforeSend: function(req) {
      req.setRequestHeader('Authorization', 'Bearer ' + authToken)
    },
    success: data => {
        showEmployeePage(data)
      }
    });
}

function getStoreData() {
  const authToken = localStorage.getItem('authToken');
  $.ajax('/store', {
    method: 'get',
    beforeSend: function(req) {
      // req.setRequestHeader("Bearer", authToken)
      req.setRequestHeader('Authorization', 'Bearer ' + authToken)
    },
    success: data => {
      showStorePage(data)
      }
  });
}

function showStorePage() {
  $('main').show()
  $('header').show()
}

function showEmployeePage(data) {
  console.log('goooooo')
  $('#go').hide();
  $('#main').show();
  $('header').show();
  displayEmployeeData(data);
}

function displayEmployeeData(data) {
  $('#welcome').html(`<strong>Welcome ${data.name}!</strong>`);
  setEmployeeAvailability(data);
}

function submitLogin() {
  $('#login').click(e => {
    e.preventDefault();
    showEmployeePage(mockData)
    // auth(e);
  })
}
function setEmployeeAvailability(data) {
  console.log(data.availability[0].start)
  $(`#sunStart option:contains("${data.availability[0].start}")`).prop('selected',true);
  $(`#sunEnd option:contains("${data.availability[0].end}")`).prop('selected',true);
  $(`#monStart option:contains("${data.availability[1].start}")`).prop('selected',true);
  $(`#monEnd option:contains("${data.availability[1].end}")`).prop('selected',true);
  $(`#tueStart option:contains("${data.availability[2].start}")`).prop('selected',true);
  $(`#tueEnd option:contains("${data.availability[2].end}")`).prop('selected',true);
  $(`#wedStart option:contains("${data.availability[3].start}")`).prop('selected',true);
  $(`#wedEnd option:contains("${data.availability[3].end}")`).prop('selected',true);
  $(`#thuStart option:contains("${data.availability[4].start}")`).prop('selected',true);
  $(`#thuEnd option:contains("${data.availability[4].end}")`).prop('selected',true);
  $(`#friStart option:contains("${data.availability[5].start}")`).prop('selected',true);
  $(`#friEnd option:contains("${data.availability[5].end}")`).prop('selected',true);
  $(`#satStart option:contains("${data.availability[6].start}")`).prop('selected',true);
  $(`#satEnd option:contains("${data.availability[6].end}")`).prop('selected',true);
}

function closeModal() {
  $('.close').click((e) => {
    console.log('close button')
    $('#makeRequest').modal('hide');
  });
}

function formatDate() {
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
  $('#date').val(formatDate());
  $('#date').attr('min', formatDate())
  console.log(formatDate());
}

function sendRequest() {
  $.ajax('/login', {
    method: 'put',
    contentType: 'application/json',
    data: JSON.stringify({ email, password }),
    success: (data) => {
      console.log('first ajax request')
      if(data.role.includes('manager')){
        getStoreData()
      } else {
        getEmployeeData()
      }
      storeJWT(data)
    }
  });
}

function submitRequest() {
  $('#submitRequest').click(e => {
    sendRequest(e);
  })
}

function login() {
  submitLogin();
  setDate();
  submitRequest()
}

$(login)
