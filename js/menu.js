let prevScrollpos = window.pageYOffset;
const navbar = document.getElementById("menu");
const navbarCollapse = document.getElementById("navbarSupportedContent");
const toggler = document.querySelector(".navbar-toggler");

window.onscroll = function() {
  let currentScrollPos = window.pageYOffset;
  const windowHeight = window.innerHeight;
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

// Cerrar el menú de navegación al seleccionar una opción
// Cerrar el menú de navegación solo si NO es dropdown-toggle
document.addEventListener("DOMContentLoaded", function() {
  const navLinks = document.querySelectorAll("#navbarSupportedContent .nav-link:not(.dropdown-toggle)");

  navLinks.forEach(link => {
    link.addEventListener("click", function() {
      const bsCollapse = new bootstrap.Collapse(navbarCollapse);
      bsCollapse.hide(); // Cierra el menú
    });
  });
});

// Cerrar el menú al hacer clic en el botón de toggle
toggler.addEventListener("click", function() {
  if (navbarCollapse.classList.contains("show")) {
    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
    bsCollapse.hide(); // Cierra el menú si está abierto
  }
});

// Cerrar el menú al hacer clic fuera de él
document.addEventListener("click", function(event) {
  if (!navbarCollapse.contains(event.target) && !toggler.contains(event.target) && navbarCollapse.classList.contains("show")) {
    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
    bsCollapse.hide(); // Cierra el menú
  }
});


