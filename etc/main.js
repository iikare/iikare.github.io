const bt = {
  WEL: "wel",
  EXP: "exp",
  RSM: "rsm",
  CONT: "cont",
  NONE: "none"
};

var buttonState = bt.NONE;

function resetButtonColors() {
  const ids = ["wel", "exp", "rsm", "cont"];
  const idlen = ids.length;
  for (let i = 0; i < idlen; i++) {
    var property = document.getElementById(ids[i]);
    property.classList.remove("sidebar-active");
  }
}

function setState(enumState) {
  
  if (buttonState === enumState) {
    // clicked same button, nothing happens
    return;
  }

  buttonState = enumState;
  

  resetButtonColors();

  if (buttonState === bt.WEL || buttonState === bt.EXP ||
      buttonState === bt.RSM || buttonState === bt.CONT) {
    document.getElementById(buttonState).classList.add("sidebar-active");
    setLocation(buttonState); // value automatically passed via href anchor
  }
  else {
    console.log("invalid button state: " + buttonState);
  }
}

function showFlex(flexType) {
  //console.log(flexType);
  var el = document.getElementsByClassName(flexType);
  var ellen = el.length;

  for (let i = 0; i < ellen; i++) {
    el[i].classList.remove("main-content-hidden");
    //el[i].classList.add("main-content-active");
    //console.log(el[i]);
    $(el[i]).hide().fadeIn(400);
  }
}

function hideFlex() {
  var el = document.getElementsByClassName("main-content");
  var ellen = el.length;

  for (let i = 0; i < ellen; i++) {
    //el[i].classList.remove("main-content-active");

    el[i].classList.add("main-content-hidden");
    $(el[i]).fadeOut(400);
  }
}

function setLocation(buttonState) {
  
  hideFlex();

  if (buttonState === bt.WEL || buttonState === bt.EXP ||
      buttonState === bt.RSM || buttonState === bt.CONT) {
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

function parseAnchor() {


  var anchor = window.location.hash.substr(1);

  if (anchor === "welcome") {
    setState(bt.WEL);
  }
  else if (anchor === "experience") {
    setState(bt.EXP);
  }
  else if (anchor === "resume") {
    setState(bt.RSM);
  }
  else if (anchor === "contact") {
    setState(bt.CONT);
  }
  else {
    setState(bt.WEL);
  }
}


