// fetch('http://localhost:8585/recent')
//   .then(result => result.json())
//   .then(data => console.log(data))
//   .catch(err => console.error(err));


function shortenUrl(){
  const url = document.getElementById('longUrl').value;
  const data = {url: url}
  fetch('https://rk-url-shortener-back-end.herokuapp.com/url', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(result => result.json())
    .then(data => {
      console.log(data);
      document.getElementById('shortenedUrl').innerHTML = data;
    })
    .catch(err => console.error(err));
    event.preventDefault();
}  