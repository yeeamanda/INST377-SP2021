const imagegallery = [];
// eslint-disable-next-line linebreak-style

// eslint-disable-next-line no-plusplus
for (let i = 0; i < document.querySelectorAll('li').length; i++) {
  imagegallery.push(document.querySelectorAll('img')[i].src);
}
let SlideIndex = -1;

document.querySelector('.right').onclick = () => {
  // eslint-disable-next-line no-const-assign
  SlideIndex += 3;
  if (SlideIndex > 5) {
    // eslint-disable-next-line no-const-assign
    SlideIndex = 6;
  } else if (SlideIndex == 5) {
    document.getElementById('image1').src = imagegallery[SlideIndex - 1];
    document.getElementById('image2').src = imagegallery[SlideIndex];
    document.getElementById('image3').src = imagegallery[SlideIndex + 1];
  } else {
    document.getElementById('image1').src = imagegallery[SlideIndex + 1];
    document.getElementById('image2').src = imagegallery[SlideIndex + 2];
    document.getElementById('image3').src = imagegallery[SlideIndex + 3];
  }
};

document.querySelector('.left').onclick = () => {
  SlideIndex -= 3;
  if (SlideIndex < -1) {
    SlideIndex = 0;
  } else if (SlideIndex == -1) {
    document.getElementById('image1').src = imagegallery[SlideIndex + 1];
    document.getElementById('image2').src = imagegallery[SlideIndex + 2];
    document.getElementById('image3').src = imagegallery[SlideIndex + 3 ];
  } else {
    document.getElementById('image1').src = imagegallery[SlideIndex - 1];
    document.getElementById('image2').src = imagegallery[SlideIndex];
    document.getElementById('image3').src = imagegallery[SlideIndex + 1];
  }
};
