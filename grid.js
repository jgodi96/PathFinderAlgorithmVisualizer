// function that builds a grid in the "container"
function createGrid(x) {
    for (var rows = 0; rows < x; rows++) {
        for (var columns = 0; columns < x; columns++) {
            $("#container").append("<div class='cell'></div>");
        };
    };
    $(".cell").width(960/x);
    $(".cell").height(960/x);
};

// function that clears the grid
function clearGrid(){
    $(".cell").remove();
}; 

// function that prompts the user to select the number of boxes in a new grid
// the function then also creates that new grid
function refreshGrid(){
    var z = prompt("How many boxes per side?");
    clearGrid();
    createGrid(z);
};

$(document).ready(function() {
    createGrid(20);

    $(".cell").mouseover(function() {
        $(this).css("background-color", "black");
        });

    $(".newGrid").click(function() {
        refreshGrid();

        $(".cell").mouseover(function() {
        $(this).css("background-color", "black");
        });
    });
});