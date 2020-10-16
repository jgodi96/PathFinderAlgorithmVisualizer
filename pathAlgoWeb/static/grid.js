const START_NODE_ROW = 9;
const START_NODE_COL = 3;
const END_NODE_ROW = 9;
const END_NODE_COL = 16;
//display grid in web
function displayGrid(gr){
$("#container").empty()
  const nodes = []
 for (var row =0; row< 20; row++) {

   const currentRow = [];
   //rows, columns,
    for (var col= 0; col < 20; col++) {
      if (gr[row][col].row === START_NODE_ROW && gr[row][col].col === START_NODE_COL){
        $("#container").append("<div class='cell start-node'></div>");
      }
      else if (gr[row][col].row === END_NODE_ROW && gr[row][col].col ===END_NODE_COL){
        $("#container").append("<div class='cell final-node'></div>");
      }
      else if (gr[row][col].isVisited == true){
        $("#container").append("<div class='cell visited-node'></div>");
      }
      else{
        $("#container").append("<div class='cell unvisit'></div>");
      }
    }
    console.log("updated grid")
}

//size of cell
   $(".cell").width(1500/20);
   $(".cell").height(900/20);
return nodes;
}
// function that builds a grid in the "container"
function createGrid(size) {
  const nodes = []
  for (var row =0; row< size; row++) {
    const currentRow = [];
    //rows, columns,
     for (var col= 0; col < size; col++) {

        const currentNode = {
          col,
          row,
          isStart: row === START_NODE_ROW && col === START_NODE_COL,
          isFinish: row === END_NODE_ROW && col === END_NODE_COL,
          distance:Infinity,
          isVisited:false,
          isWall:false,
          previousNode: null,

        }

         currentRow.push(currentNode);
     }
  nodes.push(currentRow);

 }

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
     if (mouseStillDown) {   interval = setTimeout(mouseHeldDown,100); }
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
function animateDijkstra(visitedNodesInOrder,g){
  const newGrid = g.slice();
  for(let i =0; i< visitedNodesInOrder.length; i++){

      const nodenode = visitedNodesInOrder[i];
      const newNode = {
        ...nodenode,
        isVisited: true,
      };
      newGrid[nodenode.row][nodenode.col] = newNode;

  }
displayGrid(newGrid);
console.log(newGrid);

}
//visualize dijstras algorithm Function
function visualizeDijkstras(g) {
  const startNode = g[START_NODE_ROW][START_NODE_COL]
  const finishNode = g[END_NODE_ROW][END_NODE_COL]
  const visitedNodesInOrder = dijkstra(g,startNode,finishNode)
  //console.log(visitedNodesInOrder);
  animateDijkstra(visitedNodesInOrder,g);
}
//main function
$(document).ready(function() {
//make grid
    grids = createGrid(20);
//display grid
displayGrid(grids);
//wall draw
    $(".whole-grid").hover(function(){
      wallDraw();
    });

  //grid
    $(".newGrid").click(function() {
       this.grids = createGrid(20)
       displayGrid(this.grids)
       console.log(this.grids)
    });

  //visualize dijstras
  $(".visualize").click(function() {

        visualizeDijkstras(grids);
        console.log("done")
  });





});
