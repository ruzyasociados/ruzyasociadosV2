const isEnglish =
  location.pathname.includes("/english/") ||
  location.pathname.includes("/servicios-en/");

const pageTransitionDuration = 520;
const pageLoadStartedAt = performance.now();
let pageLoadFinished = false;

function ensurePageLoader() {
  if (document.querySelector(".page-loader")) return;

  const loader = document.createElement("div");
  loader.className = "page-loader";
  loader.setAttribute("aria-hidden", "true");
  loader.innerHTML =
    '<div class="page-loader__mark"><span></span><span></span><span></span></div>';
  document.body.append(loader);
  document.body.classList.add("page-is-loading");

  requestAnimationFrame(() => loader.classList.add("is-visible"));
}

function finishPageLoad() {
  const loader = document.querySelector(".page-loader");
  if (!loader || pageLoadFinished) return;

  const revealLoader = () => {
    if (pageLoadFinished) return;
    pageLoadFinished = true;

    const minimumVisibleTime = 900;
    const elapsed = performance.now() - pageLoadStartedAt;
    const delay = Math.max(0, minimumVisibleTime - elapsed);

    setTimeout(() => {
      document.body.classList.add("page-ready");

      requestAnimationFrame(() => {
        loader.classList.add("is-hiding");
        document.body.classList.remove("page-is-loading");
      });

      setTimeout(() => loader.remove(), 520);
    }, delay);
  };

  if (document.readyState === "complete") {
    revealLoader();
  } else {
    window.addEventListener("load", revealLoader, { once: true });
  }
}

function setupPageTransitions() {
  document.querySelectorAll("a[href]").forEach((link) => {
    if (link.dataset.transitionReady) return;
    link.dataset.transitionReady = "true";

    link.addEventListener("click", (event) => {
      if (
        event.defaultPrevented ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        link.target === "_blank" ||
        link.hasAttribute("download")
      ) {
        return;
      }

      const destination = new URL(link.href, window.location.href);
      const isSamePage =
        destination.origin === window.location.origin &&
        destination.pathname === window.location.pathname &&
        destination.search === window.location.search;

      if (destination.origin !== window.location.origin || isSamePage) return;

      event.preventDefault();
      ensurePageLoader();
      document.querySelector(".page-loader")?.classList.remove("is-hiding");
      document.body.classList.remove("page-ready");
      document.body.classList.add("page-is-loading");

      setTimeout(() => {
        window.location.href = destination.href;
      }, pageTransitionDuration);
    });
  });
}

ensurePageLoader();

const serviceLinks = isEnglish
  ? `<a href="../servicios-en/en-servicios.html">Services overview</a><a href="../servicios-en/en-aperturas-negocio.html">Business openings</a><a href="../servicios-en/en-planificacion-tributaria-internacional.html">International trade</a><a href="../servicios-en/en-asesoria-integral.html">Integral consulting</a><a href="../servicios-en/en-soluciones-de-cumplimiento.html">Compliance</a><a href="../servicios-en/en-estudios-de-presios-de-transferencia.html">Transfer pricing</a><a href="../servicios-en/en-migracion.html">Migration</a><a href="../servicios-en/en-corporativo.html">Corporate services</a><a href="../servicios-en/en-legal.html">Legal</a>`
  : `<a href="../servicios/servicios.html">Cartera de servicios</a><a href="../servicios/aperturas-negocio.html">Aperturas de negocio</a><a href="../servicios/planificacion.html">Comercio internacional</a><a href="../servicios/asesoria.html">Asesoría integral</a><a href="../servicios/cumplimiento-obligaciones.html">Cumplimiento</a><a href="../servicios/estudios.html">Precios de transferencia</a><a href="../servicios/migracion2.html">Migración</a><a href="../servicios/corporativos.html">Servicios corporativos</a><a href="../servicios/legal2.html">Legal</a>`;
const root = "../";
const languageHref = (home) => {
  if (home) return isEnglish ? "../index.html" : "english/home.html";
  const file = location.pathname.split("/").pop();
  const map = {
    "en-aperturas-negocio.html": "aperturas-negocio.html",
    "en-soluciones-de-cumplimiento.html": "cumplimiento-obligaciones.html",
    "en-corporativo.html": "corporativos.html",
    "en-asesoria-integral.html": "asesoria.html",
    "en-planificacion-tributaria-internacional.html": "planificacion.html",
    "en-migracion.html": "migracion2.html",
    "en-estudios-de-presios-de-transferencia.html": "estudios.html",
    "en-legal.html": "legal2.html",
    "en-servicios.html": "servicios.html",
    "en-contacto.html": "contacto.html",
  };
  const reverseMap = Object.fromEntries(
    Object.entries(map).map(([englishFile, spanishFile]) => [
      spanishFile,
      englishFile,
    ]),
  );
  return isEnglish
    ? "../servicios/" +
        (map[file] || file.replace(/^en-/, "")).replace(
          /^servicios$/,
          "servicios.html",
        )
    : "../servicios-en/" + (reverseMap[file] || `en-${file}`);
};
function modernNav(home = false) {
  const prefix = home ? "../" : root;
  return `<div class="topline"><div class="shell topline__inner"><span><i class="bi bi-shield-check"></i> ${isEnglish ? "Confidence beyond borders" : "Confianza que trasciende fronteras"}</span><span>MX · USA · CAN</span></div></div><header class="site-header" id="menu"><div class="shell nav-wrap"><a class="brand" href="${prefix}${isEnglish ? "english/home.html" : "index.html"}"><img src="${prefix}img/logo-ruz-b.png" alt="Ruz y Asociados"></a><button class="nav-toggle" aria-label="Open menu" aria-expanded="false"><span></span><span></span></button><nav class="nav-links"><a class="is-active" href="${prefix}${isEnglish ? "english/home.html" : "index.html"}">${isEnglish ? "Home" : "Inicio"}</a><div class="nav-dropdown"><button type="button">${isEnglish ? "Services" : "Servicios"} <i class="bi bi-chevron-down"></i></button><div class="dropdown-panel">${serviceLinks}</div></div><a href="${home ? "#firm" : "../" + (isEnglish ? "english/home.html" : "index.html") + "#firma"}">${isEnglish ? "The firm" : "La firma"}</a><a href="${home ? "#presencia" : "../" + (isEnglish ? "english/home.html" : "index.html") + "#presencia"}">${isEnglish ? "Presence" : "Presencia"}</a><a href="${prefix}${isEnglish ? "servicios-en/en-contacto.html" : "servicios/contacto.html"}" class="nav-cta">${isEnglish ? "Let’s talk" : "Hablemos"} <i class="bi bi-arrow-up-right"></i></a><a class="language" href="${isEnglish ? (home ? "../index.html" : "../servicios/" + location.pathname.split("/").pop().replace(/^en-/, "").replace("en-", "")) : home ? "english/home.html" : "../servicios-en/en-" + location.pathname.split("/").pop()}"><i class="bi bi-globe2"></i> ${isEnglish ? "ES" : "EN"}</a></nav></div></header>`;
}
function modernFooter() {
  return `<footer><div class="shell footer__top"><a class="brand" href="${isEnglish ? "../english/home.html" : "../index.html"}"><img src="${isEnglish ? "../" : "../"}img/logo-ruz-b.png" alt="Ruz y Asociados"></a><p>${isEnglish ? "Advisory that transforms complexity into opportunity." : "Asesoría que transforma la complejidad en oportunidad."}</p><div class="footer__social"><a href="https://mx.linkedin.com/company/ruz-y-asociados-sc-" aria-label="LinkedIn"><i class="bi bi-linkedin"></i></a><a href="https://www.facebook.com/profile.php?id=100066439762105" aria-label="Facebook"><i class="bi bi-facebook"></i></a><a href="https://www.instagram.com/ruzyasociados_/" aria-label="Instagram"><i class="bi bi-instagram"></i></a></div></div><div class="shell footer__bottom"><span>© 2026 Ruz y Asociados. ${isEnglish ? "All rights reserved." : "Todos los derechos reservados."}</span><span>${isEnglish ? "Privacy notice" : "Aviso de privacidad"}</span></div></footer>`;
}
function englishHome() {
  document.body.innerHTML = `${modernNav(true)}<main><section class="hero"><div class="hero__image"></div><div class="hero__grain"></div><div class="shell hero__content"><div class="eyebrow reveal"><span></span> Multidisciplinary firm · Since 2001</div><h1 class="reveal delay-1">Certainty to<br><em>move forward.</em></h1><p class="hero__lead reveal delay-2">Stronger decisions for businesses that think big. We integrate tax, legal and corporate strategy to protect what you build.</p><div class="hero__actions reveal delay-3"><a class="button button--light" href="../servicios-en/en-soluciones.html">Explore solutions <i class="bi bi-arrow-up-right"></i></a><a class="text-link" href="#firma">Meet us <i class="bi bi-arrow-down"></i></a></div><div class="hero__stamp"><span>23</span><small>years of<br>experience</small></div></div><div class="hero__scroll"><span></span> Scroll to discover</div></section><section class="trust-strip"><div class="shell trust-strip__inner"><p>An integrated perspective for every stage of your business</p><div class="trust-items"><span><i class="bi bi-check2-circle"></i> Strategic</span><span><i class="bi bi-check2-circle"></i> Close</span><span><i class="bi bi-check2-circle"></i> International</span></div></div></section><section class="section intro" id="firma"><div class="shell intro__grid"><div class="section-kicker reveal">01 <span>The firm</span></div><div class="intro__copy reveal delay-1"><h2>Your peace of mind is also a <span>strategy.</span></h2><p>At Ruz y Asociados, we understand that behind every operation there is a project, a family and a vision for the future. We accompany our clients with customized solutions, business judgment and an international perspective.</p><p>More than two decades connecting specialized knowledge with decisions that create real value.</p><a class="underline-link" href="../servicios-en/en-asesoria-integral.html">Discover how we work <i class="bi bi-arrow-right"></i></a></div><div class="intro__aside reveal delay-2"><div class="orbit orbit--one"></div><div class="orbit orbit--two"></div><div class="aside-card"><span class="aside-card__number">100<span>+</span></span><span>clients served<br>across industries</span></div><div class="aside-mark">R<br><span>&</span><br>A</div></div></div></section><section class="section services"><div class="shell"><div class="section-heading reveal"><div class="section-kicker">02 <span>What we do</span></div><h2>Specialists when<br>it matters most.</h2><p>One team, multiple perspectives and one obsession: helping you make better decisions.</p></div><div class="service-grid"><a class="service-card service-card--featured reveal" href="../servicios-en/en-soluciones.html"><div class="service-card__top"><span>01</span><i class="bi bi-arrow-up-right"></i></div><div><div class="service-icon"><i class="bi bi-diagram-3"></i></div><h3>Integrated<br>solutions</h3><p>The complete view to grow your operation with order.</p></div><span class="service-card__link">View solution <i class="bi bi-arrow-right"></i></span></a><a class="service-card reveal delay-1" href="../servicios-en/en-legal.html"><div class="service-card__top"><span>02</span><i class="bi bi-arrow-up-right"></i></div><div><div class="service-icon"><i class="bi bi-bank"></i></div><h3>Legal &<br>corporate</h3><p>Structures that create certainty and protect your assets.</p></div><span class="service-card__link">Learn more <i class="bi bi-arrow-right"></i></span></a><a class="service-card reveal delay-2" href="../servicios-en/en-planificacion-tributaria-internacional.html"><div class="service-card__top"><span>03</span><i class="bi bi-arrow-up-right"></i></div><div><div class="service-icon"><i class="bi bi-globe-americas"></i></div><h3>International<br>trade</h3><p>Planning to cross borders with confidence.</p></div><span class="service-card__link">Learn more <i class="bi bi-arrow-right"></i></span></a><a class="service-card reveal delay-3" href="../servicios-en/en-estudios-de-presios-de-transferencia.html"><div class="service-card__top"><span>04</span><i class="bi bi-arrow-up-right"></i></div><div><div class="service-icon"><i class="bi bi-bar-chart-line"></i></div><h3>Transfer<br>pricing</h3><p>Rigorous analysis for transparent operations.</p></div><span class="service-card__link">Learn more <i class="bi bi-arrow-right"></i></span></a></div><div class="center-link reveal"><a class="underline-link" href="../servicios-en/en-servicios.html">View all services <i class="bi bi-arrow-right"></i></a></div></div></section><section class="statement"><div class="statement__line"></div><div class="shell statement__inner reveal"><span class="quote-mark">“</span><blockquote>The best results begin with<br>the right questions.</blockquote><span class="statement__caption">Ruz y Asociados</span></div></section><section class="section values"><div class="shell"><div class="values__intro reveal"><div class="section-kicker">03 <span>Our difference</span></div><h2>Principles you can<br>see in the result.</h2></div><div class="values__list"><div class="value reveal"><span>01</span><i class="bi bi-award"></i><div><h3>Excellence</h3><p>We exceed expectations with rigor, preparation and attention to detail.</p></div></div><div class="value reveal delay-1"><span>02</span><i class="bi bi-shield-lock"></i><div><h3>Confidentiality</h3><p>Your information is protected with maximum discretion and security.</p></div></div><div class="value reveal delay-2"><span>03</span><i class="bi bi-heart"></i><div><h3>Proximity</h3><p>We are present to support every important decision.</p></div></div></div></div></section><section class="presence" id="presencia"><div class="presence__map"></div><div class="shell presence__content reveal"><div class="section-kicker section-kicker--light">04 <span>International presence</span></div><h2>Wherever you are,<br><em>we are close.</em></h2><p>Offices and strategic allies to support your operation in Mexico, the United States and Canada.</p><div class="locations"><span><b>MX</b> Aguascalientes · Cancún · Mexico City</span><span><b>USA</b> Houston · Chicago</span><span><b>CAN</b> Vancouver · Victoria</span></div></div></section><section class="cta"><div class="shell cta__inner reveal"><div><div class="section-kicker">05 <span>Next step</span></div><h2>Let’s talk about<br>what comes next.</h2></div><a class="button button--blue" href="../servicios-en/en-contacto.html">Start a conversation <i class="bi bi-arrow-up-right"></i></a></div></section></main>${modernFooter()}<button id="btn-ir-arriba" title="Back to top"><i class="bi bi-arrow-up"></i></button>`;
  ensurePageLoader();
  init();
}
function init() {
  const header = document.querySelector(".site-header"),
    toggle = document.querySelector(".nav-toggle"),
    nav = document.querySelector(".nav-links"),
    dropdown = document.querySelector(".nav-dropdown"),
    backTop = document.querySelector("#btn-ir-arriba");
  toggle?.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open);
  });
  dropdown?.querySelector("button")?.addEventListener("click", () => {
    if (innerWidth <= 900) dropdown.classList.toggle("is-open");
  });
  document.querySelectorAll(".nav-links a").forEach((link) =>
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      dropdown?.classList.remove("is-open");
      toggle?.setAttribute("aria-expanded", "false");
    }),
  );
  let lastScroll = 0;
  addEventListener(
    "scroll",
    () => {
      const current = scrollY;
      header?.classList.toggle(
        "is-hidden",
        current > lastScroll && current > 180,
      );
      backTop?.classList.toggle("is-visible", current > 500);
      lastScroll = current;
    },
    { passive: true },
  );
  backTop?.addEventListener("click", () =>
    scrollTo({ top: 0, behavior: "smooth" }),
  );
  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          observer.unobserve(entry.target);
          entry.target.classList.add("is-visible");
        }
      }),
    { threshold: 0.14 },
  );
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
  setupPageTransitions();
  finishPageLoad();
}
function injectInner() {
  const old = document.querySelector("#menu");
  if (old) {
    const section = old.closest("section");
    if (section) section.outerHTML = modernNav(false);
    else old.outerHTML = modernNav(false);
  }
  const footer = document.querySelector("footer");
  if (footer) footer.outerHTML = modernFooter();
  document.body.classList.add("inner-page");
  init();
  setTimeout(
    () =>
      document
        .querySelector(".language")
        ?.setAttribute("href", languageHref(false)),
    0,
  );
}
if (location.pathname.endsWith("/english/home.html")) englishHome();
else if (!document.querySelector(".site-header")) injectInner();
else init();
function normalizeSocials() {
  document
    .querySelector('footer a[href*="facebook"]')
    ?.setAttribute(
      "href",
      "https://www.facebook.com/p/Ruz-y-Asociados-SC-100066439762105/",
    );
  document
    .querySelector('footer a[href*="instagram"]')
    ?.setAttribute("href", "https://www.instagram.com/ruzyasociados_/");
  document
    .querySelector('footer a[href*="linkedin"]')
    ?.setAttribute(
      "href",
      "https://mx.linkedin.com/company/ruz-y-asociados-sc-",
    );
}
normalizeSocials();
