/* Put your javascript in here */
/*const imagegallery = [];
imagegallery.forEach(element =>{
	let i = 0;
  const imagecount = document.querySelectorAll('li').length;
  if (i<imagecount) {
		i++;
    imagegallery.push(document.querySelectorAll('li')[i].src);
    }
})*/

const imagegallery = [];
for (let i = 0; i < document.querySelectorAll('li').length; i++) {
  imagegallery.push(document.querySelectorAll('li')[i].src);
}
console.log(imagegallery)


let currentSlideIndex = -1;

function clickforward() {
    const arrowright = document.querySelector('arrowright');
    currentSlideIndex +=;
    if (currentSlideIndex < 3) {
   		list.style.marginLeft += '130px';
    }
    
arrowleft.addEventListener('click', (event)=> {
	clickforward()
  })