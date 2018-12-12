// VARIABLES --------------------------------------------

//      OBJECTS
var response = "";


//      ARRAYS
var topics = ["paris", "madrid", "new york", "toronto", "tokyo"];


//      STRINGS/CHAR
var myKey = "lKEjHvIVGBtk7Z1Ai1vo4y0bqkX3CHJp"; // Key provided by GIPHY


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
      $("#buttons").append("<button class=\"btn btn-primary mb-2 ml-3 searchMe\">" + topics[c] + "</button>");

  }

  function getResponse(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
  }

  function getGif(query) {
    // Text to look
    console.log("Looking for: " + query);

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

    getResponse("https://api.giphy.com/v1/gifs/search?" + params, function (data) {

      // Get only the GIFS of the data
      var gifs = JSON.parse(data);
      response = gifs;

      // Log the array with all the GIF info
      console.log(gifs.data);

      // For each GIF append an element to the DOM
      for (var g in gifs.data) {

        // Select the `fixed_width` address only
        // var gifX = gifs.data[g].images.fixed_height.url;
        var gifX = gifs.data[g].images.fixed_height_still.url;

        // 'divGif' Will contain all the elements for the new GIF
        var divGif = $("<div></div>");

        divGif.append("Rating: " + gifs.data[g].rating + "<br>");
        divGif.append("<img src=\"" + gifX + "\" class=\"staticgif\" width=\"200px\" id=\"" + g + "\">");

        // Add the image in the page
        $("#gifs").append(divGif);
      }
    });
  }

  // Add city button
  $("#addCity").on("click", function () {

    // Get city name from form
    var newCity = $("#newCityName").val();

    if (newCity != "") {
      // Add a new topic to the `topics` array
      topics.push(newCity);

      updateScreen();
    } else {
      alert("City value cannot be empty!")
    }

  });

  // Search for a GIF using the search box
  $("#submit").on("click", function () {
    // Clear the existing elements, if any
    $("#gifs").html("");

    // Get the search string form the form
    var query = $("#inlineFormInput").val();

    // Go get the gif using the search string
    getGif(query);
  });

  // Click a button to look for images
  $("#buttons").on("click", ".btn", function () {
    // Clear the existing elements, if any
    $("#gifs").html("");

    console.log(this.innerHTML);

    // Get the search string form the form
    var query = this.innerHTML;

    // Go get the gif using the search string
    getGif(query);
  });

  $("#gifs").on("mouseover", ".staticgif", function () {

    $("#" + this.id).attr("src", response.data[this.id].images.fixed_height.url);

  });

  $("#gifs").on("mouseleave", ".staticgif", function () {

    $("#" + this.id).attr("src", response.data[this.id].images.fixed_height_still.url);

  });


  // Build th screen on load
  updateScreen()
});