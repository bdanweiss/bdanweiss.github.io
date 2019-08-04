/* This is for if someone resizes the window */
function hideNavigation() {
  var screenWidth = window.window.innerWidth;
  if (screenWidth > 700) {
    closeNavigation();
  }
}
/* This for changing the navigation in small windows */
function showNavigation() {

  // Find all of the HTML elements in my smartphone menu.
  var phoneNav = document.getElementById("smartphone");
  var width = phoneNav.style.width
  var links = phoneNav.getElementsByClassName("nav");
  var title = phoneNav.getElementsByClassName("title")[0];
  var close = phoneNav.getElementsByClassName("close-icon")[0];
  var contactInfo = document.getElementById("contact-smartphone");
  var contactInfoImages = document.getElementById("contact-smartphone");

  // If the menu is hidden.
  if ((width == "") || (width == "0px")) {
    phoneNav.style.width = "300px";

    // Display everything inside the menu after 199 milliseconds
    window.setTimeout(function() {
      for (i = 0; i < links.length; i++) {
        links[i].style.display = "inline-block";
      }
      title.style.display = "block";
      close.style.display = "inline-block";
      contactInfo.style.display = "flex";
      phoneNav.style.borderBottom = "2px dashed black";
      phoneNav.style.borderRight = "2px dashed black";
    }, 180);
  }
  // If the menu is displayed.
  else {
    closeNavigation();
  }
}
function closeNavigation() {
  var phoneNav = document.getElementById("smartphone");
  var height = phoneNav.style.height
  var links = phoneNav.getElementsByClassName("nav");
  var title = phoneNav.getElementsByClassName("title")[0];
  var close = phoneNav.getElementsByClassName("close-icon")[0];
  var contactInfo = document.getElementById("contact-smartphone");

  phoneNav.style.width = "0px";
  title.style.display = "none";
  close.style.display = "none";
  contactInfo.style.display = "none";
  for (i = 0; i < links.length; i++) {
    links[i].style.display = "none";
  }
  phoneNav.style.borderBottom = "0px dashed black";
  phoneNav.style.borderRight = "0px dashed black";
}
/* This is for the slideshow on my home page*/
// Every time someone clicks on the slideshow buttons
function loadBackground() {
  // This for loading my pictures. First make an image object.
  showLoader();
  hideBody();
  var slide_image = new Image();
  var url = './intro_images/me.jpg'
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
      addLoadingBox(image);
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
var currentElement = "";
/* This is for my photos page */
function createCarousel() {
  // Go through all the different carousel images and add events to them
  // Use querySelectorAll because it provides a STATIC list of images, not dynamic
  images = document.querySelectorAll(".carousel-image");
  // window.addEventListener("resize", hideNavigation);
  for (i = 0; i < images.length; i++) {
    addLoadingBox(images[i]);
    addPopupListener(images[i])
    // Add a click event
  }
}
function addPopupListener(image){
  image.addEventListener("click", function() {
    createPopup(this);
    // Make the buttons visible
    buttons = document.getElementsByClassName("slideshow");
    popup = document.getElementById("popup-image");
    buttons[0].style.visibility = "visible";
    buttons[1].style.visibility = "visible"; 
    // Wait a bit before adding the popupClicked event to prevent
    // event bubbling.
    window.setTimeout(function() {
      document.body.addEventListener("click", popupClicked);
    }, 100);
  });
}
function createPopup(element) {
  currentElement = element;
  var img = document.createElement("img");
  img.src = element.src;
  img.id = "popup-image";
  background = document.getElementById("photo-body");
  background.classList.add("darken");
  document.body.appendChild(img);
  center(img);
  window.addEventListener("resize", function() {
    center(img);
  });
}
function addLoadingBox(image) {
  if (!image.complete) {
    loadingBox = document.createElement('div');
    loadingBox.className = "loading-box";
    loadingBox.setAttribute("data-id", image.src)
    image.parentNode.replaceChild(loadingBox, image);
    image.addEventListener("load", function(){
      loadingBox = document.querySelector('[data-id="'+this.src+'"]');
      loadingBox.parentNode.replaceChild(this, loadingBox);
    });
  }
  else {
    image.style.display = "inline-block";
  }
}
function popupClicked() {
  var target = event.target.id;
  if ((target != "popup-image") && (target != "next") && (target != "previous")) {
    image = document.getElementById("popup-image");
    document.body.removeChild(image);
    buttons = document.getElementsByClassName("slideshow");
    buttons[0].style.visibility = "hidden"; 
    buttons[1].style.visibility = "hidden"; 
    document.body.removeEventListener("click", popupClicked);
    background = document.getElementById("photo-body");
    
    if (event.target.className != "carousel-image") {
      background.classList.remove("darken")
    }
    else {
      buttons[0].style.visibility = "visible"; 
      buttons[1].style.visibility = "visible"; 
    }
  }
}
function next() {
  document.body.addEventListener("click", popupClicked);
  var next = currentElement.nextElementSibling;

  try {    
    var popup = document.getElementById("popup-image");
    popup.src = next.src
    center(popup);
    currentElement = next;
}
  catch(error) {
    currentElement = currentElement.previousElementSibling;
  }
}
function previous() {
  document.body.addEventListener("click", popupClicked);
  var previous = currentElement.previousElementSibling;

  try {
    var popup = document.getElementById("popup-image");
    popup.src = previous.src
    center(popup);
    currentElement = previous;
  }
  catch(error) {
    currentElement = currentElement.nextElementSibling;
  }
}
function center(element) {
  width = element.offsetWidth;
  height = element.offsetHeight;
  screenWidth = window.innerWidth;
  screenHeight = window.innerHeight;

  horizontalOffset = (screenWidth - width)/2;
  verticalOffset = (screenHeight - height)/2;
  element.style.left = String(horizontalOffset) + "px"
  element.style.top = String(verticalOffset) + "px"
}












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