function mapInit() {
  // follow the Leaflet Getting Started tutorial here
  return map;
}

async function dataHandler(mapObjectFromFunction) {
  // use your assignment 1 data handling code here
  // and target mapObjectFromFunction to attach markers
// script starts here (from A1)
const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
const foodPlace = [];
fetch(endpoint).then(blob => blob.json())
.then(data => foodPlace.push(...data))


function findMatches(searchQuery){
    return foodPlace.filter(place => {
        const regex = new RegExp(searchQuery, 'gi'); //regExp is an object that goes into .match method
        return place.city.match(regex) || place.category.match(regex)|| place.name.match(regex);
    });
}

function displayMatches(){
    const matchArr = findMatches(this.value); //this.value is the data being input in the form
    const html = matchArr.map(palce => { //.map creates an array with equal size but replaces the values with this instead
        return `
        <li>
            <span class="name">${place.name}</span>
            <span class="name">${place.city}</span>
            <span class="name">${place.rodent_and_insects}</span>
        </li>
        `;

    }).join(''); //This changes html from an array to a big string

    suggestions.innerHTML = html; //takes the html strong from html and creates html in this element
}

const searchInput = document.querySelector('.search'); //This chooses an element with the class search
const suggestions = document.querySelector('.suggestions'); //Chooses element with class suggestions

searchInput.addEventListener('keyup', displayMatches);
window.onload = windowActions;



}


async function windowActions() {
  const map = mapInit();
  await dataHandler(map);
}

window.onload = windowActions;


