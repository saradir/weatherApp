export default function displayWeather(data) {
  const weatherTable = document.querySelector("#weather-table");
  weatherTable.innerHTML = "";
  for (let i = 0; i < 7; i += 1) {
    const { tempmax, tempmin, conditions, description, icon, datetime } =
      data.days[i];

    const dayDiv = document.createElement("div");
    dayDiv.className = "day";
    dayDiv.dataset.description = description;
    dayDiv.dataset.conditions = conditions;

    const title = document.createElement("h2");
    const iconIMG = document.createElement("img");
    const tempDiv = document.createElement("div");
    const tempmaxSpan = document.createElement("span");
    const tempminSpan = document.createElement("span");

    title.className = "dayTitle";
    iconIMG.className = "weatherIcon";
    iconIMG.title = conditions;
    tempDiv.className = "temp";
    tempmaxSpan.className = "tempmax";
    tempminSpan.className = "tempmin";

    title.textContent = getDay(datetime);
    loadIcon(icon)
      .then((src) => {
        iconIMG.src = src;
      })
      .catch(console.log("failed to load icon"));

    tempmaxSpan.textContent = tempmax;
    tempminSpan.textContent = tempmin;

    tempDiv.appendChild(tempmaxSpan);
    tempDiv.appendChild(tempminSpan);
    dayDiv.appendChild(title);
    dayDiv.appendChild(iconIMG);
    dayDiv.appendChild(tempDiv);
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
