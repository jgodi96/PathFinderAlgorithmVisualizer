// function that builds a grid in the "container"
function createGrid(x) {
  for (var i =0; i < x; i++) {
     let row = $('#container').append('<tr>');
     for (col= 0; col < x; col++) {
         $('tr').append('<td class = "grid"></td>');
     }
 }
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
