const START_NODE_ROW = 9;
const START_NODE_COL = 3;
const END_NODE_ROW = 9;
const END_NODE_COL = 16;
let wallSet = new Set()


//display grid in web
function displayGrid(gr){
$("#container").empty()
  const nodes = []
 for (var row =0; row< 20; row++) {
   const currentRow = [];
   //rows, columns,
    for (var col= 0; col < 20; col++) {

      if (gr[row][col].row === START_NODE_ROW && gr[row][col].col === START_NODE_COL && gr[row][col].isShortest==false && gr[row][col].isWall==false){
        $("#container").append("<div class='cell start-node'></div>");
      }
      else if (gr[row][col].row === END_NODE_ROW && gr[row][col].col ===END_NODE_COL && gr[row][col].isShortest==false && gr[row][col].isWall==false){
        $("#container").append("<div class='cell final-node'></div>");
      }
      else if (gr[row][col].isVisited == true && gr[row][col].isShortest==false && gr[row][col].isWall==false){
        $("#container").append("<div class='cell visited-node'></div>");
      }
      else if (gr[row][col].isShortest == true){
        $("#container").append("<div class='cell shortest-node'></div>");
      }
      else if(gr[row][col].isWall == true){
        $("#container").append("<div class='cell wall-node'></div>");
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
   $(".dummyCell").width(1500/20);
   $(".dummyCell").height(900/20);

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
          isShortest: false,
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
function wallDraw(setWall){
  var mouseStillDown = false;
  //When mouse clicked
  $(".cell").mousedown(function() {
    mouseStillDown = true;
    if ($(this).hasClass("unvisit")){
    $(this).css("background-color", "black");
    console.log($(this).index())
    setWall.add($(this).index())
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
        console.log($(this).index())
        setWall.add($(this).index())
        console.log(setWall)
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
return setWall
}


//animate grid Function
function animateDijkstra(visitedNodesInOrder,nodesInShortestPath,g){
  console.log(visitedNodesInOrder)
  console.log(nodesInShortestPath)
  const newGrid = g.slice();
  k=0
  for(let i =0; i< visitedNodesInOrder.length; i++){
      const nodenode = visitedNodesInOrder[i];
      const newNode = {
        ...nodenode,
        isVisited: true,
        isShortest: nodesInShortestPath[k].row == visitedNodesInOrder[i].row && nodesInShortestPath[k].col == visitedNodesInOrder[i].col
      };
      newGrid[nodenode.row][nodenode.col] = newNode;
      if (nodesInShortestPath[k].row == visitedNodesInOrder[i].row && nodesInShortestPath[k].col == visitedNodesInOrder[i].col){
        if (k!=nodesInShortestPath.length-1)
            k+=1;
        //console.log(k)
      }
  }
displayGrid(newGrid);
console.log(newGrid);
}

//visualize dijstras algorithm Function
function visualizeDijkstras(g) {
  const startNode = g[START_NODE_ROW][START_NODE_COL]
  const finishNode = g[END_NODE_ROW][END_NODE_COL]
  const visitedNodesInOrder = dijkstra(g,startNode,finishNode)
  const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode)
  //console.log(nodesInShortestPathOrder)
  animateDijkstra(visitedNodesInOrder,nodesInShortestPathOrder,g);
}


//update Nodes function called only when wall
function updateNodes(set,grids){
  if (set.size == 0){
    console.log("set is empty")
    return grids;
  }
  else{
    k=0
    for (let i=0; i<grids.length;i++)
    {
      for (let j=0;j<grids.length;j++)
      {
          if(set.has(k)==true){
            grids[i][j].isWall=true
            console.log(grids[i][j].row)
            console.log(grids[i][j].col)
            console.log(grids[i][j].isWall)
          }
          k+=1
      }
    }
return grids;
  }

}


//main function
$(document).ready(function() {
//make grid
    grids = createGrid(20);
//display grid
displayGrid(grids);
//wall draw
    $(".whole-grid").hover(function(){
      wallSet = wallDraw(wallSet);
      //console.log(wallSet);
      grids = updateNodes(wallSet,grids)
      //console.log(grids)
    });

  //grid
    $(".newGrid").click(function() {
       this.grids = createGrid(20)
       displayGrid(this.grids)
       wallSet = new Set()
       //console.log(this.grids)
       location.reload();

    });
  //visualize dijstras
  $(".visualize").click(function() {
        visualizeDijkstras(grids);
        console.log("done")
  });
});
