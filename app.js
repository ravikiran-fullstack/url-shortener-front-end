// fetch('http://localhost:8585/recent')
//   .then(result => result.json())
//   .then(data => console.log(data))
//   .catch(err => console.error(err));

const loadingIndicator = document.getElementById('loadingIndicator');
const shortenedUrlResult = document.getElementById('shortenedUrlResult');

async function postLongUrl(postData){  
  try{
    const response = await fetch('https://rk-url-shortener-back-end.herokuapp.com/url', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify(postData)
                    });
    const data = await response.json();
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
  const targetUrl = `https://${data.shortenedUrl}`;
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

async function getRecentUrls(){
  try{
    const response = await fetch('https://rk-url-shortener-back-end.herokuapp.com/url', {
                      method: 'GET',
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify(data)
                    });
    const data = await response.json();
  } catch(err){
    console.error(err);
  }
}

let input = document.getElementById("longUrl");
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) { 
    event.preventDefault();
    document.getElementById("shortenUrlBtn").click();
  }
});

