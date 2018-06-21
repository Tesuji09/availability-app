
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
      storeJWT(data)
    }
  });
}

function storeJWT(data) {
  localStorage.setItem('authToken', data.authToken);
  localStorage.setItem('email', data.email);
}

function getUserData(req) {
  const authToken = localStorage.getItem('authToken');
  $.ajax('/login/employee', {
    method: 'get',
    beforeSend: function(req) {
      req.setRequestHeader("Bearer", authToken)
    },
    success: function(data) {
      if(data.includes('manager')){
        showStorePage()
      } else {
        showEmployeePage()
      }
  });
}

function showStorePage() {

}

function showEmployeePage() {
  
}

function submitLogin() {
  $('.login').submit(auth)
}

function login() {
  submitLogin();
}

$(login)
