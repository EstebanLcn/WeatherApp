let city;

if("geolocation" in navigator) {
  navigator.geolocation.watchPosition((position) => {
    
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat='
        + position.coords.latitude + '&lon='
        + position.coords.longitude + '&appid=dc8c9152e8adaad0ec8bf635818c0d42&units=metric';
    
    let requete = new XMLHttpRequest(); 
    requete.open('GET', url);
    requete.responseType = 'json';
    requete.send();

    requete.onload = function() {
      if (requete.readyState === XMLHttpRequest.DONE) {
        if (requete.status === 200) {
          let reponse = requete.response;
          let temperature = reponse.main.temp;
          let ville       = reponse.name;
          document.querySelector('#temp_label').textContent = temperature;
          document.querySelector('#city').textContent = ville;
        }
        else {
          alert('Something went wrong, please come back later.');
        }
      }
    }
  }, error, options);
  
  
}
else {
  city = "Paris";
  callTemp(city);
}

let changeCity = document.querySelector('#change');
changeCity.addEventListener('click', () => {
  city = prompt('Wich city do you want to see ?');
  callTemp(city);
});



function callTemp(ville) {
  const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + ville + '&appid=dc8c9152e8adaad0ec8bf635818c0d42&units=metric';

  let request = new XMLHttpRequest(); // Nous créons un objet qui nous permettra de faire des requêtes
  request.open('GET', url); // Nous récupérons juste des données
  request.responseType = 'json'; // Nous attendons du JSON
  request.send(); // Nous envoyons notre requête

  // Dès qu'on reçoit une réponse, cette fonction est executée
  request.onload = function() {
    if (request.readyState === XMLHttpRequest.DONE) {
      if (request.status === 200) {
        let response = request.response;
        // console.log(reponse);
        let tmp = response.main.temp;
        let cityResponse       = response.name;
        // console.log(temperature);
        document.querySelector('#temp_label').textContent = tmp;
        document.querySelector('#city').textContent = cityResponse;
      }
      else {
        alert('Something went wrong, please come back later.');
      }
    }
  }
}
function error() {
  city = "Biarritz";
  callTemp(city);
}
var options = {
  enableHighAccuracy: true
}