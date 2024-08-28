let prevScrollpos = window.pageYOffset;
const navbar = document.getElementById("menu");

window.onscroll = function() {
  let currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    navbar.style.top = "0";
  } else {
    navbar.style.top = "-80px"; // Ajusta este valor según la altura de tu navbar
  }
  prevScrollpos = currentScrollPos;
}
