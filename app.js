window.addEventListener('DOMContentLoaded', async (event) => {
  // const token = localStorage.getItem('token');
  // if(!token){
  //   location.assign("https://u-bit.me/login.html");
  //   console.log('1');
  // } else {
  //   const response = await fetch('https://rk-url-shortener-back-end.herokuapp.com/authenticateSession', {
  //                     method: 'POST',
  //                     headers: {
  //                       'Authorization': `Bearer ${token}`,
  //                       'Content-Type': 'application/json'
  //                     }
  //                   });
  //   if(response.status !== 200){  
  //     location.assign("https://u-bit.me/login.html");
  //   }                
    
  // }
  await getRecentUrls();
  await getRecentAllUrls();
});

const loadingIndicator = document.getElementById('loadingIndicator');
const shortenedUrlResult = document.getElementById('shortenedUrlResult');

async function postLongUrl(postData){  
  const token = localStorage.getItem('token');
  try{
    //https://rk-url-shortener-back-end.herokuapp.com/url
    const response = await fetch('https://rk-url-shortener-back-end.herokuapp.com/url', {
                      method: 'POST',
                      headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify(postData)
                    });
    const data = await response.json();
    await getRecentUrls();
    await getRecentAllUrls();
    showShortenedUrl(data);
  } catch(err){
    loadingIndicator.classList.add('hidden');
    console.error(err);
  }
}

function showShortenedUrl(data){
  loadingIndicator.classList.add('hidden');
  shortenedUrlResult.classList.remove('hidden');
  // console.log(`href ${data.shortenedUrl}`);
  const targetUrl = `${data.shortenedUrl}`;
  document.getElementById('shortenedUrl').href = targetUrl;
  document.getElementById('shortenedUrl').innerHTML = `${data.shortenedUrl}`;
  document.getElementById('originalUrl').innerHTML = data.originalUrl;
  document.getElementById('longUrl').value = '';
}

function shortenUrl(){
  loadingIndicator.classList.remove('hidden');
  document.getElementById('urlHelp').classList.add('hidden');
  shortenedUrlResult.classList.add('hidden');
  const url = document.getElementById('longUrl').value;
  if(!isUrlValid(url)){
    document.getElementById('urlHelp').classList.remove('hidden');
    document.getElementById('longUrl').value = '';
    document.getElementById('longUrl').focus();
    loadingIndicator.classList.add('hidden');
    shortenedUrlResult.classList.remove('hidden');
    return;
  }

  const data = {url: url}
  postLongUrl(data);
  event.preventDefault();
} 

function isUrlValid(str) {
  var res = str.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&=]*)/g);
  if(res == null)
      return false;
  else
      return true;
}

function getRecent(){
  getRecentUrls();
}

function getRecentAll(){
  
  getRecentAllUrls();
}

async function getRecentUrls(){
  document.getElementById('recentTableBody').innerHTML = '';
  const token = localStorage.getItem('token');
  try{
    //https://rk-url-shortener-back-end.herokuapp.com/recent
    // document.getElementById('getRecentBtn').classList.add('hidden');
    const username = 'ravikiransjce.code@gmail.com';
    const response = await fetch(`https://rk-url-shortener-back-end.herokuapp.com/recent`, {
                      method: 'GET',
                      headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                      }
                    });
    const data = await response.json();
    showRecentTable(data, 'recentTableBody');
  } catch(err){
    // document.getElementById('getRecentBtn').classList.remove('hidden');
    document.getElementById('recentTableBody').innerHTML = `<tr>
                                                                <th colspan="2">Please retry to fetch shortened urls</th>
                                                                <th style="text-align:center;"><button class="btn btn-primary float-right" id="getRecentBtn" onclick="getRecent()">Retry</button></th>
                                                                <th></th>
                                                            </tr>`;
    console.error(err);
  }
}

async function getRecentAllUrls(){
  document.getElementById('recentAllTableBody').innerHTML = '';
  // document.getElementById('getRecentAllBtn').classList.add('hidden');
  const token = localStorage.getItem('token');
  try{
    //https://rk-url-shortener-back-end.herokuapp.com/recent
    const response = await fetch('https://rk-url-shortener-back-end.herokuapp.com/recentAll', {
                      method: 'GET',
                      headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                      }
                    });
    const data = await response.json();
    showRecentTable(data, 'recentAllTableBody');
  } catch(err){
    // document.getElementById('getRecentAllBtn').classList.remove('hidden');
    document.getElementById('recentAllTableBody').innerHTML = `<tr>
                                                                    <th colspan="2">Please retry to fetch shortened urls</th>
                                                                    <th style="text-align:center;"><button class="btn btn-primary float-right" id="getRecentAllBtn" onclick="getRecentAll()">Retry</button></th>
                                                                    <th></th>
                                                                </tr>`;
    console.error(err);
  }
}

function showRecentTable(urlInfo, tableId){
  console.log(urlInfo);
  urlInfo.forEach((element, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<tr>
                      <th scope="row">${index + 1}</th>
                      <td>${element.url}</td>
                      <td><a href="https://rk-url-shortener-back-end.herokuapp.com/${element.shortUrl}" target="_blank">${element.shortUrl}</a></td>
                      <td>${element.visitCount}</td>
                    </tr>`;
    const table = document.getElementById(`${tableId}`);
    table.append(tr); 
  });
}

let input = document.getElementById("longUrl");
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) { 
    event.preventDefault();
    document.getElementById("shortenUrlBtn").click();
  }
});


async function logout(){
  const token = localStorage.getItem('token');
  try{
    const url = 'https://rk-url-shortener-back-end.herokuapp.com/logout';
    //const url = 'http://localhost:8585/logout';
    const response = await fetch(url, {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json'
                      }, 
                      body: JSON.stringify({token: token})
                    });
    localStorage.clear();
    location.assign('https://u-bit.me/login.html');
  } catch(err){
    console.log("login error",err);
  }
}

function logoutUser(){
  logout();
}
