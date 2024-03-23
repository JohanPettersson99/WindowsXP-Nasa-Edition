// API-NYCKEL: <qW4luajhvIepZhCX0K47JbYvT16fVvVry2SzzE9P>
// https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=qW4luajhvIepZhCX0K47JbYvT16fVvVry2SzzE9P

//INGA BILDER : https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2015-6-3&api_key=qW4luajhvIepZhCX0K47JbYvT16fVvVry2SzzE9P
//sol=1000
//variabel för api url
const apiUrlNasa =
  "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2020-6-3&api_key=qW4luajhvIepZhCX0K47JbYvT16fVvVry2SzzE9P";
//skapa ref till switch btn
const switchBtn = document.querySelector("#switchBtn");
const bodyRef = document.querySelector("body");

const darkModeKey = "theme-dark";
const darkModeValue = "active";

const nameText = document.querySelector("#name");
const inputText = document.querySelector("#inputText");
const addBtn = document.querySelector("#btn_add");

fetch(apiUrlNasa)
  .then((respons) => respons.json())
  .then((data) => {
    console.log(data);
    const nasaImg = data.photos;
    const imgContainer = document.querySelector(".cardContainer");

    const first4Imgs = nasaImg.slice(0, 4);
    if (first4Imgs.length !== 0) {
      //om detta blir sant betyder det att det finns data
      console.log("Det finns data");
      //skapar en  loop för datan
      first4Imgs.forEach((nasaCard) => {
        //Anropar funktionen som skapar ett nytt kort
        console.log(nasaCard.name);
        //för att skicka data in i en function, sätter jag det i ()
        //lägger i en variabel för att enkelt kunna lägga till i cardContainer
        const newCard = createCard(nasaCard);

        //för att lägga till nya card i container
        imgContainer.append(newCard);
      });
    } else {
      //för att lägga till style och text när data inte kan hämtas från api
      console.log("Tyvärr, det finns ingen data");
      const noImg = document.createElement("h3");
      noImg.classList.add("noCard");
      noImg.textContent =
        "Oh noo, it seems like a alien has stolen our footage of this date...";
      imgContainer.appendChild(noImg);
    }
  })
  .catch((error) => console.log(`detta är felet: ${error}`));

//funktion som skapar upp ett nytt kort
//eftersom vi skickar in data i anropet av funk så skapar jag en variabel i () för att kunna ta emot data
function createCard(nasaCard) {
  // console.log("createCard körs");
  //skapa upp alla html element
  const card = document.createElement("article");
  const fig = document.createElement("figure");
  const image = document.createElement("img");
  const callsign = document.createElement("h3");
  const info = document.createElement("p");

  //begränsar antal cards som visas på sidan
  //lägger klasser på elementen för att kunna styla
  card.classList.add("card");
  fig.classList.add("imgHolder");
  image.classList.add("image");
  callsign.classList.add("callsign");
  info.classList.add("info");

  //hämtar och lägger till text
  callsign.textContent = `NASA Rover Callsign: ${nasaCard.camera.name}`;
  info.textContent = `Date of photo: ${nasaCard.earth_date}`;

  card.appendChild(callsign);
  card.appendChild(info);
  //hämtar och lägger till bild
  image.src = nasaCard.img_src;
  image.alt = "Mars Image";
  card.appendChild(fig);
  fig.appendChild(image);

  // //för att kunna skicka det nya kortet till loop
  return card;
}

//kontrollera om det finns något i localStorage
if (localStorage.getItem(darkModeKey) === darkModeValue) {
  console.log("det finns något i localStorage");
  enabledDarkMode();
}

//lyssnare på klick
switchBtn.addEventListener("click", () => {
  console.log("du clickade på switch");
  // bodyRef.classList.toggle('dark');
  //anropa funktionen som kontrollerar om dark finns
  toggleDarkMode();
});
//skapa en funktion
function toggleDarkMode() {
  //funktion som ska kontrollera om classen dark finns på body
  console.log("toggleDrakMode körs");
  //om body har class dark
  if (bodyRef.classList.contains("dark")) {
    //blir sann om dark finns på body
    console.log("body har klassen dark");
    disabledDarkMode();
  } else {
    console.log("body har inte classen dark");
    //omdark inte finns så vill vi lägga till den
    enabledDarkMode();
  }
}
function enabledDarkMode() {
  //funktion för att lägga till dark
  console.log("enabledDarkMode körs");
  //för att sätta input till checked
  switchBtn.checked = true;
  //lägga till klass på body
  bodyRef.classList.add("dark");
  //anrop till funktion
  setLocalStorage();
}
function disabledDarkMode() {
  //funktion för att ta bort dark
  console.log("disabledDarkMode körs");
  switchBtn.checked = false;
  //ta bort klass på body
  bodyRef.classList.remove("dark");
  //för att ta bort local storage
  removeLocalStorage();
}
function setLocalStorage() {
  //funktion för att ta bort dark
  console.log("setLocalStorage körs");
  localStorage.setItem(darkModeKey, darkModeValue);
}
function removeLocalStorage() {
  //funktion för att ta bort dark
  console.log("removeLocalStorage körs");
  //för att ta bort local storge
  localStorage.removeItem(darkModeKey);
}

// console.log(addBtn);
//Lägga till en lyssnare på addBtn
addBtn.addEventListener("click", () => {
  //Vad ska hända när vi klickar på addBtn
  // console.log('Hej från add');
  //Skapar en ref till input

  //För att hämta värdet i input .value

  //   console.log(inputText.value);
  //lägga till text i ett html element
  nameText.textContent = inputText.value;
  //rensar input på värde
  inputText.value = "";
});

inputText.addEventListener("keyup", () => {
  console.log(inputText.value.length);
  //kontrollera att användaren skrivit 4 tecken
  let getValueLength = inputText.value.length;
  if (getValueLength > 3) {
    console.log("mer än 3 tecken");
    btn_add.disabled = false;
    //btn ska bli enabled
    // btnLogin.disabled = false;
  } else {
    console.log("mindre än 3 tecken");
    btn_add.disabled = true;
    //btn ska bli disabled
    // btnLogin.disabled = true;
  }
});
btn_add.addEventListener("click", () => {
  if (inputText.value === "") {
    console.log("det finns inget");
    btn_add.disabled = true;
  }
});
