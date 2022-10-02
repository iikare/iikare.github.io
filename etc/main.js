const bt = {
  s1: "s1",
  s2: "s2",
  s3: "s3",
  s4: "s4", // reserved for resume page
  NONE: "none"
};

var buttonState = bt.NONE;
const ids = ["s1", "s2", "s3", "s4", "NONE"];

function validateButtonState(state) {
  return state === bt.s1 || state === bt.s2 || 
         state === bt.s3 || state === bt.s4;
}

function resetButtonColors() {
  const idlen = ids.length;
  for (let i = 0; i < idlen; i++) {
    var property = document.getElementById(ids[i]);
    if (property === null) {
      continue;
    }
    property.classList.remove("header-active");
  }
}

function setState(enumState) {
  
  if (buttonState === enumState) {
    // clicked same button, nothing happens
    return;
  }

  buttonState = enumState;
  

  resetButtonColors();

  if (validateButtonState(buttonState)) {
    var property = document.getElementById(buttonState);

    if (property === null) {
      return;
    }
    property.classList.add("header-active");
    setLocation(buttonState); // value automatically passed via href anchor
  }
  else {
    console.log("invalid button state: " + buttonState);
  }
}

function showFlex(flexType) {
  //console.log(flexType);
  var el = document.getElementsByClassName(flexType);

  if (flexType == bt.s4) {
    document.getElementById('res').src="etc/resume.pdf";
    document.getElementById('resl').href="etc/resume.pdf";
  }

  for (let i = 0; i < el.length; i++) {
    el[i].style.position = 'sticky';
    el[i].style.display = 'block';
    el[i].classList.add("main-op");
  }
}

function hideFlex() {
  var el = document.getElementsByClassName("main-content");

  for (let i = 0; i < el.length; i++) {
    el[i].style.position = 'fixed';
    el[i].style.display = 'none';
    el[i].style.opacity = 0;
    el[i].classList.remove("main-op");
  }
}

function setLocation(buttonState) {
  hideFlex();
  if (validateButtonState(buttonState)) {
    showFlex(buttonState); // value automatically passed via href anchor
  }
}

window.addEventListener('popstate', function(event) {
  parseAnchor();  // navigation-related logic
});

function parseAnchor() {
  var anchor = window.location.hash.substr(1);
  var state = bt.s1;
  var stateClass = "s1";
  if (anchor === "home") {
    state = bt.s1;
    stateClass = "s1";
  }
  else if (anchor === "now" || anchor === "start") {
    state = bt.s2;
    stateClass = "s2";
  }
  else if (anchor === "code") {
    state = bt.s3;
    stateClass = "s3";
  }
  else if (anchor === "resume") {
    state = bt.s4;
    stateClass = "s4";
  }
  else {
    state = bt.s1;
    stateClass = "s1";
  }
  setState(state);
  var el = document.getElementsByClassName(stateClass);
  for (let i = 0; i < el.length; i++) {
    el[i].style.opacity = 1;
  }
}

function svgHover(out) {
  if (out === false) {
    document.getElementById("svg-icon").classList.add("logo-anim");
    document.getElementById("text-icon").classList.add("logo-anim");
  }
  else {
    document.getElementById("svg-icon").classList.remove("logo-anim");
    document.getElementById("text-icon").classList.remove("logo-anim");
  }
}
