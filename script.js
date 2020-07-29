var myHeaders = new Headers();
myHeaders.append("Cookie", "__cfduid=d4d38d3949a73024949360709c4b7c3781595823674");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

function getWeather(city) {
    fetch(`http://api.weatherstack.com/current?access_key=5ac90993b4f558da906c2ec8bb20145a&query=${city}&units=f`, requestOptions)
  .then(response => response.json())
  .then(result => displayResult(result))
  .catch(error => console.log('error', error));
}

function displayResult(result) {
  console.log(result)
  $('.cities').empty();
  let info = result.current;
  let location = result.location;
  $('.name').text(location.name);
  $('.region').text(location.region);
  $('.temp').text(`${info.temperature}ºF`);
  $('.feels').text(`feels like: ${info.feelslike}ºF`);
  $('.description').text(info.weather_descriptions[0]);
  $('.humidity').text(`humidity: ${info.humidity}`);
  $('.wind').text(`wind speed: ${info.wind_speed}`)

}

function getSubmit() {
  $('form').submit(event =>{
    event.preventDefault();
    console.log('submit')
    let city = $('input[type="text"]').val();
    getWeather(city)
    $('input[type="text"]').val('');
  })
}

$(function () {
  console.log('App loaded');
  getSubmit();
})