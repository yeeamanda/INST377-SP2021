function mapInit() {
  // follow the Leaflet Getting Started tutorial here
  let map = L.map('mapid').setView([38.9897, -76.9378], 13);
   L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiYW1hbmRheWVlIiwiYSI6ImNrbTVnNTh6ZzAxZzgycHM5dWdnbXVjN3cifQ.Ikepxu09mwyzzW8zWlT9jQ'
  }).addTo(map);
  
  return map;
}

async function dataHandler(mapObjectFromFunction) {
  // use your assignment 1 data handling code here
  // and target mapObjectFromFunction to attach markers
  const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
  const foodPlace = [];
  const request = await fetch(endpoint);
  const mArr = await request.json().then(data => foodPlace.push(...data));

  const form = document.querySelector('.form'); //This chooses an element with the class search
  const suggestions = document.querySelector('.suggestions'); //Chooses element with class suggestions
  
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    query = event.target.value;
	  const myLines = foodPlace.filter((item) => (item.zip.includes(query) && item.geocoded_column_1));
    const firstFive = myLines.slice(0, 5);

		firstFive.forEach((inst) =>{
    	const coord = inst.geocoded_column_1.coordinates;
  		const marker = L.marker([coord[1], coord[0]]).addTo(mapObjectFromFunction);
			const html = firstFive.map(place => {// .map makes array with equal size but replaces the values
        return `         
          <li class = "box has-background-danger-light">
            <span class="name">${place.name}</span> <br>
            <address>
              ${place.address_line_1}
            </address>
            <span class = "zip">${place.zip}</span>
          </li>
      	  `;
        }).join(''); // This changes html from an array to a big string

    	  if(query) {
      	  suggestions.innerHTML = html;// takes html strong from html and creates html in this element
    		} else {
      	  suggestions.innerHTML = '';
    		}
    
    }); 

   });


}

async function windowActions() {
  const map = mapInit();
  await dataHandler(map);
}

window.onload = windowActions;
