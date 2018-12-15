// VARIABLES --------------------------------------------

//      OBJECTS
var response = ''; // Array returned by GIHPY


//      ARRAYS
var topics = ['Mickey Mouse', 'Pluto', 'Chip', 'Winnie Pooh', 'Cinderella', 'Rapunzel', 'Simba', 'Jiminy Cricket'];


//      STRINGS/CHAR
var myKey = 'lKEjHvIVGBtk7Z1Ai1vo4y0bqkX3CHJp'; // Key provided by GIPHY


//      NUMBER/INTEGER
var searchLimit = 10; // How many images to return


//      BOOLEAN



// ------------------------------------------------------------

$(document).ready(function () {

  // Encode the untrusted values to avoid security breaches
  function escapeUntrustedData(data) {
    var ret = [];

    // Builld the query parameters
    for (var d in data)
      ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));

    // Log the sting (key & query)
    //console.log("Encoded string: " + ret.join("&"));

    // Return an array (already scaped) with key and query
    return ret.join("&");
  }

  function updateScreen() {
    // Log the topics array
    //console.log(topics);

    // Clear all buttons
    $("#buttons").html("");

    // Build all buttons again
    for (var c in topics)
      $("#buttons").append("<button class=\"btn btn-light mb-2 ml-3 searchMe\">" + topics[c] + "</button>");
  }

  function getGif(query) {
    // Text to look
    //console.log("Looking for: " + query);

    // Replace spaces for `+`
    query = query.replace(" ", "+");

    // create a `params` variable with key, query and limit of hits string values
    var params = {
      "api_key": myKey,
      "q": query,
      "limit": searchLimit
    };

    // encode the request to look like api_key=YOUR_API_KEY&q=YOUR_QUERY
    params = escapeUntrustedData(params);

    // Ask GIPHY and use the response
    //    Sample request "http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=YOUR_API_KEY&limit=5");

    var queryURL = "https://api.giphy.com/v1/gifs/search?" + params;

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (res) {

      // Clear and hidding the existing elements, if any
      $("#gifs").html("");
      $("#gifs").css("display", "none");

      response = res;

      // For each GIF append an element to the DOM
      for (var g in res.data) {
        var cardDiv = $("<div>").addClass("card m-2");
        var cardImg = $("<img>").attr("src", res.data[g].images.fixed_height_still.url).addClass("staticgif card-img-top").attr("id", g).appendTo(cardDiv);
        var cardBody = $("<div>").addClass("card-body").appendTo(cardDiv);
        var cardText = $("<p>").addClass("card-text").text("Rating: " + res.data[g].rating.toUpperCase()).appendTo(cardBody)

        // Append each card
        $("#gifs").append(cardDiv);

      }
      // Fade In THIS cards at once
      $("#gifs").fadeIn();

    });
  }

  // BUTTON LOGIC

  // Add character button
  $("#addCharacter").on("click", function () {

    // Get character name from form
    var newCharacter = $("#newCharacterName").val();

    if (newCharacter != "") {
      // Add a new topic to the `topics` array
      topics.push(newCharacter);

      // Clear form
      $("#newCharacterName").val("");

      updateScreen();
    } else {
      alert("Oops... you forgot to enter a character name!")
    }
  });

  // Clear images from the screen
  $("#clear").on("click", function () {
    //Fade out all cards, if any
    $(".card").fadeOut();

    // Clear the existing elements, if any
    $("#gifs").html("");
  });

  // Click a button to look for images
  $("#buttons").on("click", ".btn", function () {

    var buttonCharacter = this.innerHTML

    $("#gifs").fadeOut();

    // Wait 0.3 seconds for fadeOut to complete... then continue
    setTimeout(function () {

      // Get the search string form the form
      var query = buttonCharacter + " disney";
      console.log(query);

      // Go get the gif using the search string
      getGif(query.toLowerCase());

      // Waiting for 0.3 seconds
    }, 300);

  });

  // Show animated GIF when mouse over image
  $("#gifs").on("mouseover", ".staticgif", function () {

    $("#" + this.id).attr("src", response.data[this.id].images.fixed_height.url);
  });

  // Show static GIF when mouse leaves image
  $("#gifs").on("mouseleave", ".staticgif", function () {

    $("#" + this.id).attr("src", response.data[this.id].images.fixed_height_still.url);
  });

  // Build th screen on load
  updateScreen()
});