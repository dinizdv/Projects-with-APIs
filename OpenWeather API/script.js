// select elements from the DOM
const input = document.querySelector("#inputText"); // input for the city name
const btn = document.querySelector("#btnSearch"); // button to search for the weather
const place = document.querySelector("#place"); // element to display the city name and country
const degrees = document.querySelector("#degrees"); // element to display the temperature
const wind = document.querySelector("#wind"); // element to display the wind speed
const img = document.querySelector("#imgWeather"); // element to display the weather image
const content = document.querySelector(".content"); // element to display the weather data

// add an event listener to the button to search for the weather when the button is clicked
btn.addEventListener("click", () => {
 // if the input is empty, return and do nothing
 if (!input.value) return;

 // call the function to fetch the data from the API
 getDataApi();
});

// asynchronous function to fetch the data from the API
async function getDataApi() {
 // create the API URL with the city name and the API key
 // openweathermap.org -> domínio da API + (data/2.5/weather) -> endpoint da localização específica
 // ?q= -> consulta da URL (localização específica)
 // encodeURI -> função que codifica o valor do input do usuário
 // units&metric -> unidades em métricas (Celsius)
 // appid -> autenticar sua aplicação com a API
 let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input.value)}&units=metric&appid=84b6974aa10f564240843838a3c6305c`;

 // tentar executar um bloco
 try {
     // make the request to the API
     // await -> pausar o código até que a promise seja resolvida ou rejeitada
     // fetch -> requisição à URL fornecida
     const res = await fetch(url);
          // ler o corpo da resposta e analisá-lo como JSON
     const data = await res.json();

     // if the API response is an error (code 404), display an alert
     // data existe? data tem propriedade chamada 'cod'? data é igual a '404'? false or true
     if (data?.cod && data.cod === '404') {
         return alert('Location not found!');
     }

     // call the function to display the data
     loadData(data);
 } catch (error) {
     // if there is an error in the request, display the error
     alert(error);
 }
}

// function to display the data
function loadData(data) {
 // display the city name and country
 place.innerHTML = `${data.name}, ${data.sys.country}`;

 // display the temperature
 degrees.innerHTML = `Temperature: ${Math.floor(data.main.temp)} °C`;

 // set the appropriate image based on the temperature
 if (data.main.temp < 5) {
     img.src = `Images/Cold.png`;
 } else if (data.main.temp >= 6 && data.main.temp <= 17) {
     img.src = `Images/Cloud.png`;
 } else if (data.main.temp >= 18 && data.main.temp < 25) {
     img.src = `Images/SunWithCloud.png`;
 } else if (data.main.temp >= 25) {
     img.src = `Images/Sun.png`;
 }

 // display the wind speed
 wind.innerHTML = `Wind: ${data.wind.speed} km/h`;

 // display the content
 content.style.display = 'flex';
}
