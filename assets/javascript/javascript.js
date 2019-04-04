$( document ).ready(function() {
var actions = ["Waving", "Jumping", "Drinking", "Racing", "Pulling", "Playing", "Laughing", "Boxing", "Searching", "Smiling" ,"Blinking", "Hi", "No", "Yes"];

function displayButtons(){
    $("#gifButtonsMenu").empty(); 
    for (var i = 0; i < actions.length; i++){
        var gifButton = $("<button>");
        gifButton.addClass("btn btn-primary");
        gifButton.addClass("action");
        gifButton.attr("data-name", actions[i]);
        gifButton.text(actions[i]);
        $("#gifButtonsMenu").append(gifButton);
    }
}

// Adding new criteria button
function addNewButton(){
    $("#addGif").on("click", function(){
    var action = $("#criteria-input").val().trim();
    if (action == ""){ return false; }
    actions.push(action);
    displayButtons();
    return false;
    });
}

function reset(){
    $("reset").on("click", function(){
    actions.pop(action);
    displayButtons();
    return false;
    });
}
// Displaying gif's
function displayGifs(){
    var action = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + action + "&api_key=dc6zaTOxFJmzC&limit=10";
    $.ajax({url: queryURL, method: 'GET'})
    .done(function(response) {
        $("#gifsContainer").empty();
        var results = response.data;
        if (results == ""){ alert("There isn't a gif for selected criteria @ Giphy")}
        for (var i=0; i<results.length; i++){
            var gifDiv = $("<div>");
            gifDiv.addClass("gifDiv");
            var gifRating = $("<p>").text("Rating: " + results[i].rating);
            gifDiv.append(gifRating);
            var gifImage = $("<img>");
            gifImage.attr("src", results[i].images.fixed_height_small_still.url);
            gifImage.attr("data-state", "still"); // set the initial image state
            gifImage.attr("data-animate",results[i].images.fixed_height_small.url); // animated image
            gifImage.attr("data-still",results[i].images.fixed_height_small_still.url); // still image
            gifImage.addClass("image");
            gifDiv.append(gifImage);
            $("#gifsContainer").prepend(gifDiv);
        }
    });
}

displayButtons(); 
addNewButton();
reset();
$(document).on("click", ".action", displayGifs);
$(document).on("click", ".image", function(){
    var state = $(this).attr('data-state');
    if ( state == 'still'){
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate')}
    else{
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still')}
});
});
