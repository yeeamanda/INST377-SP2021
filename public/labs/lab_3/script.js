/* Put your javascript in here */

const imagelist = document.querySelector('ul');

const imagegallery = [];
for (let i = 0; i < document.querySelectorAll('li').length; i++) {
  imagegallery.push(document.querySelectorAll('img')[i].src);
}

let currentSlideIndex = -1;

function clickforward() {
    const arrowright = document.querySelector('arrowright');
    currentSlideIndex +=;
    if (currentSlideIndex < 3) {
   		list.style.marginLeft += '130px';
    }
}
arrowleft.addEventListener('click', (event)=> {
	clickforward()
  })

