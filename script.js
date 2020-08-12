const myHeaders = new Headers();
myHeaders.append("Cookie", "__cfduid=d4d38d3949a73024949360709c4b7c3781595823674");

const requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

function getData(city) {
  let weatherApi= fetch(`https://api.weatherstack.com/current?access_key=5ac90993b4f558da906c2ec8bb20145a&query=${city}_united_states&units=f`);
  let covidApi = fetch(`https://api.covidtracking.com/v1/us/current.json`);

  Promise.all([weatherApi, covidApi]).then(values => {
    return Promise.all(values.map(r => r.json()));
  }).then(([city, covid]) => {
    displayResult(city)
    covidResults(covid)
  }).catch(e => {
    alert('Network Error!');
    console.log(e);
  })
}

function addCityHtml() {
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

function addCovidHtml(){
  $('.covidBox').removeClass('hidden');
  $('.covidBox').append(`<h2 class="title"></h2>
  <section class="covidDetails">
  <p class="date"></p>
  <p class="deaths"></p>
  <p class="positive"></p>
  <p class="ratio"></p>
  </section>`)
}

// adds information for covid section
function covidResults(covid) {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  let yyyy = today.getFullYear();
  today = mm + '/' + dd + '/' + yyyy
  $('.details').addClass('covid')
  $('.title').text('Covid U.S. Stats');
  $('.date').text('Date: ' + today);
  $('.deaths').text('Total deaths: ' + covid[0].death);
  $('.positive').text('Positive cases: ' + covid[0].positive)
  $('.ratio').text('Deaths to Cases Ratio: ' + ((covid[0].death / covid[0].positive) * 100).toFixed(2) + '%');
}


// displays weather information according to city
function displayResult(city) {
  let info = city.current;
  let location = city.location;
  $('.welcome').addClass('hidden');
  if(city.success === false){
    $('.results').text('No city found!')
  }
  else{
    $('.name').text(`${location.name}, ${location.region}`);
    $('.temp').html(`<img src="${info.weather_icons[0]}">    ${info.temperature}ºF`)
    $('.feels').text(`feels like: ${info.feelslike}ºF`);
    $('.description').text(info.weather_descriptions[0]);
    $('.humidity').text(`humidity: ${info.humidity}`);
    $('.wind').text(`wind speed: ${info.wind_speed}`);
  }
}

// makes submit button work and clear information after
// entering another city.
function getSubmit() {
  $('form').submit(event =>{
    $('.results, .covidBox').empty();
    event.preventDefault();
    let city = $('input[type="text"]').val();
    addCityHtml();
    addCovidHtml();
    getData(city);
    $('input[type="text"]').val('');
  })
}

$(function () {
  getSubmit();
})