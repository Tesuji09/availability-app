
function auth(e) {
  e.preventDefault()
  const email = $('input[name="email"]').val()
  const password = $('input[name="password"]').val()
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
  $('main').show();
  displayUserData(data);
}

function displayUserData(data) {

}

function submitLogin() {
  $('#login').submit(auth)
}

function login() {
  submitLogin();
}

$(login)
