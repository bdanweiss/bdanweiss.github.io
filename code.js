/* This is for if someone resizes the window */
function showOrCloseNav() {

  var screenWidth = window.window.innerWidth;
  if (screenWidth <= 780) {
    // I'm using this function to stop any funky transitions in width size of nav
    showClosedSmartPhoneResize(); 
  }
  else if (screenWidth > 780) {
    showWidepageNav()
  }
}
/* This is for turning the opacity and interactivity of the menu links on and off */
function toggleMenuElements(onOrOff) {
  var contactInfo = document.getElementById("contact-info");
  var linksContainer = document.getElementById("links-container");
  if (onOrOff == "on") {
    opacity = "1"
    pointerEvents = "auto"
  }
  else if (onOrOff == "off") {
    opacity = "0"
    pointerEvents = "none"
  }
  contactInfo.style.opacity = opacity;
  contactInfo.style.pointerEvents = pointerEvents;
  linksContainer.style.opacity = opacity;
  linksContainer.style.pointerEvents = pointerEvents;
}

/* Close the menu if user clicks on X --> this lets us do a nice transition */
function showClosedSmartPhone() {
  var nav = document.getElementsByTagName("nav")[0];
  toggleMenuElements("off")
  window.setTimeout(function() {
    document.getElementById("hamburger-icon").style.display = "inline-block"
    document.getElementById("close-icon").style.display = "none"
    nav.id = "smartphone-closed";
  }, 200);
}
/* Close the menu if user resizes the window --> avoid transitions */
function showClosedSmartPhoneResize() {
  var nav = document.getElementsByTagName("nav")[0];
  toggleMenuElements("off")
  document.getElementById("hamburger-icon").style.display = "inline-block"
  document.getElementById("close-icon").style.display = "none"
  nav.id = "smartphone-closed-resize";
  nav.width = "0px"
}

/* This for opening the menu whenever the user clicks on the hamburger menu */
function showSmarthphoneNav() {
  
  var nav = document.getElementsByTagName("nav")[0];
  nav.id = "smartphone";
  document.getElementById("close-icon").style.display = "inline-block"
  document.getElementById("hamburger-icon").style.display = "none"
  nav.style.boxShadow = "0px 5px 5px 0px #494848";

  // Basically, wait 200 ms after transi
  window.setTimeout(function() {
    var contactInfo = document.getElementById("contact-info");
    var linksContainer = document.getElementById("links-container");
    nav.insertBefore(linksContainer, contactInfo);
    var email = document.getElementById("email");
    email.childNodes[0].classList.add("icon");
    email.childNodes[0].classList.add("md-36");
    toggleMenuElements("on")
  }, 200);
}
function showWidepageNav() {
  var nav = document.getElementsByTagName("nav")[0];
  document.getElementById("hamburger-icon").style.display = "none"
  nav.style.boxShadow = "0 0 0 0";
  var email = document.getElementById("email");
  email.childNodes[0].classList.remove("icon");
  email.childNodes[0].classList.remove("md-36");
  toggleMenuElements("on")
  nav.id = "widepage";
}
/* This for loading the background pic on my home page. */
function loadBackground() {
  // First make an image object.
  showLoader();
  hideBody();
  var slide_image = new Image();
  var url = './images/mirror.jpg'
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
  document.write('<a id = "email" href=\"mailto:' + user + '@' + domain + '\""><i class="material-icons">email</i></a>');
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
var total_photos = 0;
/* This is for my photos page */
function createMultimediaPage() {
  // Go through all the different carousel images and add events to them
  // Add hover events to tooltips near headings
  // Use querySelectorAll because it provides a STATIC list of images, not dynamic

  projects = document.querySelectorAll(".project");
  for (i = 0; i < projects.length; i++) {
    // addLoadingBox(images[i]);
    addPopupListener(projects[i])
  }
}
function addPopupListener(project) {
  project.addEventListener("click", function() {
    createPopup(this);

    // Wait a bit before adding the popupClicked event to prevent
    // event bubbling.
    window.setTimeout(function() {
      document.body.addEventListener("click", popupClicked);
    }, 100);
  });
}
function createPopup(project) {
  
  // Figure out which object is going to be popped up
  dataType = project.getAttribute("data-class")

  if (dataType == "photo-gallery") {
    gallery_object = createPhotoSlideshow(project)
  }
  else {
    gallery_object = createVideoPopup(project)
  }
  var popupDiv = document.createElement("div"); 
  popupDiv.id = "popup";
  // var caption = document.createElement("span");
  // caption.id = "popup-caption";
  // caption.innerHTML = "asfdksfjskfjaskfjs";
  // popupDiv.appendChild(caption);
  popupDiv.appendChild(gallery_object);
  document.body.appendChild(popupDiv);

  // Setup div cover to make it so the user can't click on buttons in the background
  var divCover = document.createElement("div")
  divCover.id = "multimedia-page-cover"

  // Darken the background
  background = document.getElementById("multimedia-body");
  background.classList.add("darken");

  // Add elements and center the popup element
  document.body.appendChild(divCover);
  center(gallery_object);
  window.addEventListener("resize", function() {
    center(gallery_object);
  });
}
function createPhotoSlideshow(project) {
  // Setup popup image
  var img = document.createElement("img");
  total_photos  = parseInt(project.getAttribute("data-count"))
  photo = project.childNodes[1]
  img.src = photo.src;
  img.id = "popup-image";

  nextButton = document.getElementById("next");
  nextButton.style.visibility = "visible"; 

  // Return image so we can center it
  return img;
}
function createVideoPopup(element) {
  // Setup popup video
  var iframe = document.createElement("iframe");
  var videoWrapper = document.createElement("div");
  var videoDiv = document.createElement("div");
  videoWrapper.id = "video-wrapper";
  videoDiv.id = "video-container";
  iframe.id = "popup-video";
  iframe.src = element.childNodes[1].getAttribute("data-url");
  iframe.setAttribute("allowfullscreen", "allowfullscreen");
  videoWrapper.appendChild(videoDiv);
  videoDiv.appendChild(iframe);

  // Return videoWrapper so we can center it
  return videoWrapper;
}
function popupClicked() {
  // Get target of where the user clicked
  var target = event.target.id;
  console.log(target);
  // If the user didn't click on the popup or buttons, exit popup mode
  if ((target != "popup-image") && (target != "next") && (target != "previous") && (target != "popup-video")) {
    image = document.getElementById("popup");
    divCover = document.getElementById("multimedia-page-cover");
    document.body.removeChild(image);
    document.body.removeChild(divCover);
    buttons = document.getElementsByClassName("slideshow");
    buttons[0].style.visibility = "hidden"; 
    buttons[1].style.visibility = "hidden"; 
    document.body.removeEventListener("click", popupClicked);
    background = document.getElementById("multimedia-body");
    background.classList.remove("darken")
  }

}
function parseImageName(popup) {
  // Do some string wizardy to get image construction pattern
  popupSourceList = popup.src.split("/");
  currentImgSeparated = popupSourceList[popupSourceList.length - 1].split("_");
  slideshowTopic = currentImgSeparated[0];
  currentImgNum = parseInt(currentImgSeparated[1].replace(".jpg", ""));
  return currentImgNum;
}
function slideshowButtonClick() {
  document.body.addEventListener("click", popupClicked);
  var nextButton = document.getElementById("next");
  var previousButton = document.getElementById("previous");
  var popup = document.getElementById("popup-image");
  currentImgNum = parseImageName(popup);
  return [nextButton, previousButton, popup, currentImgNum]
}
function next() {
  elements = slideshowButtonClick();
  elements[1].style.visibility = "visible";
  nextImgNum = elements[3] + 1;
  elements[2].src = "./multimedia_images/" + slideshowTopic + "_" + nextImgNum.toString() + ".jpg";
  center(elements[2]);

  if (nextImgNum == total_photos) {
    elements[0].style.visibility = "hidden";
  }
}
function previous() {
  elements = slideshowButtonClick();
  elements[0].style.visibility = "visible";
  nextImgNum = elements[3] - 1;
  elements[2].src = "./multimedia_images/" + slideshowTopic + "_" + nextImgNum.toString() + ".jpg";
  center(elements[2]);

  if (nextImgNum == 1) {
    elements[1].style.visibility = "hidden";
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
function addHoverListener(tooltipCombo){
  tooltipCombo.addEventListener("mouseover", function() {
      tooltip = tooltipCombo.childNodes[3];
      tooltip.style.display = "inline-block";
      tooltip.style.opacity = 0.9;

      tooltipCombo.addEventListener("mouseleave", function() {
        tooltip = tooltipCombo.childNodes[3];
        tooltip.style.display = "none";
        tooltip.style.opacity = 0;
      });
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
/* This is for my writing page */
function setupWritingPage() {
  // Go through all the different article images and add loading events to them
  // Use querySelectorAll because it provides a STATIC list of images, not dynamic
  containers = document.querySelectorAll(".article");
  for (i = 0; i < containers.length; i++) {
    addLoadingBoxWriting(containers[i].childNodes[1]);
  }
  window.addEventListener('resize', hideOtherArticleImages);
  hideOtherArticleImages();
}

function addLoadingBoxWriting(image) {
  // Macro overview: load image in background to get aspect ratio, calcuate width/height, 
  // replace image with loading box of same width/height, once image is done, swap out

  // Create copy of the image
  var img = document.createElement('img');
  img.src = image.src;

  // See if copy is loaded. (For some reason, it loads quicker than the actual one...)
  var poll = setInterval(function () {
      if (img.naturalWidth) {
          clearInterval(poll);

          // Once copy is loaded, calculate the width/height of the loading box
          imageRatio = img.naturalWidth/img.naturalHeight
          styleDict = window.getComputedStyle(image);
          width = styleDict.getPropertyValue('width');
          width = parseInt(width, 10);
          height = width/imageRatio

          // It gets a bit complicated because the layout changes for smartphones.
          // I need to check if the screen width (either inner or actual) is smaller than 700
          screenWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
          screenWidth = parseInt(screenWidth, 10);
          if (screenWidth >= 700) {
            replaceImageWithBox(image, width, height);
          }
          else {
            // If it's smaller, than I shouldn't add loading boxes for the images in the "other articles"
            if (image.parentNode.className != "other-selected-article article") {
              replaceImageWithBox(image, width, height);
            }
          }
      }
  }, 10);
}
function replaceImageWithBox(image, width, height) {
  if (!image.complete) {
    loadingBox = document.createElement('div');
    loadingBox.className = "loading-box";
    loadingBox.style.minWidth = width + "px"
    loadingBox.style.minHeight = height + "px"
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
function hideOtherArticleImages() {
    screenWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    screenWidth = parseInt(screenWidth, 10);
    otherArticles = document.querySelectorAll(".other-selected-article");
    if (screenWidth <= 700) {
      for (i = 0; i < otherArticles.length; i++) {
        image = otherArticles[i].childNodes[1];
        image.style.display = "none";
      }
    }
    else {
      for (i = 0; i < otherArticles.length; i++) {
        image = otherArticles[i].childNodes[1];
        if (image.complete) {
          image.style.display = "inline-block";
        }
      }
    }
}