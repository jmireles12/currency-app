var myHeaders = new Headers();
myHeaders.append("Cookie", "__cfduid=d4d38d3949a73024949360709c4b7c3781595823674");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

function getWeather(city) {
    fetch("http://api.weatherstack.com/current?access_key=5ac90993b4f558da906c2ec8bb20145a&query=mcallen", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
}