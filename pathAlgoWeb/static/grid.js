
// function that builds a grid in the "container"
function createGrid(size) {
  const nodes = []
  for (var row =0; row< size; row++) {
    const currentRow = [];
    //rows, columns,
     for (var col= 0; col < size; col++) {
       $("#container").append("<div class='cell'></div>");
        const currentNode = {
          col,
          row,
          isStart: row === 1 && col === 1,
          isFinish: row === 20 && col ===20
        }
         currentRow.push(currentNode)
     }
 }
//size of cell
    $(".cell").width(1500/size);
    $(".cell").height(900/size);

};
// function that clears the grid
function refreshGrid(){
    $(".cell").css("background-color",'');
};
//function that contains wall draw logic
function wallDraw(){
  var mouseStillDown = false;
  //When mouse clicked
  $(".cell").mousedown(function() {
    mouseStillDown = true;
    $(this).css("background-color", "black");
    mouseHeldDown();
     });
//Function runs when mouse is clicked and held
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
  mouseHeldDown();
});
}

//main function
$(document).ready(function() {
//make grid
    createGrid(20);
//wall draw
    wallDraw();

  //TODO make a button to refresh grid
    $(".newGrid").click(function() {
        refreshGrid();

    });
})
