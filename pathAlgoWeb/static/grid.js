// function that builds a grid in the "container"
function createGrid(size) {
  const nodes = []
  for (var row =0; row< size; row++) {
    const currentRow = [];
    //rows, columns,
     for (var col= 0; col < size; col++) {
       if (row === 0 && col === 0){
         $("#container").append("<div class='cell start-node'></div>");
       }
       else if (row === 19 && col ===19){
         $("#container").append("<div class='cell final-node'></div>");
       }
       else{
         $("#container").append("<div class='cell unvisit'></div>");
       }

        const currentNode = {
          col,
          row,
          isStart: row === 0 && col === 0,
          isFinish: row === 19 && col ===19,
          distance:Infinity,
          isVisited:false,
          isWall:false,
          previousNode: null,

        }

         currentRow.push(currentNode);
     }
  nodes.push(currentRow);

 }

//size of cell
    $(".cell").width(1500/size);
    $(".cell").height(900/size);
return nodes;
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
    if ($(this).hasClass("unvisit")){
    $(this).css("background-color", "black");
    }
    mouseHeldDown();
     });
//Function runs when mouse is clicked and held
 function mouseHeldDown() {
       //returns if mouse is not clicked
     if (!mouseStillDown) { return; }
     //when entering a cell, the background changes to black
     $(".cell").on('mouseenter',function () {
       if ($(this).hasClass("unvisit")){
        $(this).css("background-color", "black");
      }
      });

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
//animate grid Function
animateDijkstra(visitedNodeInorder){
  return;
}
//visualize dijstras algorithm Function
function visualizeDijkstras(g) {
  const startNode = g[0][0]
  const finishNode = g[19][19]
  const visitedNodesInOrder = dijkstra(g,startNode,finishNode)
  console.log(visitedNodesInOrder);
}
//main function
$(document).ready(function() {
//make grid
    grids = createGrid(20);
//set start and finish nodes (hard coded to row 1 row 1, row 20, row 20)
    //setStartFinish();
//wall draw
    wallDraw();

  //grid
    $(".newGrid").click(function() {
        refreshGrid();
    });

  //visualize dijstras
  $(".visualize").click(function() {
        visualizeDijkstras(grids);
  });



})
