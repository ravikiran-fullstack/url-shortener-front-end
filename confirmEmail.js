const userEmailReset = document.getElementById('userEmailReset');

async function resetPasswordStep1(resetEmailData){
  try{
    const url = 'https://rk-url-shortener-back-end.herokuapp.com/confirmEmailResetPassword';//'http://localhost:8585/confirmEmailResetPassword';
    const response = await fetch(url, {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify(resetEmailData)
                    });
    const data = await response.json();
    validateResetPasswordResponse(data);
  } catch(err){
    console.log("reset password with email error",err);
  }
}

function validateResetPasswordResponse(data){
  console.log('validateResetPasswordResponse',data);
  if(data.message === "User doesn't  exists"){
    document.getElementById('invalidCredentialsHelp').classList.remove('hidden');
    document.getElementById('invalidCredentialsHelp').innerHTML = "User doesn't exists, please check user email again";
  } else {
    document.getElementById('invalidCredentialsHelp').classList.remove('hidden');
    document.getElementById('invalidCredentialsHelp').innerHTML = "Check your email for reset options";
  }
}

function enterUserEmail(){
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