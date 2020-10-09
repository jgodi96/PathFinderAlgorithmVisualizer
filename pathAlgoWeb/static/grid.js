// function that builds a grid in the "container"
function createGrid(x) {
    for (var rows = 0; rows < x; rows++) {
        for (var columns = 0; columns < x; columns++) {
            $("#container").append("<div class='grid'></div>");
        };
    };
    $(".grid").width(1500/x);
    $(".grid").height(900/x);
};
// function that clears the grid
function clearGrid(){
    $(".grid").remove();
};
//grid
$(document).ready(function() {
    createGrid(20);

    var mouseStillDown = false;

    $(".grid").mousedown(function() {
      mouseStillDown = true;
      $(this).css("background-color", "black");
      doSomething();
       });

       function doSomething() {
       if (!mouseStillDown) { return; }

       $(".grid").on('mouseenter', function () {  $(this).css("background-color", "black"); });




       if (mouseStillDown) {   interval = setTimeout(doSomething,100); }
   }
   $(".grid").mouseup(function(event) {
     
     $(".grid").off('mouseenter');
    mouseStillDown = false;
    doSomething()
});


    $(".newGrid").click(function() {
        refreshGrid();

    });
});
