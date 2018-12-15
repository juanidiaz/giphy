// VARIABLES --------------------------------------------

//      OBJECTS



//      ARRAYS



//      STRINGS/CHAR



//      NUMBER/INTEGER



//      BOOLEAN



// ------------------------------------------------------------

$(document).ready(function () {

    // CODE GOES HERE
    var mainDiv = $("#buttons");
    var visible = false;

    $("#logo").css("display", "none");
    var newButton = $("<button>").attr("type", "submit").attr("id", "newButton").addClass("ml-3 btn btn-light mb-2").text("Click to FADE IN").appendTo(mainDiv);

    var newImage = $("<img>").attr("src", "./assets/images/PoweredBy_200_Horizontal_Light-Backgrounds_With_Logo.gif").attr("alt", "Disney Logo").attr("id", "logo2").css("display", "none");
    var visibleImg = false;

    //<img src="./assets/images/disney_logo_gold.png" alt="Disney Logo" id="logo">


    $("#fadeIn").click(function () {
        console.log('Fading in');
        $("#logo").fadeIn();
        visible = true;
        // $("#div2").fadeIn("slow");
        // $("#div3").fadeIn(3000);
    });

    $("#fadeOut").click(function () {
        console.log('Fading out');
        $("#logo").fadeOut();
        visible = false;
        // $("#div2").fadeIn("slow");
        // $("#div3").fadeIn(3000);

    });

    $("#newButton").click(function () {
        console.log('NEW BUTTON');
        newImage.appendTo($("#main"));

        if (visibleImg) {
            newButton.text("Click to FADE IN");
            newImage.fadeOut();
            visibleImg = false;

        } else {
            newButton.text("Click to FADE OUT");
            newImage.fadeIn();
            visibleImg = true;

        }


        if (visible) {
            $("#logo").fadeOut();
            visible = false;

        } else {
            $("#logo").fadeIn();
            visible = true;

        }

    });


});