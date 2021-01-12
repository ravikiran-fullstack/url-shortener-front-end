let username = '';
let key = ''
const resetPassword = document.getElementById('userResetPassword');
const confirmPassword = document.getElementById('userConfirmResetPassword');

window.addEventListener('DOMContentLoaded', (event) => {
  const queryString = window.location.search;
  //console.log(queryString);
  const urlParams = new URLSearchParams(queryString);
  //console.log(urlParams);

  username = urlParams.get('username')
  console.log('username',username);

  key = urlParams.get('key')
  console.log('key',key);

  console.log('DOM fully loaded and parsed');
});


async function resetPasswordStep2(resetPasswordData){
  try{
    const url = 'https://rk-url-shortener-back-end.herokuapp.com/resetPassword';//
    //const url = 'http://localhost:8585/resetPassword';
    const response = await fetch(url, {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify(resetPasswordData)
                    });
    const data = await response.json();
    validateResetPasswordResponse(data);
  } catch(err){
    console.log("reset password error",err);
  }
}

function validateResetPasswordResponse(data){
  loadingIndicator.classList.add('hidden');
  console.log('validateResetPasswordResponse', data);
}


function resetUserPassword(){
  loadingIndicator.classList.remove('hidden');
  if(resetPassword.value !== confirmPassword.value){
    document.getElementById('passwordMisMatch').classList.remove('hidden');
    document.getElementById('message').innerHTML = "Passwords do not match";
    event.preventDefault();
    return;
  }

  const resetPasswordData = {
    username: username,
    randomKey: key,
    password: resetPassword.value,
    confirmPassword: confirmPassword.value
  }

  resetPasswordStep2(resetPasswordData);

  event.preventDefault();
}