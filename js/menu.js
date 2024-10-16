let prevScrollpos = window.pageYOffset;
const navbar = document.getElementById("menu");

window.onscroll = function() {
  let currentScrollPos = window.pageYOffset;
  const windowHeight = window.innerHeight;

  // La mitad de la altura de la ventana
  const halfWindowHeight = windowHeight / 2;

  if (currentScrollPos <= halfWindowHeight) {
    navbar.style.top = "0"; // Muestra la barra si está en la parte superior
  } else if (prevScrollpos > currentScrollPos) {
    navbar.style.top = "0"; // Muestra la barra al subir
  } else {
    navbar.style.top = "-80px"; // Oculta la barra al bajar
  }

  prevScrollpos = currentScrollPos;
};
