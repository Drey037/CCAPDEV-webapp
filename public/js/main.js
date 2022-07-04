function SignUpOverlayOn() {
    document.getElementById("oops").style.display = "none";
    document.getElementById("darkoverlay").style.display = "block";
    document.getElementById("signup").style.display = "block";
}

function SignUpOverlayOff() {
    document.getElementById("darkoverlay").style.display = "none";
    document.getElementById("signup").style.display = "none";
}

function SignUpSuccess() {
    document.getElementById("signup").style.display = "none";
    document.getElementById("signup-success").style.display = "block";
}

function SignUpSuccessClose() {
    document.getElementById("signup-success").style.display = "none";
    document.getElementById("login").style.display = "block";
}

function LoginOverlayOn() {
    document.getElementById("oops").style.display = "none";
    document.getElementById("darkoverlay").style.display = "block";
    document.getElementById("login").style.display = "block";
}

function LoginOverlayOff() {
    document.getElementById("darkoverlay").style.display = "none";
    document.getElementById("login").style.display = "none";
}

function LoginSuccess() {
    document.getElementById("login").style.display = "none";
    document.getElementById("login-success").style.display = "block";
}

function oops() {
    document.getElementById("darkoverlay").style.display = "block";
    document.getElementById("oops").style.display = "block";
}

function oopsoff() {
    document.getElementById("darkoverlay").style.display = "none";
    document.getElementById("oops").style.display = "none";
}

function NewReviewOverlayOn() {
    console.log("Opening new review");
    document.getElementById("darkoverlay").style.display = "block";
    document.getElementById("new-review").style.display = "inline-block";
}

function NewReviewOverlayOff() {
    document.getElementById("darkoverlay").style.display = "none";
    document.getElementById("new-review").style.display = "none";    
}

function showDropdown(elem_id) {
    let dropdown_menu = document.getElementById(elem_id);
    let dropdown_box = document.getElementById("nav-dropdown-wrapper");
    let dropdown_name = dropdown_menu.innerHTML;
    let elem_bounds = dropdown_menu.getBoundingClientRect();

    dropdown_box.style.right = (screen.width - elem_bounds.right) + "px";
    dropdown_box.style.display = "inline-block";

    var genre_links = document.querySelectorAll(".genre-col a");
    for(var i = 0; i < genre_links.length; i++) {
        var current = genre_links[i];
        current.setAttribute("href", "/search-genre/" + dropdown_name + "/" + current.innerHTML);
    }
}

function showUserDropdown() {
    let user_dropdown = document.getElementById("user-dropdown");
    let profile_box = document.getElementsByClassName("profile")[0].getBoundingClientRect();
    user_dropdown.style.display = "inline-block";
    user_dropdown.style.left = profile_box.left + "px";
}

function hideDropdown() {
    document.getElementById("nav-dropdown-wrapper").style.display = "none";
    if(document.getElementById("user-dropdown") != null) {
        document.getElementById("user-dropdown").style.display = "none";
    }
}

// Takes care of hiding dropdown when something outside it is clicked
document.onclick = function(e) {
    if(!document.getElementsByClassName("nav-items")[0].contains(e.target)) {
        hideDropdown();
    }
}



// The Search Function (MIGHT CHANGE LATER)
var search = document.getElementById("search");
search.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("searchbutton").click();
  }
});



//The rating functions in Review Page
function ratingincrement(id) {
    var value = parseInt(document.getElementById(id).value, 10);
    value = isNaN(value) ? 0 : value;
    value++;
    document.getElementById(id).value = value;
}

function ratingdecrement(id) {
    var value = parseInt(document.getElementById(id).value, 10);
    value = isNaN(value) ? 0 : value;
    value--;
    document.getElementById(id).value = value;
}

function clickrating (id) { 
    if (id.charAt(0) === 'u') {
        var idbutton = "upbutton" + id.substring(2);
        var string = "down" + id.substring(2);
        var opbutton = "downbutton" + id.substring(2);
    }
    else {
        var idbutton = "downbutton" + id.substring(4);
        var string = "up" + id.substring(4);
        var opbutton = "upbutton" + id.substring(4);
    }

    //Checks if the opposite thumb is active, it disables if so
    if (document.getElementById(opbutton).classList.contains("active")) {
        ratingInactive (string);
        ratingInactive(opbutton)
        ratingdecrement(string);
    }

    //Checks if the thumb pressed is active, it disables if so
    if (document.getElementById(idbutton).classList.contains("active")) {
        ratingInactive (idbutton);
        ratingInactive(id)
        ratingdecrement(id);
    }
    else {
        ratingActive (idbutton);
        ratingActive (id);
        ratingincrement(id);
    }
}

function ratingActive (id) {
    document.getElementById(id).classList.add("active");
}

function ratingInactive (id) {
    document.getElementById(id).classList.remove("active");
}


//This is to activate the Add to Watchlist Pop Up
function AddOverlayOn() {
    document.getElementById("darkoverlay").style.display = "block";
    document.getElementById("add-to-watchlist").style.display = "block";
}

function AddOverlayOff() {
    document.getElementById("darkoverlay").style.display = "none";
    document.getElementById("add-to-watchlist").style.display = "none";
}

function NewWatchlistOn() {
    AddOverlayOff();
    document.getElementById("darkoverlay").style.display = "block";
    document.getElementById("new-watchlist").style.display = "block";
}

function NewWatchlistOff() {
    document.getElementById("darkoverlay").style.display = "none";
    document.getElementById("new-watchlist").style.display = "none";
}


// Completes href of watchlist buttons in add to watchlist
function addToWatchlist(showId) {
    AddOverlayOn(); 
    var watchlists = document.getElementsByClassName("add-to-watchlist-showId");
    for(var i = 0; i < watchlists.length; i++) {
        watchlists[i].setAttribute("value", showId);
        console.log(watchlists[i].getAttribute("value"))
    }
} 


function deleteUser() {
    $.ajax({
        type: "POST",
        url: "/delete"
    });
} 



$(document).ready(function () {
    $('#carousel-inner').on('click', '.createReview', function () {
        var details = $.trim($(this).parent().siblings('h3').html());

        var title = details.split("(")[0];
        title = title.substring(0, title.length - 1);

        var year = details.split("(")[1];
        year = year.split(")")[0];

        console.log(title);
        console.log(year);

        
        $.ajax({
            type: "GET",
            url: "/get-create-review",
            data: {title: title, year: year},
        });
    });
});

function removeFromWatchlist(showId, watchlistId) {
    $.ajax({
        type: "POST",
        url: "/remove-from-watchlist",
        data: {showId: showId, watchlistId: watchlistId}
    });
}