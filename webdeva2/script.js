const countries = [
  "SG", "JP", "DE", "IT"
];

const track = document.querySelector("#page-track");
const content = document.querySelector("#content");
const mediaQuery = window.matchMedia("(max-width: 800px)")

//page track sliding
const handleOnDown = e => track.dataset.mouseDownAt = e.clientY;

const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";
  track.dataset.prevPercentage = track.dataset.percentage;
}

const handleOnMove = e => {
  if (track.dataset.mouseDownAt == 0 || content.dataset.isOpen == "true") return;

  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientY,
    maxDelta = window.innerWidth / 2;

  const percentage = (mouseDelta / maxDelta) * -100,
    nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
    nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

  track.dataset.percentage = nextPercentage;
  changeBackground();

  track.animate({
    transform: `translate(-50%, ${track.dataset.percentage}%)`
  }, { duration: 1200, fill: "forwards" });

  for (const image of document.querySelectorAll("img")) {
    image.animate({
      objectPosition: `${100 + nextPercentage}% center`
    }, { duration: 1200, fill: "forwards" });
  }
}

//open content page
for (let i = 0; i < track.children.length; i++) {
  track.children[i].addEventListener("click", () => {
    if (content.dataset.isOpen == "false") {
      content.dataset.isOpen = true;
      track.dataset.scale = 0.1;

      content.style.display = "block";
      let op = 0; //init opacity
      let fadein = setInterval(() => {
        if (op >= 1) clearInterval(fadein);

        content.style.opacity = op;
        op += 0.01;
      }, 10);

      togglePageAnim(mediaQuery);
    }

    closeSection();
    content.dataset.country = track.children[i].id;
    openSection();
    changeBackground();
  })
}
//close content page
window.addEventListener('wheel', () => {
  if (content.dataset.isOpen == "true") {
    content.dataset.isOpen = false;
    track.dataset.scale = 1;
    let op = 1; //init opacity
    let fadeout = setInterval(() => {
      if (op <= 0) {
        clearInterval(fadeout);
        content.style.display = "none";
      }

      content.style.opacity = op;
      op -= 0.01;
    }, 10);

    togglePageAnim(mediaQuery);
  }
})

const backButton = content.querySelector(".back-button");
backButton.addEventListener("click", () => {
  if (content.dataset.isOpen == "true") {
    content.dataset.isOpen = false;
    track.dataset.scale = 1;
    let op = 1; //init opacity
    let fadeout = setInterval(() => {
      if (op <= 0) {
        clearInterval(fadeout);
        content.style.display = "none";
      }

      content.style.opacity = op;
      op -= 0.01;
    }, 10);

    togglePageAnim(mediaQuery);
  }
})

const togglePageAnim = (e) => {
  if (e.matches) {
    track.animate({
      transform: `translate(${content.dataset.isOpen == "true" ? 50 : -50}%, 0%)
      scale(${parseFloat(track.dataset.scale)})`
    }, { duration: 800, fill: "forwards" });
  }
  else {
    track.style.display = content.dataset.isOpen == "true" ? "flex" : "block";
    track.animate({
      transform: `translate(${content.dataset.isOpen == "true" ? 0 : -50}%, ${content.dataset.isOpen == "true" ? -20 : track.dataset.percentage}%)
      scale(${parseFloat(track.dataset.scale)})`
    }, { duration: 800, fill: "forwards" });
  }
  changeBackground();
}

const openSection = () => {
  let sectionToOpen = content.querySelector(`#${content.dataset.country}`);
  content.querySelector(`#${content.dataset.country}`).children[1].style.transform = `translate(${content.dataset.subContent * -100}vw, 0px)`;
  sectionToOpen.style.display = "block";
}
const closeSection = () => {
  let sectionToClose = content.querySelector(`#${content.dataset.country}`);
  sectionToClose.style.display = "none";
}

const changeBackground = () => {
  content.dataset.country = countries[-(track.dataset.percentage - track.dataset.percentage % 20) / 20];
  let backgroundImg = document.querySelector("body");
  let currHoverPortrait = track.querySelector(`#${content.dataset.country} img`);
  backgroundImg.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("${currHoverPortrait.src}")`;
}

const navIcon = content.querySelectorAll("li");
for (let i = 0; i < navIcon.length; i++) {
  navIcon[i].addEventListener("click", () => {
    let prevNav = navIcon[parseInt(content.dataset.subContent)];
    prevNav.classList.toggle("navSelected");
    let currNav = navIcon[i];
    currNav.classList.toggle("navSelected");

    content.dataset.subContent = i;

    content.querySelector(`#${content.dataset.country}`).children[1].animate({
      transform: `translate(${content.dataset.subContent * -100}vw, 0px)`
    }, { duration: 600, fill: "forwards" });
  })
}


/* -- touch events -- */

window.onmousedown = e => handleOnDown(e);

window.ontouchstart = e => handleOnDown(e.touches[0]);

window.onmouseup = e => handleOnUp(e);

window.ontouchend = e => handleOnUp(e.touches[0]);

window.onmousemove = e => handleOnMove(e);

window.ontouchmove = e => handleOnMove(e.touches[0]);