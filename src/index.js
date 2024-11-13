import displayWeather from "./DomController";

const API_KEY = "QKDDQMN9MAAJ4STHV6WAGERGZ";
async function getWeather(location) {
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=${API_KEY}&contentType=json`,
  );
  const data = await response.json();
  return data;
}

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  getWeather(e.target["location-input"].value).then((data) =>
    displayWeather(data));
  
});
