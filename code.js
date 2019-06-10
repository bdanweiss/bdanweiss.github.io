/* This is for if someone resizes the window */
function hideNavigation() {
  var screenWidth = window.window.innerWidth;
  var phoneNav = document.getElementById("smartphone");
  var height = phoneNav.style.height
  var links = phoneNav.getElementsByClassName("nav");
  var title = phoneNav.getElementsByClassName("title")[0];
  var close = phoneNav.getElementsByClassName("close-icon")[0];
  var contactInfo = document.getElementById("contact-smartphone");

  if (screenWidth > 700) {
    phoneNav.style.height = "0px";
    title.style.display = "none";
    close.style.display = "none";
    contactInfo.style.display = "none";
    for (i = 0; i < links.length; i++) {
      links[i].style.display = "none";
    }
    phoneNav.style.borderBottom = "0px dashed black";
  }
}

/* This for changing the navigation in small windows */
function showNavigation() {

  // Find all of the HTML elements in my smartphone menu.
  var phoneNav = document.getElementById("smartphone");
  var height = phoneNav.style.height
  var links = phoneNav.getElementsByClassName("nav");
  var title = phoneNav.getElementsByClassName("title")[0];
  var close = phoneNav.getElementsByClassName("close-icon")[0];
  var contactInfo = document.getElementById("contact-smartphone");
  var contactInfoImages = document.getElementById("contact-smartphone");

  // If the menu is hidden.
  if ((height == "") || (height == "0px")) {
    phoneNav.style.height = "130px";

    // Display everything inside the menu after 199 milliseconds
    window.setTimeout(function() {
      for (i = 0; i < links.length; i++) {
        links[i].style.display = "inline-block";
      }
      title.style.display = "block";
      close.style.display = "inline-block";
      contactInfo.style.display = "flex";
      phoneNav.style.borderBottom = "2px dashed black";
    }, 180);
  }

  // If the menu is displayed.
  else {
    phoneNav.style.height = "0px";
    title.style.display = "none";
    close.style.display = "none";
    contactInfo.style.display = "none";
    for (i = 0; i < links.length; i++) {
      links[i].style.display = "none";
    }
    phoneNav.style.borderBottom = "0px dashed black";
  }
}

/* This is for the slideshow on my home page*/
var imageCounter = 0;
var photos = ["me.jpg", "fenyang2.jpg", "billboard.jpg"];
var length = photos.length;


// Making the photos are always in the best position
function changeSlidePosition() {
  var url = './intro_images/' + photos[imageCounter]
  background.style.backgroundImage = 'url("' + url + '"' +")";
  screenWidth = window.window.innerWidth;
  if (screenWidth > 800) {  
    if (photos[imageCounter] == "me.jpg") {
      background.style.backgroundPosition = "40% 30%";
    } 
    else {
      background.style.backgroundPosition = "0% 0%";
    }
  }
  else {  
    if (photos[imageCounter] == "me.jpg") {
      background.style.backgroundPosition = "70% 0%";
    } 
    else if (photos[imageCounter] == "billboard.jpg") {
      background.style.backgroundPosition = "0% 0%";
    }
    else {
      background.style.backgroundPosition = "40% 0%";
    }
  }
}
// Every time someone clicks on the slideshow buttons
function changeSlides() {

  // This for loading my pictures. First make an image object.
  showLoader();
  hideBody();
  var slide_image = new Image();
  var url = './intro_images/' + photos[imageCounter]
  slide_image.src = url;

  // Once the image object is done loading, make the background-image 
  // that photo
  background = document.getElementById("background-slideshow");
  slide_image.addEventListener("load", function() {
    this.remove();
    background.style.backgroundImage = 'url("' + url + '"' + ")";
    showBody();
    hideLoader();
  });
  changeSlidePosition();
}
function next() {
  imageCounter += 1;
  imageCounter = imageCounter%length;
  changeSlides();
}
function previous() {
  if (imageCounter == 0) {
    imageCounter = length -1
  }
  else {  
    imageCounter --;
    imageCounter = imageCounter%length;
  }
  changeSlides();
}

/* For when the home page initially loads */
function hideBody() {
  slideshow = document.getElementById("background-slideshow");
  slideshow.style.opacity = 0;
}
function showBody() {
  slideshow = document.getElementById("background-slideshow");
  slideshow.style.opacity = 1;
  hideLoader();
}
function hideLoader() {
  loader = document.getElementById("loader");
  loader.style.display = "none";
}
function showLoader() {
  loader = document.getElementById("loader");
  loader.style.display = "block";
}

/* This is for writing my email so no spam bots get it*/
function writeEmail() {
  user = "bdanweiss";
  domain = "gmail.com";
  document.write('<a class = "email" href=\"mailto:' + user + '@' + domain + '\""><i class="material-icons">email</i></a>');
}
function writeEmailPhone() {
  user = "bdanweiss";
  domain = "gmail.com";
  document.write('<a class = "phone-email" href=\"mailto:' + user + '@' + domain + '\""><i class="material-icons md-36">email</i></a>');
}

/* This is for collapsing my boxes in my resume*/
function collapse() {
  var button = document.getElementsByClassName("button-category");
  var i;

  for (i = 0; i < button.length; i++) {
    button[i].addEventListener("click", function() {
      this.classList.toggle("active-resume");
      var content = this.nextElementSibling;
      var maxHeight = content.style.maxHeight;
      var scrollHeight = content.scrollHeight + "px";

      if (maxHeight != "0px") {
        content.style.maxHeight = "0px";
      }
      else {
        content.style.maxHeight = scrollHeight;
      }
    });
  }
}

/* This for my writing page */
function showLink() {

  var containers = document.getElementsByClassName("article-container");
  var i;

  for (i = 0; i < containers.length; i++) {
    containers[i].addEventListener("click", function() {
      var children = this.children
      var image = children[0]
      var link = children[1]
      var date = children[2]

      imageWidth = image.width;
      link.style.width = (imageWidth - 5) + "px";
      date.style.width = (imageWidth - 5) + "px";

      if ((link.style.visibility == "hidden") || (link.style.visibility == "")) {
        link.style.visibility = "visible";
        date.style.visibility = "visible";
        link.style.opacity = "1";
        date.style.opacity = "1";
        image.style.visibility = "hidden";
        image.style.opacity = "0";
        image.style.height = "150px";
        this.style.border = "2px solid #BEBEBE"
        this.style.height = "150px";
      }
      else {
        link.style.visibility = "hidden";
        date.style.visibility = "hidden";
        link.style.opacity = "0";
        date.style.opacity = "0";
        image.style.height = "110px";
        image.style.visibility = "visible";
        image.style.opacity = "1";
        this.style.border = ""
        this.style.height = "110px";
      }
    });
  }
}
index = 0
/* This for my code page */
function changeCodeSlides(number) {

  slides = document.getElementsByClassName("codesters-frame");
  dots = document.getElementsByClassName("dot");
  dots[index].classList.toggle("active-dot");
  slides[index].style.display = "none";
  if (index == (slides.length - 1) && (number == 1)) {
    index = 0;
    slides[index].style.display = "inline-block";
  }
  else if ((index == 0) && (number == -1)) {
    index = slides.length - 1;
    slides[index].style.display = "inline-block";
  }
  else {
    slides[index + number].style.display = "inline-block";
    index += number;
  }
  dots[index].classList.toggle("active-dot");
}
function currentSlide(number) {
  slides = document.getElementsByClassName("codesters-frame");
  dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i ++) {
    slides[i].style.display = "none";
    dots[i].classList.remove("active-dot");
  }
  index = number;
  slides[index].style.display = "inline-block";
  dots[index].classList.toggle("active-dot");
}

function codePage() { 
  var boxes = document.getElementsByClassName("project-box");

  for (i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener("click", function() {
      var children = this.children;
      var cover = children[0];
      var content = children[1];
      content.style.visibility = "visible";
      content.style.opacity = "1";
      cover.style.visibility = "hidden";
      this.style.width = "100%";
    });
  }
}