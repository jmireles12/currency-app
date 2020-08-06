const myHeaders = new Headers();
myHeaders.append("Cookie", "__cfduid=d4d38d3949a73024949360709c4b7c3781595823674");

const requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

function getData(city, covid) {
  let weatherApi= fetch(`http://api.weatherstack.com/current?access_key=5ac90993b4f558da906c2ec8bb20145a&query=${city}&units=f`);
  let covidApi = fetch(`https://api.covidtracking.com/v1/us/current.json`);

  Promise.all([weatherApi, covidApi]).then(values => {
    return Promise.all(values.map(r => r.json()));
  }).then(([city, covid]) => {
    displayResult(city)
    addCovidHtml(covid)
  }).catch(e => {
    console.log('caugth!');
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

function addCovidHtml(covid){
  let covidResults = covid.positive
  console.log(covidResults)
}

function displayResult(city) {
  console.log(city);

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

function getSubmit() {
  $('form').submit(event =>{
    $('.results').empty();
    event.preventDefault();
    console.log('submit')
    let city = $('input[type="text"]').val();
    addCityHtml();
    addCovidHtml()
    getData(city, covid);
    $('input[type="text"]').val('');
  })
}

$(function () {
  console.log('App loaded');
  getSubmit();
})