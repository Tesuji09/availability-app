
function auth(e) {
  e.preventDefault()
  const email = $('input[name="email"]').val()
  const password = $('input[name="password"]').val()
  console.log({email, password})
  $.ajax('/login', {
    method: 'post',
    contentType: 'application/json',
    data: JSON.stringify({ email, password })
    success: function() {
      winow.location.assign('/login/employee')
    }
  }, (data) => {
    return data;
  });
  return true;
}

function submitLogin() {
  $('.login').submit(auth)
}

function login() {
  submitLogin();
}

$(login)
