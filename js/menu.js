let prevScrollpos = window.pageYOffset;
const navbar = document.getElementById("menu");
const threshold = 50; // Ajusta este valor según tu necesidad

window.onscroll = function() {
  let currentScrollPos = window.pageYOffset;

  if (currentScrollPos <= threshold) {
    navbar.style.top = "0"; // Muestra la barra si está cerca de la parte superior
  } else if (prevScrollpos > currentScrollPos) {
    navbar.style.top = "0"; // Muestra la barra al subir
  } else {
    navbar.style.top = "-80px"; // Oculta la barra al bajar
  }

  prevScrollpos = currentScrollPos;
};
