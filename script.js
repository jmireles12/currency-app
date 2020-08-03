let imageApi = `https://images-api.nasa.gov/search?q=sunny`

const myHeaders = new Headers();
myHeaders.append("Cookie", "__cfduid=d4d38d3949a73024949360709c4b7c3781595823674");

const requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

function getWeather(city) {
  let weatherApi= `http://api.weatherstack.com/current?access_key=5ac90993b4f558da906c2ec8bb20145a&query=${city}&units=f`
  let imageApi = `https://images-api.nasa.gov/search?q=sunny`
    fetch(weatherApi, requestOptions)
    fetch(imageApi, requestOptions)
  .then(response => response.json())
  .then(result => displayResult(result))
  .catch(error => console.log('error', error));
}

//function getImage(description) {
  //fetch(imageApi, requestOptionsNasa)
  //.then(response => response.json())
  //.then(resultNasa => getImage(resultNasa))
  //.catch(error => console.log('error', error));
 // console.log(resultNasa);
//}

function addHtml() {
  $('.container2').addClass('container');
  $('.results').append(`<h2 class="name"></h2>
    <h3 class="region"></h3>
    <div class="icon"></div>
    <p class="temp"></p>
    <p class="description"></p>
    <p class="feels"></p>
    <p class="humidity"></p>
    <p class="wind"></p>`)
}

function displayResult(result) {
  console.log(result);
  let info = result.current;
  let location = result.location;
  $('.welcome').addClass('hidden');
  if(result.success === false){
    $('.results').text('No city found!')
  }
  else{
    $('.name').text(`${location.name}, ${location.region}`);
    $('.temp').html(`<img src="${info.weather_icons[0]}">    ${info.temperature}ºF`)
    $('.feels').text(`feels like: ${info.feelslike}ºF`);
    $('.description').text(info.weather_descriptions[0]);
    $('.humidity').text(`humidity: ${info.humidity}`);
    $('.wind').text(`wind speed: ${info.wind_speed}`)
  }
}

function getSubmit() {
  $('form').submit(event =>{
    $('.results').empty();
    event.preventDefault();
    console.log('submit')
    let city = $('input[type="text"]').val();
    let description = $('.description')
    addHtml();
    getWeather(city);
    getImage(description);
    $('input[type="text"]').val('');
  })
}

$(function () {
  console.log('App loaded');
  getSubmit();
})