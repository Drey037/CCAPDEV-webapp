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

function showDropdown(elem_id) {
    let dropdown_menu = document.getElementById(elem_id);
    let dropdown_box = document.getElementById("nav-dropdown-wrapper");
    let dropdown_name = dropdown_menu.innerHTML;
    let elem_bounds = dropdown_menu.getBoundingClientRect();

    dropdown_box.style.right = (screen.width - elem_bounds.right) + "px";
    dropdown_box.style.display = "inline-block";
    document.getElementById("dropdown-top-something").innerHTML = "Top " + dropdown_name;
}