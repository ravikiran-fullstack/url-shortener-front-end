const usernameLogin = document.getElementById("userEmailLogin");
const passwordLogin = document.getElementById("userPasswordLogin");


window.addEventListener('DOMContentLoaded', async (event) => {
  // const token = localStorage.getItem('token');
  // if(token){
  //   const response = await fetch('https://rk-url-shortener-back-end.herokuapp.com/authenticateSession', {
  //                     method: 'POST',
  //                     headers: {
  //                       'Authorization': `Bearer ${token}`,
  //                       'Content-Type': 'application/json'
  //                     }
  //                   });
  //   if(response.status === 200){  
  //     location.assign("https://u-bit.me/index.html");
  //   }
  // }
});

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
    const data = await response.json();
    validateLoginResponse(data, status);
  } catch(err){
    console.log("login error",err);
  }
}

function validateLoginResponse(data, status){
  console.log('validateLoginResponse', data);
  loadingIndicator.classList.add('hidden');
  if(status === 400){
    usernameLogin.value = '';
    passwordLogin.value = '';
    document.getElementById('invalidCredentialsHelp').classList.remove('hidden');
    document.getElementById('invalidCredentialsHelp').innerHTML = data.message;
  } else if(status === 200){
    localStorage.setItem('token', data.token);
    location.assign('https://u-bit.me/');
  }
}

function loginUser() {
  loadingIndicator.classList.remove('hidden');
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