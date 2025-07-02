// Función reutilizable para cargar contenido HTML
function loadHTML(id, archivo, callback) {
  fetch(archivo)
    .then(res => {
      if (!res.ok) throw new Error(`Error al cargar ${archivo}: ${res.status}`);
      return res.text();
    })
    .then(html => {
      const cont = document.getElementById(id);
      if (!cont) throw new Error(`No existe elemento con id="${id}"`);
      cont.innerHTML = html;
      if (callback) callback();
    })
    .catch(err => console.error(err));
}


// Manejar la carga de la vista actual y llamar a su inicializador
function handleRouting() {
  const hash = location.hash.replace(/^#/, '') || 'home';
  const viewToLoad = (hash === 'product') ? 'home' : hash;

  loadHTML('ld-paginas', `${viewToLoad}.html`, () => {
    switch (hash) {
      case 'about': initAbout(); break;
      case 'contact': inicializarContact(); break;
      case 'register': initRegister(); break;
    }

    if (hash === 'product') {
      const headerHeight = document.querySelector('.header').offsetHeight;
      const section = document.getElementById('product');
      if (section) {
        const y = section.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    } else {
      // Para todas las demás vistas: scroll al inicio (0)
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  
  });
}


// Inicializar comportamiento del header (menú hamburguesa + SPA)
function initHeader() {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });

    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
      });
    });
  }

  // Navegación hash SPA
  document.querySelectorAll("a[href^='#']").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const hash = link.getAttribute("href");
      const base = window.location.pathname + (window.location.search || "");
      window.location.href = `${base}${hash}`;
      // 1) Actualizar la URL sin recargar la página
      history.pushState(null, "", `${base}${hash}`);
      // 2)  Llamar manejador de vistas
      handleRouting();
    });
  });
}

// Insertar automáticamente el año en el footer
function initFooter() {
  const anio = document.getElementById("anio-actual");
  if (anio) anio.textContent = new Date().getFullYear();
}

// Inicializar comportamiento del About 
function initAbout() {
  const integrantes = [
  {
    nombre: 'César Aróstegui',
    descripcion: 'Estudiante de Ingeniería de Software',
    imagen: 'assets/images/members/cesar.png'
  },
  {
    nombre: 'Rodrigo Solano',
    descripcion: 'Estudiante de Ingeniería de Sistemas',
    imagen: 'assets/images/members/rodrigo.png'
  },
  {
    nombre: 'Ángel Crispín',
    descripcion: 'Estudiante de Ingeniería de Software',
    imagen: 'assets/images/members/angel.png'
  },
  {
    nombre: 'Alexander Montoya',
    descripcion: 'Estudiante de Ingeniería de Software',
    imagen: 'assets/images/members/montoya.png'
  },
  {
    nombre: 'Giordano Trejo',
    descripcion: 'Estudiante de Ingeniería de Software',
    imagen: 'assets/images/members/giordano.png'
  },
  {
    nombre: 'Josep Melgarejo',
    descripcion: 'Estudiante de Ingeniería de Software',
    imagen: 'assets/images/members/melgarejo.png'
  }
];

  const contenedor = document.getElementById("equipo");
  if (!contenedor) return;

  // Vaciar en caso de recarga
  contenedor.innerHTML = "";

  integrantes.forEach(integrante => {
    const div = document.createElement("div");
    div.className = "miembro";
    div.innerHTML = `
      <img src="${integrante.imagen}" alt="Foto de ${integrante.nombre}" />
      <p><strong>${integrante.nombre}</strong><br>${integrante.descripcion}</p>
    `;
    contenedor.appendChild(div);
  });
}

// Inicializar comportamiento del Contact
function inicializarContact() {
  const form = document.getElementById("contactForm");
  const successMsg = document.getElementById("successMessage");

  form.addEventListener("submit", e => {
    e.preventDefault();

    let valid = true;
    const checks = [
      { id: "firstName", validator: v => v.trim() !== "", msg: "El nombre es obligatorio." },
      { id: "lastName", validator: v => v.trim() !== "", msg: "El apellido es obligatorio." },
      { id: "phone", validator: v => v.trim() !== "", msg: "El número es obligatorio." },
      { id: "email", validator: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), msg: "Correo electrónico inválido." },
      { id: "message", validator: v => v.trim() !== "", msg: "El mensaje es obligatorio." },
    ];

    // Limpia mensajes anteriores
    checks.forEach(c => {
      document.getElementById(`error-${c.id}`).textContent = "";
    });
    document.getElementById("error-captcha").textContent = "";

    // Valida campos
    checks.forEach(c => {
      const val = document.getElementById(c.id).value;
      if (!c.validator(val)) {
        document.getElementById(`error-${c.id}`).textContent = c.msg;
        valid = false;
      }
    });

    // Valida captcha
    const captcha = document.getElementById("captcha");
    if (!captcha.checked) {
      document.getElementById("error-captcha").textContent = "Debes confirmar que no eres un robot.";
      valid = false;
    }

    if (valid) {
      successMsg.style.display = "block";
      form.reset();
    }
  });
}

// Inicializar comportamiento del Register
function initRegister() {
  const form = document.getElementById("registerForm");
  const success = document.getElementById("registerSuccess");

  form.addEventListener("submit", e => {
    e.preventDefault();
    let valid = true;

    // Lista de campos a validar
    const campos = [
      { id: "username", msg: "Nombre de usuario obligatorio." },
      { id: "fullname", msg: "Nombre completo obligatorio." },
      { id: "email", msg: "Correo inválido.", fn: v=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) },
      { id: "phone", msg: "Número de teléfono obligatorio." },
      { id: "university", msg: "Universidad obligatoria." }
    ];

    // Limpiar errores previos
    campos.forEach(c => {
      document.getElementById(`error-${c.id}`).textContent = "";
    });
    document.getElementById("error-terms").textContent = "";

    // Validar cada campo
    campos.forEach(c => {
      const el = document.getElementById(c.id);
      const val = el.value.trim();
      const isOk = c.fn ? c.fn(val) : val !== "";
      if (!isOk) {
        valid = false;
        document.getElementById(`error-${c.id}`).textContent = c.msg;
      }
    });

    // Validar checkbox de términos
    const terms = document.getElementById("terms");
    if (!terms.checked) {
      valid = false;
      document.getElementById("error-terms").textContent = "Debes aceptar los términos.";
    }

    if (valid) {
      success.style.display = "block";
      form.reset();
    } else {
      success.style.display = "none";
    }
  });
}

// Punto de entrada de la aplicación
document.addEventListener("DOMContentLoaded", () => {
  // Cargar header, footer y luego la vista según el hash
  loadHTML("ld-header", "header.html", initHeader);
  loadHTML("ld-footer", "footer.html", initFooter);
  handleRouting();
});

// Reactiva routing cuando cambia el hash
window.addEventListener("hashchange", handleRouting);