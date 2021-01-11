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
  if(data.message === 'Verification Email Sent Successfully'){
    setTimeout(() => {
      document.getElementById('registrationMessage').innerHTML = 'Email Sent Successfully, please verify it before login';
      location.assign("https://u-bit.me/login.html");
    }, 3000);
  }
}

function registerUser() {
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
