document.getElementById("goToData").onclick = () => {
  location.href = "/logs/all.html";
};

//Initalize Latitude, longitude and name
let lat, long, weather

//Select the submit button
//const button = document.getElementById("submit");
//Add click event Listener to the submit button
//button.addEventListener("click", async (event) => {

  //Data to be sent to the server

//});







//Check if Geolocation is available
if ("geolocation" in navigator) {
  console.log("geolocation available");
  //Get the current position of the device
  navigator.geolocation.getCurrentPosition(async (position) => {
    lat = position.coords.latitude;
    long = position.coords.longitude;
    //Display latitude and longitude in HTML
    document.getElementById("latitude").textContent = lat;
    document.getElementById("longitude").textContent = long;
    
    const api_url = `/weather/${lat},${long}`
    
  

    const response = await fetch(api_url);
    const json = await response.json();
    console.log(json);

    weather = json;
    console.log(weather);

    const city = weather.name;
    const kelvinTemp = weather.main.temp;
    const kelvinFeels = weather.main.feels_like;
    const farenheightTemp = (((kelvinTemp-273.15) * (9/5)) + 32).toFixed(1);
    const farenheightFeels = (((kelvinFeels-273.15) * (9/5)) + 32).toFixed(1);
    console.log(farenheightFeels,farenheightTemp,city)
    document.getElementById('temperature').textContent = farenheightTemp;
    document.getElementById('feelsLike').textContent = farenheightFeels;
    document.getElementById('city').textContent = city;
    // Creating a map and set its view to the current location
    const mymap = L.map("issMap").setView([lat, long], 1);
    //Map attribution
    const attribution =
      '&copy: <a href="https//www.openstreetmap.org/copyright">OpenStreeMap</a> contribtors';
    //Define tile layer for the map
    const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    const tiles = L.tileLayer(tileUrl, { attribution });
    //Add tiles to map
    tiles.addTo(mymap);

    // Making a marker and adding it to the map
    const marker = L.marker([lat, long]).addTo(mymap);
    //set the marker's position to the current location
    marker.setLatLng([lat, long]);



    const data = {
      lat, long, farenheightTemp, farenheightFeels
    }

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };

    const db_responce = await fetch('/api',options);
    const db_json = await db_responce.json();
    console.log(db_json);
  });
} else {
  console.log("geolocation not available");
}


