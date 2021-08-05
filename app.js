const imagesArea = document.querySelector('.images');
const gallery = document.querySelector('.gallery');
const galleryHeader = document.querySelector('.gallery-header');
const searchBtn = document.getElementById('search-btn');
const sliderBtn = document.getElementById('create-slider');
const sliderContainer = document.getElementById('sliders');

const singleImage = document.querySelector('.single_image');


// selected image 
let sliders = [];




// If this key doesn't work
// Find the name in the url and go to their website
// to create your own api key
const KEY = '15674931-a9d714b6e9d654524df198e00&q';

// show images 
const showImages = (images) => {
  console.log(images);
  imagesArea.style.display = 'block';
  gallery.innerHTML = '';
  singleImage.innerHTML='';
  // show gallery title
  galleryHeader.style.display = 'flex';
  images.forEach(image => {
    let div = document.createElement('div');
    let div2 = document.createElement('div');
    let div3 = document.createElement('div');
    let div4 = document.createElement('div');
    div.className = 'col-lg-3 col-md-4 col-xs-6 img-item mb-2 hov';
    div.innerHTML = ` <img class="img-fluid img-thumbnail" onclick=selectItem(event,"${image.webformatURL}") src="${image.webformatURL}" alt="${image.tags}">`;
    
    div2.className='middle';
    div3.className='middle2';
    
    div2.innerHTML=`<a href="${image.pageURL}" target="_blank" class="icon" title="Download Here">
    <i class="fa fa-download"></i>
  </a>`;
  div3.innerHTML=`<span class="icon2" title="Image Details" onclick=details("${image.user}","${image.imageSize}","${image.views}","${image.downloads}","${image.likes}","${image.comments}")>
    <i class="fas fa-info-circle"></i>
  </span>`;
    div.appendChild(div3)
    
    div.appendChild(div2)
    gallery.appendChild(div)
    
   
    
  });

}

const details=(d1,d2,d3,d4,d5,d6)=>{
 // console.log("hello");
  
  singleImage.innerHTML='';

  let div = document.createElement('div');
  div.className='imageclass';

  div.innerHTML=`
  <h3>Image Details</h3></br>
  <table class="table">
  <thead>
    <tr>
    <th scope="col">Image Name</th>
      <th scope="col">Image Size</th>
      <th scope="col">Image Views</th>
      <th scope="col">Downloads</th>
      <th scope="col">Likes</th>
      <th scope="col">Comments</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">${d1}</th>
      <td>${d2}</td>
      <td>${d3}</td>
      <td>${d4}</td>
      <td>${d5}</td>
      <td>${d6}</td>
    </tr>
    
  </tbody>
</table>`;
   singleImage.appendChild(div)
  
  

}

const getImages = (query) => {
  fetch(`https://pixabay.com/api/?key=${KEY}=${query}&image_type=photo&pretty=true`)
    .then(response => response.json())
    .then(data => showImages(data.hits))
    .catch(err => console.log(err))
}

let slideIndex = 0;
const selectItem = (event, img) => {
 let element = event.target;
 element.classList.add('added');
 
  let item = sliders.indexOf(img);
  if (item === -1) {
    sliders.push(img);
  } else {
    //alert('Hey, Already added !')
    
      sliders.pop();
      element.classList.remove('added');
  
  }

 
}

 
var timer
const createSlider = () => {
  // check slider image length
  if (sliders.length < 2) {
    alert('Select at least 2 image.')
    return;
  }

  
  // crate slider previous next area
  sliderContainer.innerHTML = '';
  const prevNext = document.createElement('div');
  prevNext.className = "prev-next d-flex w-100 justify-content-between align-items-center";
  prevNext.innerHTML = ` 
  <span class="prev" onclick="changeItem(-1)"><i class="fas fa-chevron-left"></i></span>
  <span class="next" onclick="changeItem(1)"><i class="fas fa-chevron-right"></i></span>
  `;

  sliderContainer.appendChild(prevNext)
  document.querySelector('.main').style.display = 'block';
  // hide image aria
  imagesArea.style.display = 'none';
  const duration = document.getElementById('duration').value || 1000;
  if(duration<0){
    duration2=duration*-1;
  }else{
    duration2=1000;
  }
  //console.log(duration2);
    sliders.forEach(slide => {
    let item = document.createElement('div')
    item.className = "slider-item";
    item.innerHTML = `<img class="w-100"
    src="${slide}"
    alt="">`;
    sliderContainer.appendChild(item)
  });
  changeSlide(0)
  timer = setInterval(function () {
    slideIndex++;
    changeSlide(slideIndex);
  }, duration2);
  
}

// change slider index 
const changeItem = index => {
  changeSlide(slideIndex += index);
}

// change slide item
const changeSlide = (index) => {

  const items = document.querySelectorAll('.slider-item');
  if (index < 0) {
    slideIndex = items.length - 1
    index = slideIndex;
  };

  if (index >= items.length) {
    index = 0;
    slideIndex = 0;
  }

  items.forEach(item => {
    item.style.display = "none"
  });

  items[index].style.display = "block"
}

searchBtn.addEventListener('click', function () {
  document.querySelector('.main').style.display = 'none';
  clearInterval(timer);
  const search = document.getElementById('search');
  getImages(search.value)
  sliders.length = 0;
});

sliderBtn.addEventListener('click', function () {
  createSlider()
});

document.getElementById("search").addEventListener("keypress",function(event){
  if (event.key==='Enter') {
    document.getElementById("search-btn").click();
  }
});
