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

  var el = document.getElementsByClassName(flexType);
  for (let i = 0; i < el.length; i++) {
    $(el[i]).css({"position":"sticky"});
    $(el[i]).css({"display":"block"});
    el[i].classList.remove("main-content-hidden");
    $(el[i]).animate( { opacity:1 }, 400 );
  }
}

function hideFlex() {
  var el = document.getElementsByClassName("main-content");

  for (let i = 0; i < el.length; i++) {
    $(el[i]).css({"position":"fixed"});
    $(el[i]).css({"display":"none"});
    $(el[i]).css({"opacity":"0"});
    el[i].classList.add("main-content-hidden");
  }
}

function setLocation(buttonState) {
  
  hideFlex();

  if (validateButtonState(buttonState)) {
    showFlex(buttonState); // value automatically passed via href anchor
  }
}

$(document).ready(function(){
  $("enter").hover(function () {
    $("enter").css('cursor','pointer');
  }, 
  function () {
  });
});

$(window).on('popstate', function(event) {
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
    $(el[i]).css({"opacity":"1"});
  }
}

