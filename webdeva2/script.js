const track = document.querySelector("#page-track");
const content = document.querySelector("#content");

//page track sliding
const handleOnDown = e => track.dataset.mouseDownAt = e.clientX;

const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";
  track.dataset.prevPercentage = track.dataset.percentage;
}

const handleOnMove = e => {
  if (track.dataset.mouseDownAt == 0 || content.dataset.isOpen == "true") return;

  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
    maxDelta = window.innerWidth / 2;

  const percentage = (mouseDelta / maxDelta) * -100,
    nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
    nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

  track.dataset.percentage = nextPercentage;

  track.animate({
    transform: `translate(${track.dataset.percentage}%, -50%)`
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
        op += 0.1;
      }, 100);

      togglePageAnim();
    }

    closeSection();
    content.dataset.country = track.children[i].id;
    openSection();
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
      op -= 0.1;
    }, 50);

    togglePageAnim();
  }
})

const togglePageAnim = () => {
  track.animate({
    transform: `scale(${parseFloat(track.dataset.scale)}) 
    translate(${track.dataset.percentage == undefined? 0:track.dataset.percentage}%, ${parseFloat(track.dataset.scale) < 1?50:-50}%)`
  }, { duration: 800, fill: "forwards" });
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


const polaroids = content.querySelectorAll(".polaroid-img");
for (let i = 0; i < polaroids.length; i++) {
  polaroids[i].addEventListener("click", ()=>{
    content.dataset.subIsOpen = content.dataset.subIsOpen === "true"? "false":"true";
    polaroids[i].animate({
      transform: `rotate(${content.dataset.subIsOpen == "false"? 0:polaroids[i].id === "left"? 50:polaroids[i].id === "middle"? -20:-60}deg)`
    }, { duration: 200, fill: "forwards" });

  })
}
const polaroidAnim = ()=>{

}


/* -- touch events -- */

window.onmousedown = e => handleOnDown(e);

window.ontouchstart = e => handleOnDown(e.touches[0]);

window.onmouseup = e => handleOnUp(e);

window.ontouchend = e => handleOnUp(e.touches[0]);

window.onmousemove = e => handleOnMove(e);

window.ontouchmove = e => handleOnMove(e.touches[0]);