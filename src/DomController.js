export default function displayWeather(data) {
  const weatherTable = document.querySelector("#weather-table");
  for (let i = 0; i < 7; i += 1) {
    const dayDiv = document.createElement("div");
    const title = document.createElement("h2");
    const iconIMG = document.createElement("img");
    const tempDiv = document.createElement("div");
    const tempmaxSpan = document.createElement("span");
    const tempminSpan = document.createElement("span");
    console.log(data.days[i]);
    const {tempmax, tempmin, conditions, description, icon, datetime } = data.days[i];

    title.textContent = getDay(datetime);
    loadIcon(icon).then((src) =>{
      iconIMG.src = src;
    });
    tempmaxSpan.textContent = tempmax;
    tempminSpan.textContent = tempmin;

    tempDiv.appendChild(tempmaxSpan).appendChild(tempminSpan);
    dayDiv.appendChild(title).appendChild(iconIMG).appendChild(tempDiv);
    weatherTable.appendChild(dayDiv);
  }
}

// helper function that recieves a date and returns the day of the week in a shortened form
function getDay(date) {
  const day = new Date(date);
  const options = { weekday: "short" };
  const dayOfWeek = day.toLocaleDateString("en-US", options);
  return dayOfWeek;
}

async function loadIcon(iconName){
  const module = await import(`./icons/${iconName}.svg`);
  return module.default;
}
