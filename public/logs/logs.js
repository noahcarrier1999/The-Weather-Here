
document.getElementById("home").onclick = () => {
    location.href = "/index.html";
  };

  GetData();
  async function GetData() {
    const response = await fetch("/api");
    const data = await response.json();
    console.log(data);

    for (item of data) {
      const root = document.createElement("div");
      root.classList.add("root");
      const geo = document.createElement("div");
      geo.classList.add("data-item");
      const date = document.createElement("div");
      date.classList.add("data-item");
      const temperature = document.createElement("div");
      temperature.classList.add("data-item");

      // const kTemp= item.weather.main.temp;
      // const kFeels = item.weather.main.feels_like;
      // const temp= (((kTemp-273.15) * (9/5)) + 32).toFixed(1);
      // const feels=(((kFeels-273.15) * (9/5)) + 32).toFixed(1);

     
      geo.textContent = `Location: ${item.lat}°, ${item.long}°`;
      const dateString = new Date(item.timestamp).toLocaleString();
      date.textContent = `Date: ${dateString}`;
      temperature.textContent= `Temperature: ${item.farenheightTemp}° F Feels Like ${item.farenheightFeels}° F`
      

      root.append(geo, date, temperature);
      document.body.append(root);
    }
    console.log(data);
  }