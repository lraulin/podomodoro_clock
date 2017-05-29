$(document).ready(function() {
  var defaultSession = 25*60;
  var defaultBreak = 5*60;
  var defaultIncrement = 60;
  var sessionCount = defaultSession;
  var breakCount = defaultBreak;
  refresh();
  var buzzer = $("#buzzer")[0];
  var toggle = true;
  var sessionInterval, breakInterval;

  function toggleButton() {
    if (toggle) {
      toggle = false;
      $("#start").removeClass("btn-primary");
      $("#start").addClass("btn-danger");
      $("#start").text("Stop");
    } else {
      toggle = true;
      $("#start").removeClass("btn-danger");
      $("#start").addClass("btn-primary");
      $("#start").text("Start");
    }
    console.log(toggle);
  }

  function sessionTimer() {
    $("#minus5Clock, #add5Clock, #minus5Break, #add5Break").hide();
    $("#breakDiv").hide();
    sessionCount -= 1;
    if (sessionCount===0) {
      clearInterval(sessionInterval);
      buzzer.play();
      console.log("Ding!");
      breakInterval = setInterval(breakTimer, 1000);
      breakTimer();
    }
    if (toggle===true) {
      clearInterval(sessionInterval);
    }
    refresh();
  }

  function breakTimer() {
    $("#breakDiv").show();
    $("#sessionDiv").hide();
    breakCount -= 1;
    if (breakCount===0) {
      clearInterval(breakInterval);
      toggleButton();
      buzzer.play();
      console.log("Ding!");
    }
    if (toggle===true) {
      clearInterval(breakInterval);
    }
    refresh();
  }

  function reset() {
    clearInterval(sessionInterval);
    clearInterval(breakInterval);
    toggle = true;
    sessionCount = defaultSession;
    breakCount = defaultBreak;
    $("#start").removeClass("btn-danger");
    $("#start").addClass("btn-primary");
    $("#start").text("Start");
    $("#minus5Clock, #add5Clock, #minus5Break, #add5Break").show();
    $("#sessionDiv").show();
    $("#breakDiv").show();
    refresh();
  }

  function minSec(seconds) {
    var time = [0, 0];
    var min = Math.floor(seconds / 60);
    var sec = seconds % 60;
    if (sec === 0) {
      sec = "00";
    } else if (sec < 10) {
      sec = "0" + sec;
    }
    return min + ":" + sec;
  }

  function refresh() {
    $("#num").html(minSec(sessionCount));
    $("#breakNum").html(minSec(breakCount));
  }

  function increment(num) {
    if (num >= 60*10) {
      num += 60*5;
    } else if (num >= 60) {
      num += 60;
    } else if (num >= 10) {
      num += 5;
    } else {
      num += 1;
    }
    return num;
  }

  function decrement(num) {
    if (num < 1) {
      return 0;
    } else if (num <= 10) {
      num -= 1;
    } else if (num <= 60) {
      num -= 5;
    } else if (num <= 60*10){
      num -= 60;
    } else {
      num -= 60*5;
    }
    return num;
  }

  console.log(sessionCount);
  // $("#reset").hide();

  $("#start").click(function() {
    if (breakCount > 0) {
      toggleButton();
      if (toggle===false) {
        sessionInterval = setInterval(sessionTimer, 1000);
      }
    }
  });

  $("#minus5Clock").click(function() {
    sessionCount = decrement(sessionCount);
    refresh();
    console.log(sessionCount);
  });

  $("#add5Clock").click(function() {
    sessionCount = increment(sessionCount);
    refresh();
    console.log(sessionCount);
  });

  $("#minus5Break").click(function() {
    breakCount = decrement(breakCount);
    refresh();
    console.log(breakCount);
  });

  $("#add5Break").click(function() {
    breakCount = increment(breakCount);
    refresh();
    console.log(breakCount);
  });

  $("#reset").click(function() {
    reset();
  });
});
