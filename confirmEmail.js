const userEmailReset = document.getElementById('userEmailReset');

async function resetPasswordStep1(resetEmailData){
  try{
    const url = 'https://rk-url-shortener-back-end.herokuapp.com/confirmEmailResetPassword';
    //const url = 'http://localhost:8585/confirmEmailResetPassword';
    const response = await fetch(url, {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify(resetEmailData)
                    });
    console.log(response);
    const data = await response.json();
    validateResetPasswordResponse(data);
  } catch(err){
    console.log("reset password with email error",err);
  }
}

function validateResetPasswordResponse(data){
  console.log('validateResetPasswordResponse',data);
  loadingIndicator.classList.add('hidden');
  if(data.message === "User doesn't  exists"){
    document.getElementById('invalidCredentialsHelp').classList.remove('hidden');
    document.getElementById('invalidCredentialsHelp').classList.add('failure');
    document.getElementById('invalidCredentialsHelp').innerHTML = "User doesn't exists, please check user email again";
  } else {
    document.getElementById('invalidCredentialsHelp').classList.remove('hidden');
    document.getElementById('invalidCredentialsHelp').classList.add('success');
    document.getElementById('invalidCredentialsHelp').innerHTML = "Check your email for reset options";
  }
}

function enterUserEmail(){
  loadingIndicator.classList.remove('hidden');
  console.log(userEmailReset.value);
  document.getElementById('invalidCredentialsHelp').classList.add('hidden');
  document.getElementById('invalidCredentialsHelp').innerHTML = "";
  username = userEmailReset.value;
  const resetEmailData = {
    username
  }
  resetPasswordStep1(resetEmailData);
  event.preventDefault();
}

document.getElementById('userEmailReset').addEventListener('click', () => {
  document.getElementById('invalidCredentialsHelp').classList.add('hidden');
  document.getElementById('invalidCredentialsHelp').innerHTML = "";
})

function navigateToLogin(){
  location.assign('/login.html');
}