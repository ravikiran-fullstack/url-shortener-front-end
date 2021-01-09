const usernameLogin = document.getElementById("userEmailLogin");
const passwordLogin = document.getElementById("userPasswordLogin");
async function login(loginData){
  try{
    const url = 'https://rk-url-shortener-back-end.herokuapp.com/login';
    //const url = 'http://localhost:8585/login';
    const response = await fetch(url, {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify(loginData)
                    });
    const status = response.status; 
    console.log('res', response);
   // console.log('cookies', response.cookie);
    const data = await response.json();
    validateLoginResponse(data, status);
  } catch(err){
    console.log("login error",err);
  }
}

function validateLoginResponse(data, status){
  console.log('validateLoginResponse', data);
  if(status === 400){
    usernameLogin.value = '';
    passwordLogin.value = '';
    document.getElementById('invalidCredentialsHelp').classList.remove('hidden');
  } else if(status === 200){
    localStorage.setItem('token', data.token);
    // console.log(localStorage);
    localStorage.assign('https://u-bit.me/');
  }
}

function loginUser() {
  const username = usernameLogin.value;
  const password = passwordLogin.value;
  // location.replace('/register.html');
  const loginData = {
    username, 
    password
  }
  console.log(loginData);
  login(loginData);
  event.preventDefault();
}

document.querySelector('#userEmailLogin').addEventListener("click", event => {
  document.getElementById('invalidCredentialsHelp').classList.add('hidden');
});

document.querySelector('#userPasswordLogin ').addEventListener("click", event => {
  document.getElementById('invalidCredentialsHelp').classList.add('hidden');
});