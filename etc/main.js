const bt = {
  HME: "hme",
  NOW: "now",
  CDE: "cde",
  EXP: "exp",
  RSM: "rsm",
  CON: "con",
  NONE: "none"
};

var buttonState = bt.NONE;
const ids = ["hme", "now", "cde", "rsm", "exp", "con"];

function validateButtonState(state) {
  return state === bt.HME || state === bt.EXP || 
         state === bt.CDE || state === bt.CON ||
         state === bt.NOW || state === bt.RSM;
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

  if (flexType == bt.RSM) {
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

    el[i].classList.add("main-content-hidden");
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
  var state = bt.HME;
  var stateClass = "hme";
  if (anchor === "home") {
    state = bt.HME;
    stateClass = "hme";
  }
  else if (anchor === "now") {
    state = bt.NOW;
    stateClass = "now";
  }
  else if (anchor === "code") {
    state = bt.CDE;
    stateClass = "cde";
  }
  else if (anchor === "resume") {
    state = bt.RSM;
    stateClass = "rsm";
  }
  else {
    state = bt.HME;
    stateClass = "hme";
  }
  setState(state);
  var el = document.getElementsByClassName(stateClass);
  for (let i = 0; i < el.length; i++) {
    el[i].style.opacity = 1;
  }
}
