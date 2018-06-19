
function auth(e) {
  e.preventDefault()
  const email = $('input[name="email"]').val()
  const password = $('input[name="password"]').val()
  console.log({email, password})
  $.ajax('/login', {
    method: 'post',
    contentType: 'application/json',
    data: JSON.stringify({ email, password }),
    success: function(data) {
      localStorage.setItem('authToken', data.authToken);
      localStorage.setItem('email', data.email);
      $.ajax('/login/employee', {
        method: 'get',
        beforeSend: function(req) {
          req.setRequestHeader("Bearer", data.authToken)
        },
        success: function(data) {

        }
      })
    }
  });
}

function submitLogin() {
  $('.login').submit(auth)
}

function login() {
  submitLogin();
}

$(login)
