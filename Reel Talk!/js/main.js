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
    document.getElementById("dropdown-top-something").innerHTML = "Top " + dropdown_name;
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

var search = document.getElementById("search");
search.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("searchbutton").click();
  }
});