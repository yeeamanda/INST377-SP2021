function mapInit() {
  // follow the Leaflet Getting Started tutorial here
  let map = L.map('mapid').setView([51.505, -0.09], 13);
  return map;
}

async function dataHandler(mapObjectFromFunction) {
  // use your assignment 1 data handling code here
  // and target mapObjectFromFunction to attach markers
  const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
  const foodPlace = [];
  const request = await fetch(endpoint);
  const mArr = await request.json().then(data => foodPlace.push(...data));

  function findMatches(searchQuery, foodPlace) {
    return foodPlace.filter(place => {
      const regex = new RegExp(searchQuery, 'gi'); //regExp is an object that goes into .match method
      return place.zip.match(regex)
    });
  };

  function displayMatches(event) {
    query = event.target.value;
    const matchArr = findMatches(query, foodPlace);// this.value is the data being input in the form
    const html = matchArr.map(place => {// .map makes array with equal size but replaces the values
      return `         
          <li class = "box has-background-danger-light">
              <span class="name">${place.name}</span> <br>
              <address>
                  ${place.address_line_1}
              </address> <br>
              <span class = "zip">${place.zip}</span>
          </li>           
      `;

      }).join(''); // This changes html from an array to a big string

    if(query) {
      suggestions.innerHTML = html;// takes html strong from html and creates html in this element
    } else {
      suggestions.innerHTML = '';
    }
  };

  const searchInput = document.querySelector('.search'); //This chooses an element with the class search
  const suggestions = document.querySelector('.suggestions'); //Chooses element with class suggestions

  searchInput.addEventListener('change',(evt)=> displayMatches(evt));
  searchInput.addEventListener('keyup',(evt)=> displayMatches(evt));

}

async function windowActions() {
  const map = mapInit();
  await dataHandler(map);
}

window.onload = windowActions;
