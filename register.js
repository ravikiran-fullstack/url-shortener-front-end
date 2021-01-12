async function register(registrationData){
  try{
    const url = 'https://rk-url-shortener-back-end.herokuapp.com/register';//
    //const url = 'http://localhost:8585/register';
    const response = await fetch(url, {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify(registrationData)
                    });
    const data = await response.json();
    validateRegistrationResponse(data);
  } catch(err){
    console.log("registration error",err);
  }
}

function validateRegistrationResponse(data){
  console.log('validateRegistrationResponse', data);
  loadingIndicator.classList.add('hidden');
  if(data.message === 'Verification Email Sent Successfully'){
    document.getElementById('registrationMessage').innerHTML = 'Email Sent Successfully, please verify it before login';
    setTimeout(() => {
      location.assign("https://u-bit.me/login.html");
    }, 3000);
  } else if(data.message === 'Username already exists'){
    document.getElementById('registrationMessage').innerHTML = 'User already exists, please try logging in';
  } else {
    document.getElementById('registrationMessage').innerHTML = 'Unknown error, please try again';
  }
}

function registerUser() {
  loadingIndicator.classList.remove('hidden');
  const username = document.getElementById("userEmailRegister").value;
  const password = document.getElementById("userPasswordRegister").value;
  const registrationData = {
    username,
    password
  }
  console.log('registrationData', registrationData);
  register(registrationData);
  event.preventDefault();
}
