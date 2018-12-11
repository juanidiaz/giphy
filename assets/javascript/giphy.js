// VARIABLES --------------------------------------------

//      OBJECTS



//      ARRAYS



//      STRINGS/CHAR
var searchString = "" // What to look for
var myKey = "lKEjHvIVGBtk7Z1Ai1vo4y0bqkX3CHJp"; // Key provided by GIPHY


//      NUMBER/INTEGER
var searchLimit = 10; // How many images to return


//      BOOLEAN



// ------------------------------------------------------------

// $(document).ready(function () {

//     console.log("Yup... its loaded!");


//     $("#submit").on("click", function () {

//         console.log("CLICKED");
//         searchString = "ryan+gosling";

//         //javascript, jQuery
//         var xhr = $.get("http://api.giphy.com/v1/gifs/search?q=" + searchString + "&api_key=" + myKey + "&limit=" + searchLimit);

//         xhr.done(function (data) {
//             console.log("success got data", data);

//             for (var i = 0; i < searchLimit; i++) {

//                 console.log("URL: " + data.data[i].images.fixed_height.url + "Rating: " + data.data[i].rating);
//                 $("#gifs").append("<img src = " + data.data[i].images.fixed_height.url + " alt = \"Powered By GIPHY\" id = \"gif" + i + "\"><br>");

//             }

//         });


//     })

// });


$(document).ready(function() {
  
    /* 
    * The following two functions are used for making the API call using
    * pure Javascript. I wouldn't worry about the details
    */
  
    function encodeQueryData(data)
    {
       var ret = [];
       for (var d in data)
          ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
       return ret.join("&");
    }
  
    function httpGetAsync(theUrl, callback)
    {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() { 
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                callback(xmlHttp.responseText);
        }
        xmlHttp.open("GET", theUrl, true); // true for asynchronous 
        xmlHttp.send(null);
    }
  
    /*
    * The following functions are what do the work for retrieving and displaying gifs
    * that we search for.
    */
  
    function getGif(query)
    {
      console.log(query);
      query = query.replace(' ', '+');
      var params = { 'api_key': myKey, 'q': query};
      params = encodeQueryData(params);
  
      // api from https://github.com/Giphy/GiphyAPI#search-endpoint 
  
      httpGetAsync('http://api.giphy.com/v1/gifs/search?' + params, function(data) {
        var gifs = JSON.parse(data);
        var firstgif = gifs.data[0].images.fixed_width.url;
        $("#image").html("<img src='" + firstgif + "'>");
        console.log(gifs.data);
      });
    }
  
    $("#submitButton").on("click", function()
    {
      var query = $("#inputQuery").val();
      getGif(query);
    });

});
