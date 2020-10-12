// function that builds a grid in the "container"

function createGrid(size) {
  for (var row =0; row< size; row++) {
    //rows, columns,
     let rows = $('<tr></tr>');
     for (var col= 0; col < size; col++) {
         rows.append('<td class = "cell"></td>');
     }
    $("#container").append(rows);
 }
 //get initial grid
 getInitialGrid = (
    rowCount = 20,
    colCount = 20,
  ) => {
    const nodes = [];
    for (let row = 0; row < rowCount; row++) {
      const currentRow = [];
      for (let col = 0; col < colCount; col++) {
        currentRow.push(this.createNode(row, col));
      }
      initialGrid.push(currentRow);
    }
    return initialGrid;
  };

  djikstraAlgorithm(startNode) {
     let distances = {};

     // Stores the reference to previous nodes
     let prev = {};
     let pq = new PriorityQueue(this.nodes.length * this.nodes.length);

     // Set distances to all nodes to be infinite except startNode
     distances[startNode] = 0;
     pq.enqueue(startNode, 0);
     this.nodes.forEach(node => {
        if (node !== startNode) distances[node] = Infinity;
        prev[node] = null;
     });

     while (!pq.isEmpty()) {
        let minNode = pq.dequeue();
        let currNode = minNode.data;
        let weight = minNode.priority;
        this.edges[currNode].forEach(neighbor => {
           let alt = distances[currNode] + neighbor.weight;
           if (alt < distances[neighbor.node]) {
              distances[neighbor.node] = alt;
              prev[neighbor.node] = currNode;
              pq.enqueue(neighbor.node, distances[neighbor.node]);
           }
        });
     }
     return distances;
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
});
