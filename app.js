const inputForm = document.querySelector(".input-form");
const inputText = document.querySelector(".input-text");

const timelineContainer = document.querySelector(".timeline-container");
const entryText = document.querySelector(".entry-text");

const timelineEntries = [];

let icons = ["&#xf780;", "&#xf2d2;", "&#xf0ac;", "&#xf786;"];

inputForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let timeStamp = new Date();
  let theDate = timeStamp.toLocaleDateString("en-UK", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  let theTime = timeStamp.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  let iconIndex = 0;

  if (timelineEntries.length) {
    let previousEntry = timelineEntries.length - 1;
    let previousIcon = timelineEntries[previousEntry].icon;
    console.log(previousIcon);
    iconIndex = icons.findIndex((item) => {
      return item == previousIcon;
    }) + 1;
    console.log(iconIndex);
    (iconIndex > icons.length - 1 ? iconIndex = 0 : "" ); //We get the icon. So now we find its index and add magic to make it work.
  }
  
  let theIcon = icons[iconIndex];
  addEntry(inputText.value, theDate, theTime, theIcon);
});

function addEntry(text, theDate, theTime, theIcon) {
  if (text !== "") {
    const entry = {
      date: theDate,
      time: theTime,
      icon: theIcon,
      content: text,
    };
    timelineContainer.innerHTML = "";
    timelineEntries.push(entry);
    renderEntries(timelineEntries);

    inputText.value = "";
  }
}

function findIcon() {}

function renderEntries(timelineEntries) {
  timelineContainer.innerHTML = "";

  timelineEntries.forEach(function (item) {
    const div = document.createElement("div");

    div.setAttribute("class", "entry-container");

    div.innerHTML = `
      <div class="line-connecting-dates"></div>
        <div class="entry-date-container">
          <h3 class="entry-date">${item.date},<br>${item.time}</h3>
        </div>
        <div class="line-pointing-to-dates">
          <span class="square side-1"></span>
          <span class="square side-2"></span>
          <span class="square side-3"></span>
          <span class="square side-4"></span>
        </div>
        <div class="entry-input-box">
          <span class="entry-input-content">
            <div class="entry-icon-container">
              <p class="entry-icon"><i class="fa">${item.icon}</i></p>
            </div>
            <p class="entry-text">${item.content}</p>
          </span>
        </div>
      `;

    timelineContainer.append(div);
  });
}
