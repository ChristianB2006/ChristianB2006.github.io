/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  
  // Game Item Objects
  var KEY = {
    LEFT: 37,
    RIGHT: 39,
    UP: 38,
    DOWN: 40
  };
  var walker = {
    xloc: 0,
    yloc: 0,
    xspeed: 0,
    yspeed: 0
  }
  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle

  $(document).on('keyup', handleKeyUp);

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionGameItem()
    wallCollision()
    redrawGameItem()
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if (event.which === KEY.LEFT) {
      console.log("left pressed");
      walker.xspeed = -5;
    } else if (event.which === KEY.RIGHT) {
      console.log("right pressed");
      walker.xspeed = 5;
    } else if (event.which === KEY.UP) {
      console.log("up pressed");
      walker.yspeed = -5;
    } else if (event.which === KEY.DOWN) {
      console.log("down pressed");
      walker.yspeed = 5;
    }
  }
function handleKeyUp(event) {
  walker.xspeed = 0;
  walker.yspeed = 0;
}
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  function repositionGameItem() {
    walker.xloc += walker.xspeed
    walker.yloc += walker.yspeed
  }

  function redrawGameItem() {
    $("#walker").css("top", walker.yloc)
    $("#walker").css("left", walker.xloc)
  }
  
  function wallCollision() {
    var bWidth = $("#board").width()
    var bHeight = $("#board").height()
    var wWidth = $("#walker").width();
    var wHeight = $("#walker").height();

    var maxX = bWidth - wWidth;
    var maxY = bHeight - wHeight;

    walker.xloc = Math.max(0, Math.min(walker.xloc, maxX));
    walker.yloc = Math.max(0, Math.min(walker.yloc, maxY));
  }

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
