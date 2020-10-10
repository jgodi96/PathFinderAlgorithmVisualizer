// function that builds a grid in the "container"
function createGrid(x) {
  for (var i =0; i < x; i++) {
    //rows, columns,
     $('#container').append('<tr>');
     for (col= 0; col < x; col++) {
         $('tr').append('<td class = "cell"></td>');
     }
 }
//size of cell
    $(".cell").width(1500/x);
    $(".cell").height(900/x);

};
// function that clears the grid
function clearGrid(){
    $(".cell").remove();
};
//wall draw logic
function wallDraw(){
  var mouseStillDown = false;
  //When mouse clicked
  $(".cell").mousedown(function() {
    mouseStillDown = true;
    $(this).css("background-color", "black");
    mouseHeldDown();
     });
     //Function runs when mouse is clicked
     function mouseHeldDown() {
       //returns if mouse is not clicked
     if (!mouseStillDown) { return; }
     //when entering a cell, the background changes to black.
     $(".cell").on('mouseenter',function () {  $(this).css("background-color", "black"); });
     //runs mouseHeldDown function every 100millseconds
     if (mouseStillDown) {   interval = setTimeout(doSomething,100); }
 }
 //when mouse click is up
 $(".cell").mouseup(function (event) {
   //turns off mouse enter function and stops changing color to black.
   $(".cell").off('mouseenter');
  mouseStillDown = false;
  mouseHeldDown()
});
}

//main func
$(document).ready(function() {
  //make grid
    createGrid(20);
//----------wall draw function-------------
    wallDraw()

  //TODO make a button to refresh grid
    $(".newGrid").click(function() {
        refreshGrid();

    });
});
