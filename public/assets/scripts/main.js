const tipsDatabase = [
    {
      id: 1,
      titulo: "Organiza descansos de 5 min cada 50 min de pantalla",
      descripcion: "La técnica Pomodoro aplicada al uso de dispositivos te ayuda a mantener la concentración y reducir la fatiga visual.",
      categoria: "Productividad",
      icono: "fas fa-clock",
      imagen: "assets/images/tips/tip-concentracion.webp",
      fecha: new Date('2025-07-02')
    },
    {
      id: 2,
      titulo: "Activa el modo no molestar por las noches",
      descripcion: "Silencia las notificaciones después de las 22:00 para mejorar la calidad de tu sueño y descanso mental.",
      categoria: "Bienestar",
      icono: "fas fa-moon",
      imagen: "assets/images/tips/tip-sueno.webp",
      fecha: new Date('2025-07-03')
    },
    {
      id: 3,
      titulo: "Configura recordatorios de estiramiento",
      descripcion: "Programa alarmas cada hora para levantarte, estirarte y mover el cuerpo. Tu postura te lo agradecerá.",
      categoria: "Salud física",
      icono: "fas fa-running",
      imagen: "assets/images/tips/tip-ejercicio.webp",
      fecha: new Date('2025-07-04')
    },
    {
      id: 4,
      titulo: "Crea una rutina matutina sin pantallas",
      descripcion: "Dedica los primeros 30 minutos del día a actividades offline: lectura, meditación o ejercicio.",
      categoria: "Mindfulness",
      icono: "fas fa-sun",
      imagen: "assets/images/tips/tip-manana.webp",
      fecha: new Date('2025-07-05')
    },
    {
      id: 5,
      titulo: "Usa aplicaciones de bloqueo de redes sociales",
      descripcion: "Herramientas como Forest o Freedom te ayudan a mantener el foco en tus actividades importantes.",
      categoria: "Herramientas",
      icono: "fas fa-shield-alt",
      imagen: "assets/images/tips/tip-apps.webp",
      fecha: new Date('2025-07-06')
    },
    {
      id: 6,
      titulo: "Practica la regla del 3-2-1 antes de dormir",
      descripcion: "3 horas sin comidas pesadas, 2 horas sin trabajo, 1 hora sin pantallas antes de acostarte.",
      categoria: "Rutinas",
      icono: "fas fa-bed",
      imagen: "assets/images/tips/tip-dormir.webp",
      fecha: new Date('2025-07-07')
    },
    {
      id: 7,
      titulo: "Establece zonas libres de dispositivos",
      descripcion: "Designa espacios en casa como el comedor o dormitorio donde no se usen dispositivos electrónicos.",
      categoria: "Espacios",
      icono: "fas fa-home",
      imagen: "assets/images/tips/tip-hogar.webp",
      fecha: new Date('2025-07-08')
    },
    {
      id: 8,
      titulo: "Practica la comunicación cara a cara",
      descripcion: "Elige conversar en persona en lugar de enviar mensajes cuando sea posible. Fortalece tus relaciones.",
      categoria: "Social",
      icono: "fas fa-comments",
      imagen: "assets/images/tips/tip-comunicacion.webp",
      fecha: new Date('2025-07-09')
    },
    // Tips anteriores para demostración  
    {
      id: 9,
      titulo: "Establece límites de tiempo en redes sociales",
      descripcion: "Usa las herramientas nativas de tu teléfono para limitar el tiempo en aplicaciones de redes sociales.",
      categoria: "Control digital",
      icono: "fas fa-clock",
      imagen: "assets/images/tips/tip-limite.webp",
      fecha: new Date('2025-07-01')
    },
    {
      id: 10,
      titulo: "Practica la técnica de respiración 4-7-8",
      descripcion: "Inhala por 4 segundos, mantén por 7, exhala por 8. Ideal para relajarte después del uso intensivo de pantallas.",
      categoria: "Relajación",
      icono: "fas fa-leaf",
      imagen: "assets/images/tips/tip-respiracion.webp",
      fecha: new Date('2025-07-02')
    },
    {
      id: 11,
      titulo: "Organiza un día de desintoxicación digital",
      descripcion: "Dedica un día completo sin dispositivos electrónicos. Reconecta contigo mismo y tu entorno.",
      categoria: "Desintoxicación",
      icono: "fas fa-tree",
      imagen: "assets/images/tips/tip-detox.webp",
      fecha: new Date('2025-07-03')
    }
];

// ===== FUNCIÓN PRINCIPAL PARA TIPS ANTERIORES =====
function initTipsAnteriores() {
  // Verificar elementos HTML con un pequeño delay para asegurar que estén disponibles
  setTimeout(() => {
    const carousel = document.getElementById('tips-carousel');
    const prevBtn = document.getElementById('tips-prev');
    const nextBtn = document.getElementById('tips-next');
    
    if (!carousel) {
      return;
    }
    
    // Obtener tips anteriores al día actual
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    
    const tipsAnteriores = tipsDatabase.filter(tip => {
      const fechaTip = new Date(tip.fecha);
      fechaTip.setHours(0, 0, 0, 0);
      return fechaTip < hoy;
    }).sort((a, b) => b.fecha - a.fecha);
    
    // Renderizar tips
    if (tipsAnteriores.length === 0) {
      carousel.innerHTML = `
        <div style="color: white; padding: 2rem; text-align: center; width: 100%; background: rgba(255,255,255,0.1); border-radius: 10px;">
          <h3 style="color: #FFD700; margin-bottom: 1rem;">¡Pronto habrá más tips!</h3>
          <p>Los tips aparecerán aquí después de su fecha de publicación</p>
        </div>
      `;
      return;
    }
    
    // Crear HTML de las cards
    const htmlContent = tipsAnteriores.map(tip => `
      <div class="tip-card-rediseñada">
        <h3>${tip.titulo}</h3>
        <p>${tip.descripcion}</p>
        <span class="tip-fecha-simple">${tip.fecha.toLocaleDateString('es-ES', { 
          day: '2-digit', 
          month: '2-digit', 
          year: 'numeric' 
        })}</span>
      </div>
    `).join('');
    
    carousel.innerHTML = htmlContent;
    
    // Configurar navegación del carrusel
    if (prevBtn && nextBtn && tipsAnteriores.length > 0) {
      let currentIndex = 0;
      const itemsPerView = window.innerWidth <= 768 ? 1 : 3;
      const maxIndex = Math.max(0, tipsAnteriores.length - itemsPerView);
      
      function updateCarousel() {
        const cardWidth = 320;
        const gap = 24;
        const translateX = -(currentIndex * (cardWidth + gap));
        carousel.style.transform = `translateX(${translateX}px)`;
        
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= maxIndex;
      }
      
      prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
          currentIndex--;
          updateCarousel();
        }
      });
      
      nextBtn.addEventListener('click', () => {
        if (currentIndex < maxIndex) {
          currentIndex++;
          updateCarousel();
        }
      });
      
      // Recalcular en resize
      window.addEventListener('resize', () => {
        const newItemsPerView = window.innerWidth <= 768 ? 1 : 3;
        const newMaxIndex = Math.max(0, tipsAnteriores.length - newItemsPerView);
        if (currentIndex > newMaxIndex) {
          currentIndex = newMaxIndex;
        }
        updateCarousel();
      });
      
      updateCarousel();
    }
  }, 300); // Delay para asegurar que el DOM esté listo
}

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

  // Secciones internas de cada página
  const homeSections = ["product", "sistema-de-puntos", "recompensas", "puntos", "talleres", "tip-diario", "tips-anteriores", "subscripciones"];
  const aboutSections = ["about", "ranking", "alianzas", "partners", "impact", "testimonials", "video-testimonial", "faq"];

  // Determinar qué página cargar
  let pageToLoad = 'home';
  if (aboutSections.includes(hash)) {
    pageToLoad = 'about';
  } else if (hash === 'contact') {
    pageToLoad = 'contact';
  } else if (hash === 'register') {
    pageToLoad = 'register';
  } else if (hash === 'terms') {
    pageToLoad = 'terms';
  }

  loadHTML('ld-paginas', `${pageToLoad}.html`, () => {
    switch (pageToLoad) {
      case 'home': 
        initPointsCalculator(); 
        initSistemaRecompensas(); 
        initCatalogoTalleres(); 
        initTipDiario();
        initTipsAnteriores();
        break;
      case 'about': 
        initAbout(); 
        initAlianzasCarousel(); 
        initRanking(); 
        initStatsAnimation(); 
        initTestimonials(); 
        initCarruselTestimonios(); 
        initVideoTestimonial(); 
        initFAQ(); 
        break;
      case 'contact': inicializarContact(); break;
      case 'register': initRegister(); break;
    }

    // Manejar scroll con offset del header
    if (homeSections.includes(hash) || aboutSections.includes(hash)) {
      setTimeout(() => {
        const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
        const section = document.getElementById(hash);
        if (section) {
          const y = section.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20; // 20px extra de espacio
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100); // Pequeño delay para asegurar que el contenido esté cargado
    } else {
      // Para otras vistas: scroll al inicio
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
}


// Inicializar comportamiento del header (menú hamburguesa + SPA)
function initHeader() {
  
  // Función para inicializar cuando los elementos estén disponibles
  function setupDropdowns() {
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("navLinks");
    const dropdownToggles = document.querySelectorAll(".dropdown-toggle");
    const dropdownMenus = document.querySelectorAll(".dropdown-menu");

    // Si no encontramos los elementos, esperar un poco más
    if (dropdownToggles.length === 0 || dropdownMenus.length === 0) {
      setTimeout(setupDropdowns, 50);
      return;
    }

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      // Cierra todos los dropdowns al abrir/cerrar menú móvil
      dropdownMenus.forEach(menu => menu.classList.remove("active"));
    });

    // Solo agregar listener a enlaces que NO son dropdown-toggle
    navLinks.querySelectorAll("a:not(.dropdown-toggle)").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        dropdownMenus.forEach(menu => menu.classList.remove("active"));
      });
    });
  }

  // Manejo robusto de dropdowns y experiencia táctil mejorada
  dropdownToggles.forEach((toggle, idx) => {
    const parent = toggle.closest('.dropdown');
    const menu = parent.querySelector('.dropdown-menu');

    // Función para cerrar todos los dropdowns excepto el actual
    function closeOtherDropdowns(currentMenu) {
      dropdownMenus.forEach((m) => {
        if (m !== currentMenu) m.classList.remove("active");
      });
    }

    // Función para cerrar todos los dropdowns
    function closeAllDropdowns() {
      dropdownMenus.forEach((m) => m.classList.remove("active"));
    }

    // Unifica la lógica: click y touchstart en el anchor padre
    function handleToggleDropdown(e) {
      // Solo prevenir default en click, no en touchstart
      if (e.type === 'click') {
        e.preventDefault();
        e.stopPropagation();
      }
      if (menu.classList.contains("active")) {
        menu.classList.remove("active");
      } else {
        closeOtherDropdowns(menu);
        menu.classList.add("active");
      }
    }
    
    // Para dispositivos móviles: usar touchend en lugar de touchstart
    toggle.addEventListener("click", handleToggleDropdown);
    
    // Solo agregar touchend para móviles, y evitar que interfiera con click
    toggle.addEventListener("touchend", (e) => {
      // Prevenir que se dispare también el evento click
      e.preventDefault();
      e.stopPropagation();
      handleToggleDropdown(e);
    });

    // Cierra el dropdown al hacer click/tap en un link del menú
    menu.querySelectorAll("a").forEach(link => {
      function closeOnLink(e) {
        // Remover cualquier clase activa que pueda afectar el estilo
        link.blur(); // Quita el focus
        menu.classList.remove("active");
        if (window.matchMedia('(max-width: 768px)').matches && navLinks) {
          navLinks.classList.remove("active");
        }
        closeAllDropdowns();
      }
      // Solo usar click para los links del dropdown
      link.addEventListener("click", closeOnLink);
    });
  });

  // Listener global para cerrar dropdowns al hacer click fuera
  function handleGlobalClick(e) {
    // Verificar si el click fue dentro de algún dropdown
    const isInsideDropdown = Array.from(dropdownToggles).some(toggle => {
      const parent = toggle.closest('.dropdown');
      return parent && parent.contains(e.target);
    });
    
    if (!isInsideDropdown) {
      dropdownMenus.forEach(menu => menu.classList.remove("active"));
    }
  }
  
  // Solo usar click para el listener global, no touchend
  document.addEventListener("click", handleGlobalClick);

  // Navegación SPA con hash
  document.querySelectorAll("a[href^='#']").forEach(link => {
    link.addEventListener("click", e => {
      const hash = link.getAttribute("href");
      const targetId = hash.replace("#", "");
      // Validar si es una sección interna
      const internalSections = [
        "product", "puntos", "sistema-de-puntos", "recompensas", "talleres",// secciones de home
        "tip-diario", "tips-anteriores", "subscripciones",
        "about", "ranking", "alianzas", "partners", // secciones de about
        "impact", "testimonials", "video-testimonial", "faq"
      ];
      if (internalSections.includes(targetId)) {
        e.preventDefault();
        const base = window.location.pathname + (window.location.search || "");
        history.pushState(null, "", `${base}#${targetId}`);
        handleRouting();
      }
    });
  });
}

// Llamar a la función de configuración
setupDropdowns();
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

// Inicializar el carrusel de alianzas con universidades (movimiento de 1 en 1 + táctil)
function initAlianzasCarousel() {
  const list          = document.querySelector('.alianzas__lista');
  const carruselContainer = document.querySelector('.alianzas__carrusel-container');
  const prev          = document.querySelector('.alianzas__btn--prev');
  const next          = document.querySelector('.alianzas__btn--next');
  const dotsContainer = document.querySelector('.alianzas__dots');
  const totalItems    = list.children.length; // 10 universidades
  let perView         = window.innerWidth <= 768 ? 2 : 5; // 5 logos en escritorio, 2 en móvil
  let maxPosition     = totalItems - perView; // máxima posición de desplazamiento
  let currentPosition = 0; // posición actual (0 = primera universidad)
  
  // Variables para control táctil
  let startX = 0;
  let currentX = 0;
  let isDragging = false;
  let initialTransform = 0;

  function renderDots() {
    if (!dotsContainer) return; // Verificar que el contenedor existe
    
    dotsContainer.innerHTML = '';
    // Solo crear dots en escritorio (en móvil están ocultos por CSS)
    if (window.innerWidth > 768) {
      // Crear dots para cada posición posible
      for (let i = 0; i <= maxPosition; i++) {
        const btn = document.createElement('button');
        btn.className = i === 0 ? 'dot active' : 'dot';
        btn.addEventListener('click', () => {
          currentPosition = i;
          update();
        });
        dotsContainer.appendChild(btn);
      }
    }
  }

  function update() {
    // Calculamos el desplazamiento basado en el número de elementos visibles
    const itemWidthPercentage = 100 / perView; // porcentaje que ocupa cada elemento visible
    const shift = -(currentPosition * itemWidthPercentage); // desplazamiento por posición
    
    // Asegurar transición suave
    list.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    list.style.transform = `translateX(${shift}%)`;
    
    // Solo actualizar dots si existen y están visibles (escritorio)
    if (dotsContainer && window.innerWidth > 768) {
      Array.from(dotsContainer.children).forEach((dot, i) =>
        dot.classList.toggle('active', i === currentPosition)
      );
    }
  }

  function goToPrevious() {
    if (window.innerWidth <= 768) {
      // Comportamiento infinito en móvil - permite recorrer todos los logos
      currentPosition = currentPosition > 0 ? currentPosition - 1 : maxPosition;
    } else {
      // Comportamiento limitado en escritorio
      currentPosition = Math.max(0, currentPosition - 1);
    }
    update();
  }

  function goToNext() {
    if (window.innerWidth <= 768) {
      // Comportamiento infinito en móvil - permite recorrer todos los logos
      currentPosition = currentPosition < maxPosition ? currentPosition + 1 : 0;
    } else {
      // Comportamiento limitado en escritorio
      currentPosition = Math.min(maxPosition, currentPosition + 1);
    }
    update();
  }

  // Event listeners para botones (solo cuando existen y están visibles)
  if (prev && window.innerWidth > 768) prev.addEventListener('click', goToPrevious);
  if (next && window.innerWidth > 768) next.addEventListener('click', goToNext);

  // --- FUNCIONALIDAD TÁCTIL MEJORADA PARA MÓVIL ---
  function handleTouchStart(e) {
    if (window.innerWidth > 768) return; // Solo en móvil
    
    startX = e.touches[0].clientX;
    currentX = startX;
    isDragging = true;
    
    // Obtener la posición actual del transform basada en currentPosition
    const itemWidthPercentage = 100 / perView;
    initialTransform = -(currentPosition * itemWidthPercentage);
    
    // Desactivar transición durante el arrastre
    list.style.transition = 'none';
    
    e.preventDefault();
  }

  function handleTouchMove(e) {
    if (!isDragging || window.innerWidth > 768) return;
    
    currentX = e.touches[0].clientX;
    const diffX = currentX - startX;
    const containerWidth = carruselContainer.offsetWidth;
    
    // Calcular el desplazamiento con suavizado
    let diffPercent = (diffX / containerWidth) * 100;
    
    // Aplicar resistencia en los límites para evitar sobredesplazamiento
    const maxLeft = 0;
    const itemWidthPercentage = 100 / perView;
    const maxRight = -(maxPosition * itemWidthPercentage); // usar el mismo cálculo que en update()
    const currentPos = initialTransform + diffPercent;
    
    if (currentPos > maxLeft) {
      // Resistencia al arrastrar más allá del inicio
      diffPercent = diffPercent * 0.3;
    } else if (currentPos < maxRight) {
      // Resistencia al arrastrar más allá del final
      const excess = currentPos - maxRight;
      diffPercent = diffPercent - (excess * 0.7);
    }
    
    // Limitar el movimiento máximo para evitar descontrol
    diffPercent = Math.max(-50, Math.min(50, diffPercent));
    
    // Aplicar el desplazamiento temporal con suavizado
    list.style.transform = `translateX(${initialTransform + diffPercent}%)`;
    
    e.preventDefault();
  }

  function handleTouchEnd(e) {
    if (!isDragging || window.innerWidth > 768) return;
    
    isDragging = false;
    
    // Reactivar transición suave
    list.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    
    const diffX = currentX - startX;
    const containerWidth = carruselContainer.offsetWidth;
    
    // Umbral reducido para mayor sensibilidad en móvil
    const threshold = Math.min(20, containerWidth * 0.1); // 10% del ancho o máximo 20px
    const velocity = Math.abs(diffX) > 5 ? Math.abs(diffX) / 5 : 1; // Factor de velocidad mejorado
    
    if (Math.abs(diffX) > threshold || velocity > 1.5) {
      if (diffX > 0) {
        // Swipe hacia la derecha (anterior) - permite recorrer todos los logos
        goToPrevious();
      } else {
        // Swipe hacia la izquierda (siguiente) - permite recorrer todos los logos
        goToNext();
      }
    } else {
      // No alcanzó el umbral, volver a la posición actual con animación suave
      update();
    }
    
    e.preventDefault();
  }

  // Agregar event listeners táctiles al contenedor
  carruselContainer.addEventListener('touchstart', handleTouchStart, { passive: false });
  carruselContainer.addEventListener('touchmove', handleTouchMove, { passive: false });
  carruselContainer.addEventListener('touchend', handleTouchEnd, { passive: false });

  // Inicializa
  renderDots();
  update();

  // Recalcula al cambiar tamaño de ventana
  window.addEventListener('resize', () => {
    const oldPerView = perView;
    perView = window.innerWidth <= 768 ? 2 : 5;
    maxPosition = totalItems - perView;
    
    // Recalcular currentPosition si es necesario
    if (currentPosition > maxPosition) {
      currentPosition = maxPosition;
    }
    
    // Solo regenerar dots si cambió la vista
    if (oldPerView !== perView) {
      renderDots();
    }
    
    update();
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

  // Agregar eventos para limpiar errores cuando el usuario empieza a escribir
  if (inscripcionForm) {
    const campos = ['inscripcion-nombres', 'inscripcion-apellidos', 'inscripcion-email', 'inscripcion-codigo', 'inscripcion-universidad'];
    
    campos.forEach(campoId => {
      const input = document.getElementById(campoId);
      if (input) {
        input.addEventListener('input', () => {
          const errorEl = document.getElementById(`error-${campoId}`);
          if (errorEl && errorEl.textContent) {
            errorEl.textContent = "";
            input.classList.remove('error');
          }
        });
      }
    });
  }

  // Cerrar modal de éxito
  if (cerrarExitoBtn) {
    cerrarExitoBtn.addEventListener('click', () => {
      inscripcionModal.classList.remove('active');
      document.body.style.overflow = 'auto';
      
      // Resetear vista del modal
      setTimeout(() => {
        inscripcionForm.style.display = 'grid';
        inscripcionExito.style.display = 'none';
      }, 300);
    });
  }

  // Cerrar modales con tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      tallerModal.classList.remove('active');
      inscripcionModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });
}

// Inicializar el ranking de participación universitaria
function initRanking() {
  // Datos simulados del ranking de universidades
  const rankingData = [
    { name: "UPC", fullName: "Universidad Peruana de Ciencias Aplicadas", students: 4850, points: 48500 },
    { name: "PUCP", fullName: "Pontificia Universidad Católica del Perú", students: 3920, points: 39200 },
    { name: "UNI", fullName: "Universidad Nacional de Ingeniería", students: 2890, points: 28900 },
    { name: "UNMSM", fullName: "Universidad Nacional Mayor de San Marcos", students: 2150, points: 21500 },
    { name: "UTP", fullName: "Universidad Tecnológica del Perú", students: 1780, points: 17800 },
    { name: "UP", fullName: "Universidad del Pacífico", students: 1520, points: 15200 },
    { name: "UPCH", fullName: "Universidad Peruana Cayetano Heredia", students: 1350, points: 13500 },
    { name: "ULima", fullName: "Universidad de Lima", students: 1180, points: 11800 },
    { name: "USIL", fullName: "Universidad San Ignacio de Loyola", students: 980, points: 9800 },
    { name: "UDEP", fullName: "Universidad de Piura", students: 750, points: 7500 },
    { name: "ESAN", fullName: "Universidad ESAN", students: 650, points: 6500 },
    { name: "URP", fullName: "Universidad Ricardo Palma", students: 580, points: 5800 },
    { name: "UAP", fullName: "Universidad Alas Peruanas", students: 420, points: 4200 },
    { name: "UNFV", fullName: "Universidad Nacional Federico Villarreal", students: 380, points: 3800 },
    { name: "UCSS", fullName: "Universidad Católica Sedes Sapientiae", students: 290, points: 2900 }
  ];

  const chartContainer = document.getElementById('ranking-chart');
  const completeRankingBtn = document.getElementById('ver-ranking-completo');
  const searchSection = document.getElementById('ranking-search');
  const searchInput = document.getElementById('search-university');
  const searchBtn = document.getElementById('buscar-universidad');
  const completeSection = document.getElementById('ranking-complete');
  const tableBody = document.getElementById('ranking-table-body');
  const closeBtn = document.getElementById('cerrar-ranking');

  if (!chartContainer) return; // Si no está en la página about, no hacer nada

  // Renderizar top 5 en el gráfico de barras
  function renderTopRanking() {
    const top5 = rankingData.slice(0, 5);
    const maxValue = Math.max(...top5.map(item => item.students));
    const isMobile = window.innerWidth <= 768;
    
    chartContainer.innerHTML = '';
    
    top5.forEach((item, index) => {
      const percentage = (item.students / maxValue) * 100;
      
      const rankingItem = document.createElement('div');
      rankingItem.className = 'ranking-item';
      
      if (isMobile) {
        // Estructura para móvil - layout vertical
        rankingItem.innerHTML = `
          <div class="ranking-item-header">
            <div class="ranking-position">${index + 1}</div>
            <div class="ranking-university">${item.name}</div>
            <div class="ranking-value">${item.students.toLocaleString()}</div>
          </div>
          <div class="ranking-bar-container">
            <div class="ranking-bar" style="width: ${percentage}%"></div>
          </div>
        `;
      } else {
        // Estructura para escritorio - layout horizontal
        rankingItem.innerHTML = `
          <div class="ranking-position">${index + 1}</div>
          <div class="ranking-university">${item.name}</div>
          <div class="ranking-bar-container">
            <div class="ranking-bar" style="width: ${percentage}%"></div>
          </div>
          <div class="ranking-value">${item.students.toLocaleString()}</div>
        `;
      }
      
      chartContainer.appendChild(rankingItem);
    });
  }

  // Renderizar tabla completa
  function renderCompleteTable(data = rankingData, highlightTerm = '') {
    tableBody.innerHTML = '';
    
    data.forEach((item, index) => {
      const row = document.createElement('div');
      row.className = 'ranking-table-row';
      
      // Resaltar si coincide con búsqueda
      const searchTerm = highlightTerm.toLowerCase();
      const shouldHighlight = searchTerm && (
        item.name.toLowerCase().includes(searchTerm) ||
        item.fullName.toLowerCase().includes(searchTerm)
      );
      
      if (shouldHighlight) {
        row.classList.add('highlight');
      }
      
      row.innerHTML = `
        <span>${index + 1}</span>
        <span>${item.fullName}</span>
        <span>${item.students.toLocaleString()}</span>
        <span>${item.points.toLocaleString()}</span>
      `;
      
      tableBody.appendChild(row);
    });
  }

  // Renderizar cards para móvil
  function renderMobileCards(data = rankingData, highlightTerm = '') {
    const mobileContainer = document.getElementById('ranking-cards-mobile');
    if (!mobileContainer) return;
    
    mobileContainer.innerHTML = '';
    
    data.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'ranking-card';
      
      // Resaltar si coincide con búsqueda
      const searchTerm = highlightTerm.toLowerCase();
      const shouldHighlight = searchTerm && (
        item.name.toLowerCase().includes(searchTerm) ||
        item.fullName.toLowerCase().includes(searchTerm)
      );
      
      if (shouldHighlight) {
        card.classList.add('highlight');
      }
      
      card.innerHTML = `
        <div class="ranking-card-header">
          <div class="ranking-card-position">${index + 1}</div>
          <div class="ranking-card-university">${item.fullName}</div>
        </div>
        <div class="ranking-card-stats">
          <div class="ranking-card-stat">
            <div class="ranking-card-stat-label">Estudiantes activos</div>
            <div class="ranking-card-stat-value">${item.students.toLocaleString()}</div>
          </div>
          <div class="ranking-card-stat">
            <div class="ranking-card-stat-label">Puntos acumulados</div>
            <div class="ranking-card-stat-value">${item.points.toLocaleString()}</div>
          </div>
        </div>
      `;
      
      mobileContainer.appendChild(card);
    });
  }

  // Función de búsqueda
  function searchUniversities(term) {
    const searchTerm = term.toLowerCase().trim();
    if (!searchTerm) {
      renderCompleteTable();
      renderMobileCards();
      return;
    }
    
    const filteredData = rankingData.filter(item => 
      item.name.toLowerCase().includes(searchTerm) ||
      item.fullName.toLowerCase().includes(searchTerm)
    );
    
    if (filteredData.length > 0) {
      renderCompleteTable(filteredData, searchTerm);
      renderMobileCards(filteredData, searchTerm);
      
      // Auto-scroll al resultado si hay coincidencias
      setTimeout(() => {
        const highlighted = tableBody.querySelector('.highlight') || 
                           document.querySelector('.ranking-card.highlight');
        if (highlighted) {
          highlighted.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    } else {
      // Mostrar mensaje de "no encontrado" en ambos formatos
      tableBody.innerHTML = `
        <div style="text-align: center; padding: 2rem; grid-column: 1 / -1; opacity: 0.7;">
          No se encontraron universidades que coincidan con "${term}"
        </div>
      `;
      
      const mobileContainer = document.getElementById('ranking-cards-mobile');
      if (mobileContainer) {
        mobileContainer.innerHTML = `
          <div style="text-align: center; padding: 2rem; opacity: 0.7; color: var(--blanco);">
            No se encontraron universidades que coincidan con "${term}"
          </div>
        `;
      }
    }
  }

  // Event listeners
  if (completeRankingBtn) {
    completeRankingBtn.addEventListener('click', () => {
      if (completeSection) {
        completeSection.style.display = 'block';
      }
      if (searchSection) {
        searchSection.style.display = 'flex';
      }
      renderCompleteTable();
      renderMobileCards();
      
      // Smooth scroll hacia la tabla
      setTimeout(() => {
        if (completeSection) {
          completeSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      if (completeSection) completeSection.style.display = 'none';
      if (searchSection) searchSection.style.display = 'none';
      if (searchInput) searchInput.value = '';
    });
  }

  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      if (searchInput) searchUniversities(searchInput.value);
    });
  }

  if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        searchUniversities(searchInput.value);
      }
    });

    // Búsqueda en tiempo real (opcional)
    searchInput.addEventListener('input', () => {
      if (completeSection && completeSection.style.display !== 'none') {
        searchUniversities(searchInput.value);
      }
    });
  }

  // Inicializar
  renderTopRanking();

  // Rerender al cambiar tamaño de ventana para adaptar layout
  window.addEventListener('resize', () => {
    renderTopRanking();
  });
}

// Animación de estadísticas
function initStatsAnimation() {
  const statNumbers = document.querySelectorAll('.stat-number');
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const targetValue = parseInt(target.getAttribute('data-target'));
        animateNumber(target, targetValue);
        observer.unobserve(target);
      }
    });
  }, observerOptions);

  statNumbers.forEach(number => {
    observer.observe(number);
  });
}

function animateNumber(element, target) {
  const duration = 1000; // 1 segundo
  const increment = target / (duration / 16); // 60fps
  let current = 0;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    
    // Formatear el número con comas para miles
    const formattedNumber = Math.floor(current).toLocaleString();
    element.textContent = formattedNumber;
  }, 16);
}

// ==========================================
// FUNCIONALIDAD DE TESTIMONIOS
// ==========================================
function initTestimonials() {
  const toggleBtn = document.getElementById('toggle-testimonios');
  
  if (!toggleBtn) return; // Si no existe el botón, salir
  
  toggleBtn.addEventListener('click', function() {
    const action = this.getAttribute('data-action');
    const previews = document.querySelectorAll('.testimonio-preview');
    const fulls = document.querySelectorAll('.testimonio-full');
    
    if (action === 'expand') {
      // Mostrar testimonios completos
      previews.forEach(preview => {
        preview.style.display = 'none';
      });
      
      fulls.forEach((full, index) => {
        full.style.display = 'block';
        // Animación escalonada
        setTimeout(() => {
          full.style.opacity = '0';
          full.style.transform = 'translateY(20px)';
          full.style.transition = 'all 0.4s ease';
          setTimeout(() => {
            full.style.opacity = '1';
            full.style.transform = 'translateY(0)';
          }, 50);
        }, index * 100);
      });
      
      this.textContent = 'Ver Menos';
      this.setAttribute('data-action', 'collapse');
      
    } else {
      // Mostrar testimonios cortos
      fulls.forEach(full => {
        full.style.display = 'none';
      });
      
      previews.forEach((preview, index) => {
        preview.style.display = 'block';
        // Animación escalonada
        setTimeout(() => {
          preview.style.opacity = '0';
          preview.style.transform = 'translateY(20px)';
          preview.style.transition = 'all 0.4s ease';
          setTimeout(() => {
            preview.style.opacity = '1';
            preview.style.transform = 'translateY(0)';
          }, 50);
        }, index * 100);
      });
      
      this.textContent = 'Ver Testimonios Completos';
      this.setAttribute('data-action', 'expand');
    }
  });
}

// FUNCIONALIDAD DEL CARRUSEL DE TESTIMONIOS
// ==========================================
function initCarruselTestimonios() {
  const carruselLista = document.querySelector('.carrusel-testimonios-lista');
  const items = document.querySelectorAll('.carrusel-testimonio-item');
  const btnPrev = document.querySelector('.carrusel-testimonios-btn--prev');
  const btnNext = document.querySelector('.carrusel-testimonios-btn--next');
  const dotsContainer = document.querySelector('.carrusel-testimonios-dots');
  const testimoniosTexto = document.querySelectorAll('.testimonio-activo');
  
  if (!carruselLista || items.length === 0) return;
  
  let currentIndex = 0;
  const totalItems = items.length;
  
  // Generar dots dinámicamente basados en la cantidad de testimonios
  function generateDots() {
    dotsContainer.innerHTML = ''; // Limpiar dots existentes
    
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    let dotsCount;
    
    if (isMobile) {
      // En móviles: un dot por cada testimonio
      dotsCount = totalItems;
    } else {
      // En desktop: un dot por cada testimonio (navegamos por testimonio central)
      dotsCount = totalItems;
    }
    
    for (let i = 0; i < dotsCount; i++) {
      const dot = document.createElement('button');
      dot.className = 'dot';
      dot.setAttribute('data-testimonio', i);
      if (i === 0) dot.classList.add('active');
      
      // Agregar event listener al dot
      dot.addEventListener('click', () => {
        currentIndex = i;
        updateCarrusel();
      });
      
      dotsContainer.appendChild(dot);
    }
  }
  
  // Función para actualizar la posición del carrusel
  function updateCarrusel() {
    // Detectar si estamos en móvil
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    
    let translateX;
    let centralIndex; // Índice del testimonio que está en el centro
    
    if (isMobile) {
      // En móviles: mostrar 1 elemento a la vez (100% por elemento)
      translateX = -currentIndex * 100;
      centralIndex = currentIndex;
    } else {
      // En desktop: calcular posición para centrar el testimonio seleccionado
      // Para mostrar 3 elementos y centrar el actual
      if (currentIndex === 0) {
        // Primer testimonio: mostrar posiciones 0, 1, 2
        translateX = 0;
        centralIndex = 0;
      } else if (currentIndex === totalItems - 1) {
        // Último testimonio: mostrar las últimas 3 posiciones
        translateX = -(totalItems - 3) * 33.333;
        centralIndex = totalItems - 1;
      } else {
        // Testimonios del medio: centrar el testimonio actual
        translateX = -(currentIndex - 1) * 33.333;
        centralIndex = currentIndex;
      }
    }
    
    carruselLista.style.transform = `translateX(${translateX}%)`;
    
    // Actualizar clases active en items (solo el testimonio central)
    items.forEach((item, index) => {
      item.classList.toggle('active', index === centralIndex);
    });
    
    // Actualizar dots (el dot activo corresponde al testimonio central)
    const dots = document.querySelectorAll('.carrusel-testimonios-dots .dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === centralIndex);
    });
    
    // Actualizar testimonio de texto (mostrar el testimonio central)
    testimoniosTexto.forEach((texto, index) => {
      if (index === centralIndex) {
        texto.style.display = 'block';
        // Animación de entrada
        setTimeout(() => {
          texto.style.opacity = '1';
          texto.style.transform = 'translateY(0)';
        }, 50);
      } else {
        texto.style.display = 'none';
        texto.style.opacity = '0';
        texto.style.transform = 'translateY(10px)';
      }
    });
  }
  
  // Función para ir al siguiente testimonio
  function nextTestimonio() {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    
    if (isMobile) {
      // En móviles: navegación normal de 1 en 1 hasta el último elemento
      currentIndex = (currentIndex + 1) % totalItems;
    } else {
      // En desktop: navegar a través de todos los testimonios
      currentIndex = (currentIndex + 1) % totalItems;
    }
    updateCarrusel();
  }
  
  // Función para ir al testimonio anterior
  function prevTestimonio() {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    
    if (isMobile) {
      // En móviles: navegación normal
      currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    } else {
      // En desktop: navegar a través de todos los testimonios
      currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    }
    updateCarrusel();
  }
  
  // Event listeners para botones de navegación (solo en desktop)
  if (btnNext) {
    btnNext.addEventListener('click', () => {
      if (window.innerWidth > 768) {
        nextTestimonio();
      }
    });
  }
  
  if (btnPrev) {
    btnPrev.addEventListener('click', () => {
      if (window.innerWidth > 768) {
        prevTestimonio();
      }
    });
  }
  
  // Configurar swipe táctil mejorado (reutilizando lógica de alianzas)
  let startX = 0;
  let currentX = 0;
  let isDragging = false;
  let initialTransform = 0;

  function handleTouchStart(e) {
    if (window.innerWidth > 768) return; // Solo en móvil
    
    startX = e.touches[0].clientX;
    currentX = startX;
    isDragging = true;
    
    // Obtener la posición actual del transform
    const currentTransform = carruselLista.style.transform;
    const translateXMatch = currentTransform.match(/translateX\((-?\d+(?:\.\d+)?)%\)/);
    initialTransform = translateXMatch ? parseFloat(translateXMatch[1]) : 0;
    
    // Desactivar transición durante el arrastre
    carruselLista.style.transition = 'none';
    
    e.preventDefault();
  }

  function handleTouchMove(e) {
    if (!isDragging || window.innerWidth > 768) return;
    
    currentX = e.touches[0].clientX;
    const diffX = currentX - startX;
    const containerWidth = document.querySelector('.carrusel-testimonios-container').offsetWidth;
    
    // Calcular el desplazamiento con suavizado
    let diffPercent = (diffX / containerWidth) * 100;
    
    // Aplicar resistencia en los límites para evitar sobredesplazamiento
    const maxLeft = 0;
    const maxRight = -(totalItems - 1) * 100; // Para móvil: 100% por item
    const currentPos = initialTransform + diffPercent;
    
    if (currentPos > maxLeft) {
      // Resistencia al arrastrar más allá del inicio
      diffPercent = diffPercent * 0.3;
    } else if (currentPos < maxRight) {
      // Resistencia al arrastrar más allá del final
      const excess = currentPos - maxRight;
      diffPercent = diffPercent - (excess * 0.7);
    }
    
    // Limitar el movimiento máximo para evitar descontrol
    diffPercent = Math.max(-50, Math.min(50, diffPercent));
    
    // Aplicar el desplazamiento temporal con suavizado
    carruselLista.style.transform = `translateX(${initialTransform + diffPercent}%)`;
    
    e.preventDefault();
  }

  function handleTouchEnd(e) {
    if (!isDragging || window.innerWidth > 768) return;
    
    isDragging = false;
    
    // Reactivar transición suave
    carruselLista.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    
    const diffX = currentX - startX;
    const containerWidth = document.querySelector('.carrusel-testimonios-container').offsetWidth;
    const diffPercent = (diffX / containerWidth) * 100;
    
    // Umbral dinámico basado en el tamaño del contenedor y velocidad
    const threshold = Math.min(30, containerWidth * 0.15); // 15% del ancho o máximo 30px
    const velocity = Math.abs(diffX) > 10 ? Math.abs(diffX) / 10 : 1; // Factor de velocidad
    
    if (Math.abs(diffX) > threshold || velocity > 2) {
      if (diffX > 0) {
        // Swipe hacia la derecha (anterior)
        prevTestimonio();
      } else {
        // Swipe hacia la izquierda (siguiente)
        nextTestimonio();
      }
    } else {
      // No alcanzó el umbral, volver a la posición actual con animación suave
      updateCarrusel();
    }
    
    e.preventDefault();
  }

  // Agregar event listeners táctiles al contenedor
  const carruselContainer = document.querySelector('.carrusel-testimonios-container');
  carruselContainer.addEventListener('touchstart', handleTouchStart, { passive: false });
  carruselContainer.addEventListener('touchmove', handleTouchMove, { passive: false });
  carruselContainer.addEventListener('touchend', handleTouchEnd, { passive: false });
  
  // Auto-play opcional (comentado por defecto)
  // setInterval(nextTestimonio, 5000);
  
  // Listener para cambios de tamaño de ventana
  window.addEventListener('resize', () => {
    // Regenerar dots y recalcular posición
    generateDots();
    updateCarrusel();
  });
  
  // Inicializar: generar dots y configurar carrusel
  generateDots();
  updateCarrusel();
}

// Inicializar Video Testimonial Destacado
function initVideoTestimonial() {
  const videoThumbnail = document.querySelector('.video-testimonial-thumbnail');
  const videoModal = document.getElementById('video-modal');
  const videoModalClose = document.getElementById('video-modal-close');
  const videoModalOverlay = document.getElementById('video-modal-overlay');
  const youtubeIframe = document.getElementById('youtube-iframe');
  
  // URL del video de YouTube (ejemplo) - reemplazar con el video real
  // Agregar parámetros para subtítulos activados por defecto
  const videoId = 'BM9n7QqVbKw';
  const videoUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&cc_load_policy=1&cc_lang_pref=es&hl=es`;


  // Función para abrir el modal
  function openVideoModal() {
    if (videoModal && youtubeIframe) {
      // Cargar el video con subtítulos activados
      youtubeIframe.src = videoUrl;
      videoModal.classList.add('active');
      
      // Prevenir scroll del body
      document.body.style.overflow = 'hidden';
    }
  }
  
  // Función para cerrar el modal
  function closeVideoModal() {
    if (videoModal && youtubeIframe) {
      // Detener la reproducción del video
      youtubeIframe.src = '';
      videoModal.classList.remove('active');
      
      // Restaurar scroll del body
      document.body.style.overflow = '';
    }
  }
  
  // Event listeners para abrir el modal (solo desde el thumbnail)
  if (videoThumbnail) {
    videoThumbnail.addEventListener('click', openVideoModal);
  }
  
  // Event listeners para cerrar el modal
  if (videoModalClose) {
    videoModalClose.addEventListener('click', closeVideoModal);
  }
  
  if (videoModalOverlay) {
    videoModalOverlay.addEventListener('click', closeVideoModal);
  }
  
  // Cerrar modal con la tecla Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && videoModal && videoModal.classList.contains('active')) {
      closeVideoModal();
    }
  });
  
  // Prevenir que el clic en el contenido del modal cierre el modal
  const videoModalContent = document.querySelector('.video-modal-content');
  if (videoModalContent) {
    videoModalContent.addEventListener('click', function(e) {
      e.stopPropagation();
    });
  }
}

// Función para inicializar la funcionalidad del FAQ
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', function() {
      const isActive = item.classList.contains('active');
      
      // Cerrar todas las demás preguntas (comportamiento de acordeón)
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherQuestion = otherItem.querySelector('.faq-question');
          if (otherQuestion) {
            otherQuestion.setAttribute('aria-expanded', 'false');
          }
        }
      });
      
      // Toggle la pregunta actual
      if (isActive) {
        item.classList.remove('active');
        question.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('active');
        question.setAttribute('aria-expanded', 'true');
      }
    });
    
    // Soporte para navegación con teclado
    question.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        question.click();
      }
    });
  });
}

// Función para inicializar el sistema de recompensas (US37 y US38)
function initSistemaRecompensas() {
  // Manejar botón "Ver vitrina de recompensas" (US37)
  const vitrinaBtn = document.getElementById('ver-vitrina');
  if (vitrinaBtn) {
    vitrinaBtn.addEventListener('click', function() {
      const vitrinaSection = document.getElementById('recompensas');
      if (vitrinaSection) {
        const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
        const offsetTop = vitrinaSection.offsetTop - headerHeight - 20;
        
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  }

  // Manejar hover effects en las tarjetas de recompensa (US38)
  const rewardCards = document.querySelectorAll('.reward-card');
  rewardCards.forEach(card => {
    // Los efectos hover ya están manejados por CSS
    // Solo agregamos funcionalidad adicional si es necesaria
    
    card.addEventListener('click', function() {
      const points = this.getAttribute('data-points');
      const status = this.getAttribute('data-status');
      
      if (status === 'coming-soon') {
        // Mostrar mensaje para recompensas próximamente
        showTemporaryMessage('Esta recompensa estará disponible próximamente', 'info');
      } else {
        // Mostrar información de la recompensa
        const title = this.querySelector('.reward-info h3').textContent;
        showTemporaryMessage(`${title} - ${points} puntos`, 'success');
      }
    });
  });
}

// Función para mostrar mensajes temporales
function showTemporaryMessage(text, type = 'info') {
  // Remover mensajes temporales existentes antes de mostrar uno nuevo
  const existingMessages = document.querySelectorAll('.temporary-message');
  existingMessages.forEach(msg => {
    msg.style.transition = 'all 0.2s ease';
    msg.style.opacity = '0';
    msg.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (msg.parentNode) {
        msg.remove();
      }
    }, 200);
  });

  const message = document.createElement('div');
  message.className = 'temporary-message'; // Agregar clase para identificar mensajes
  const bgColor = type === 'success' ? '#4CAF50' : type === 'info' ? '#2196F3' : '#FF9800';
  
  message.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: ${bgColor};
    color: white;
    padding: 1rem 2rem;
    border-radius: 10px;
    z-index: 1000;
    font-weight: 600;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    max-width: 300px;
    opacity: 0;
    transform: translateX(100%);
    transition: all 0.3s ease;
  `;
  message.textContent = text;
  document.body.appendChild(message);
  
  // Animación de entrada
  requestAnimationFrame(() => {
    message.style.opacity = '1';
    message.style.transform = 'translateX(0)';
  });
  
  // Remover mensaje después de 3 segundos
  setTimeout(() => {
    if (message.parentNode) {
      message.style.opacity = '0';
      message.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (message.parentNode) {
          message.remove();
        }
      }, 300);
    }
  }, 3000);
}

// Función para inicializar la calculadora de puntos (US39)
function initPointsCalculator() {
  const hoursInput = document.getElementById('hours-input');
  const calculateBtn = document.getElementById('calculate-points');
  const resultDiv = document.getElementById('calculator-result');
  const pointsNumber = document.getElementById('points-number');
  const resultExplanation = document.getElementById('result-explanation');
  const viewRewardsBtn = document.getElementById('view-rewards');

  if (!hoursInput || !calculateBtn || !resultDiv) return;

  // Función para calcular puntos
  function calculatePoints() {
    const hours = parseInt(hoursInput.value);
    
    if (isNaN(hours) || hours < 1 || hours > 24) {
      alert('Por favor, ingresa un número válido entre 1 y 24 horas.');
      return;
    }

    // Fórmula: aproximadamente 50 puntos por hora por semana
    const weeklyPoints = hours * 50;
    
    // Mostrar resultado
    pointsNumber.textContent = weeklyPoints;
    resultExplanation.textContent = `Con ${hours} hora${hours > 1 ? 's' : ''} al día sin redes, podrías ganar aproximadamente ${weeklyPoints} puntos en una semana.`;
    
    // Mostrar la sección de resultado con animación
    resultDiv.style.display = 'block';
    setTimeout(() => {
      resultDiv.style.opacity = '0';
      resultDiv.style.transform = 'translateY(20px)';
      resultDiv.style.transition = 'all 0.3s ease';
      
      requestAnimationFrame(() => {
        resultDiv.style.opacity = '1';
        resultDiv.style.transform = 'translateY(0)';
      });
    }, 10);

    // Configurar el botón de recompensas para ir a la vitrina
    if (viewRewardsBtn) {
      viewRewardsBtn.onclick = () => {
        // Scroll suave a la vitrina de recompensas
        const vitrinaSection = document.getElementById('recompensas');
        if (vitrinaSection) {
          const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
          const offsetTop = vitrinaSection.offsetTop - headerHeight - 20;
          
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
          
          // Mostrar mensaje sobre puntos calculados
          setTimeout(() => {
            showTemporaryMessage(`Con ${weeklyPoints} puntos podrás canjear varias recompensas`, 'success');
          }, 500);
        }
      };
    }
  }

  // Event listener para el botón calcular
  calculateBtn.addEventListener('click', calculatePoints);

  // Event listener para Enter en el input
  hoursInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      calculatePoints();
    }
  });

  // Validación en tiempo real del input
  hoursInput.addEventListener('input', function() {
    const value = parseInt(this.value);
    if (value > 24) {
      this.value = 24;
    } else if (value < 0) {
      this.value = '';
    }
  });
}

// Función para inicializar el catálogo de talleres (US34)
function initCatalogoTalleres() {
  const uniButtons = document.querySelectorAll('.uni-btn');
  const talleresGrids = document.querySelectorAll('.talleres-grid');
  const noTalleresMessages = document.querySelectorAll('.no-talleres');

  if (!uniButtons.length) return;

  // Función para mostrar talleres de una universidad específica
  function showUniversityTalleres(universidad) {
    // Ocultar todos los grids y mensajes
    talleresGrids.forEach(grid => {
      grid.style.display = 'none';
    });
    noTalleresMessages.forEach(message => {
      message.style.display = 'none';
    });

    // Actualizar botones activos
    uniButtons.forEach(btn => {
      btn.classList.remove('active');
    });

    // Activar el botón seleccionado
    const activeBtn = document.querySelector(`[data-universidad="${universidad}"]`);
    if (activeBtn) {
      activeBtn.classList.add('active');
    }

    // Mostrar el contenido correspondiente
    const targetGrid = document.querySelector(`.talleres-grid[data-universidad="${universidad}"]`);
    const targetMessage = document.querySelector(`.no-talleres[data-universidad="${universidad}"]`);

    if (targetGrid) {
      targetGrid.style.display = 'grid';
      // Trigger animation
      setTimeout(() => {
        targetGrid.querySelectorAll('.taller-card').forEach((card, index) => {
          card.style.opacity = '0';
          card.style.transform = 'translateY(30px)';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
            card.style.transition = 'all 0.6s ease';
          }, index * 100);
        });
      }, 50);
    } else if (targetMessage) {
      targetMessage.style.display = 'flex';
      // Animate message
      targetMessage.style.opacity = '0';
      setTimeout(() => {
        targetMessage.style.opacity = '1';
        targetMessage.style.transition = 'opacity 0.5s ease';
      }, 100);
    }
  }

  // Event listeners para los botones de universidad
  uniButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const universidad = btn.getAttribute('data-universidad');
      showUniversityTalleres(universidad);
      
      // Mostrar mensaje temporal
      showTemporaryMessage(`Mostrando talleres de ${btn.textContent.trim()}`, 'info');
    });
  });

  // Event listeners para los botones de inscripción
  const inscribirButtons = document.querySelectorAll('.inscribir-btn');
  inscribirButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const tallerCard = btn.closest('.taller-card');
      const tallerName = tallerCard.querySelector('h4').textContent;
      const tallerDesc = tallerCard.querySelector('p').textContent;
      const tallerMeta = tallerCard.querySelectorAll('.taller-meta span');
      
      // Extraer datos del taller
      const tallerData = {
        nombre: tallerName,
        descripcion: tallerDesc,
        duracion: tallerMeta[0] ? tallerMeta[0].textContent.replace(/.*\s/, '') : '2 horas',
        modalidad: tallerMeta[1] ? tallerMeta[1].textContent.replace(/.*\s/, '') : 'Presencial'
      };
      
      // Abrir modal de descripción del taller
      openTallerModal(tallerData);
    });
  });

  // Inicializar modales de talleres
  initTallerModals();

  // Inicializar con UPC por defecto
  showUniversityTalleres('upc');
}

// Función para abrir modal de descripción del taller (US35)
function openTallerModal(tallerData) {
  const modal = document.getElementById('taller-modal');
  
  // Datos específicos del taller basados en el nombre
  let tallerCompleto = {};
  
  switch(tallerData.nombre) {
    case 'Taller de Ciberseguridad':
      tallerCompleto = {
        ...tallerData,
        imagen: 'assets/images/workshops/ciberseguridad.webp',
        descripcion: 'En este taller se enseñarán diversos métodos de seguridad informática que se puede aplicar para proteger nuestra información personal en la red',
        lugar: 'UPC - Campus Monterrico',
        fecha: '27 de julio',
        hora: '14:00 - 16:00',
        salon: 'CS - 603'
      };
      break;
    case 'Taller de Meditación':
      tallerCompleto = {
        ...tallerData,
        imagen: 'assets/images/workshops/meditacion.webp',
        descripcion: 'Aprende técnicas de mindfulness y relajación para reducir el estrés universitario y mejorar tu concentración en los estudios.',
        lugar: 'UPC - Campus Monterrico',
        fecha: '30 de julio',
        hora: '16:00 - 18:00',
        salon: 'AU - 101'
      };
      break;
    case 'Taller de Matemáticas':
      tallerCompleto = {
        ...tallerData,
        imagen: 'assets/images/workshops/matematicas.webp',
        descripcion: 'Refuerza tus conocimientos matemáticos con ejercicios prácticos, dinámicos y técnicas de resolución de problemas.',
        lugar: 'UPC - Campus Monterrico',
        fecha: '2 de agosto',
        hora: '14:30 - 17:00',
        salon: 'MA - 205'
      };
      break;
    case 'Taller de Escritura Creativa':
      tallerCompleto = {
        ...tallerData,
        imagen: 'assets/images/workshops/escritura.webp',
        descripcion: 'Desarrolla tu creatividad y habilidades narrativas en un ambiente colaborativo con otros estudiantes apasionados por la escritura.',
        lugar: 'UPC - Campus Monterrico',
        fecha: '5 de agosto',
        hora: '15:00 - 17:00',
        salon: 'HU - 302'
      };
      break;
    default:
      tallerCompleto = {
        ...tallerData,
        imagen: 'assets/images/workshops/default.webp',
        descripcion: tallerData.descripcion,
        lugar: 'Campus universitario',
        fecha: 'Por definir',
        hora: 'Por definir',
        salon: 'Por definir'
      };
  }
  
  // Rellenar el modal con los datos
  document.getElementById('modal-taller-imagen').src = tallerCompleto.imagen;
  document.getElementById('modal-taller-nombre').textContent = tallerCompleto.nombre;
  document.getElementById('modal-taller-descripcion').textContent = tallerCompleto.descripcion;
  document.getElementById('modal-taller-lugar').textContent = tallerCompleto.lugar;
  document.getElementById('modal-taller-fecha').textContent = tallerCompleto.fecha;
  document.getElementById('modal-taller-hora').textContent = tallerCompleto.hora;
  document.getElementById('modal-taller-salon').textContent = tallerCompleto.salon;
  
  // Mostrar el modal
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Función para inicializar los modales de talleres
function initTallerModals() {
  const tallerModal = document.getElementById('taller-modal');
  const inscripcionModal = document.getElementById('inscripcion-modal');
  const closeButtons = document.querySelectorAll('.modal-close');
  const abrirInscripcionBtn = document.getElementById('abrir-inscripcion');
  const inscripcionForm = document.getElementById('inscripcion-form');
  const inscripcionExito = document.getElementById('inscripcion-exito');
  const cerrarExitoBtn = document.getElementById('cerrar-exito');

  // Cerrar modales
  closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tallerModal.classList.remove('active');
      inscripcionModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
  });

  // Cerrar modal al hacer click en el overlay
  [tallerModal, inscripcionModal].forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  });

  // Abrir modal de inscripción desde el modal de descripción
  if (abrirInscripcionBtn) {
    abrirInscripcionBtn.addEventListener('click', () => {
      tallerModal.classList.remove('active');
      inscripcionModal.classList.add('active');
      
      // Pre-llenar algunos campos si es posible
      const tallerNombre = document.getElementById('modal-taller-nombre').textContent;
      // Podríamos agregar un campo oculto con el nombre del taller
    });
  }

  // Manejar envío del formulario de inscripción (US36)
  if (inscripcionForm) {
    inscripcionForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      let valid = true;
      
      // Lista de campos a validar
      const campos = [
        { 
          id: "inscripcion-nombres", 
          msg: "Los nombres son obligatorios.",
          validator: v => v.trim() !== ""
        },
        { 
          id: "inscripcion-apellidos", 
          msg: "Los apellidos son obligatorios.",
          validator: v => v.trim() !== ""
        },
        { 
          id: "inscripcion-email", 
          msg: "Correo electrónico inválido.",
          validator: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
        },
        { 
          id: "inscripcion-codigo", 
          msg: "El código de estudiante es obligatorio.",
          validator: v => v.trim() !== ""
        },
        { 
          id: "inscripcion-universidad", 
          msg: "La universidad es obligatoria.",
          validator: v => v.trim() !== ""
        }
      ];

      // Limpiar errores previos y clases de error
      campos.forEach(c => {
        const errorEl = document.getElementById(`error-${c.id}`);
        const inputEl = document.getElementById(c.id);
        if (errorEl) errorEl.textContent = "";
        if (inputEl) inputEl.classList.remove('error');
      });

      // Validar cada campo
      campos.forEach(c => {
        const el = document.getElementById(c.id);
        if (el) {
          const val = el.value.trim();
          const isOk = c.validator(val);
          if (!isOk) {
            valid = false;
            const errorEl = document.getElementById(`error-${c.id}`);
            if (errorEl) errorEl.textContent = c.msg;
            el.classList.add('error');
          }
        }
      });

      if (!valid) {
        return;
      }
      
      // Simular envío del formulario
      const submitBtn = inscripcionForm.querySelector('.submit-inscripcion-btn');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
      submitBtn.disabled = true;
      
      // Simular delay de envío
      setTimeout(() => {
        // Ocultar formulario y mostrar mensaje de éxito
        inscripcionForm.style.display = 'none';
        inscripcionExito.style.display = 'block';
        
        // Resetear formulario
        inscripcionForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Limpiar mensajes de error al resetear
        campos.forEach(c => {
          const errorEl = document.getElementById(`error-${c.id}`);
          const inputEl = document.getElementById(c.id);
          if (errorEl) errorEl.textContent = "";
          if (inputEl) inputEl.classList.remove('error');
        });
      }, 2000);
    });
  }

  // Cerrar modal de éxito
  if (cerrarExitoBtn) {
    cerrarExitoBtn.addEventListener('click', () => {
      inscripcionModal.classList.remove('active');
      document.body.style.overflow = 'auto';
      
      // Resetear vista del modal
      setTimeout(() => {
        inscripcionForm.style.display = 'grid';
        inscripcionExito.style.display = 'none';
      }, 300);
    });
  }

  // Cerrar modales con tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      tallerModal.classList.remove('active');
      inscripcionModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });
}

// Inicializar todos los contenios al cargar la página
document.addEventListener('DOMContentLoaded', function() {
  loadHTML("ld-header", "header.html", initHeader);
  loadHTML("ld-footer", "footer.html", initFooter);
  handleRouting();
});

// Reactiva routing cuando cambia el hash
window.addEventListener("hashchange", handleRouting);

// Inicializar tip del día (US47)
function initTipDiario() {
  // Función para obtener el tip del día basado en la fecha actual
  function getTipDelDia() {
    const hoy = new Date();
    const fechaHoy = hoy.toDateString(); // Formato comparable
    
    // Buscar tip que coincida con la fecha de hoy
    let tipHoy = tipsDatabase.find(tip => tip.fecha.toDateString() === fechaHoy);
    
    // Si no hay tip para hoy, usar el último tip disponible (más reciente)
    if (!tipHoy) {
      // Ordenar tips por fecha descendente y tomar el más reciente

      const tipsSorted = [...tipsDatabase].sort((a, b) => b.fecha - a.fecha);
      tipHoy = tipsSorted[0];
    }
    
    return tipHoy;
  }

  // Mostrar el tip del día
  function mostrarTipDelDia() {
    const tip = getTipDelDia();
    const tipIcon = document.getElementById('tip-icon');
    const tipTitulo = document.getElementById('tip-titulo');
    const tipDescripcion = document.getElementById('tip-descripcion');
    const tipFecha = document.getElementById('tip-fecha');
    const tipCategoria = document.getElementById('tip-categoria');
    const tipImagen = document.getElementById('tip-imagen');

    if (tipIcon && tipTitulo && tipDescripcion && tipFecha && tipCategoria && tipImagen) {
      // Actualizar icono
      tipIcon.innerHTML = `<i class="${tip.icono}"></i>`;
      
      // Actualizar contenido
      tipTitulo.textContent = tip.titulo;
      tipDescripcion.textContent = tip.descripcion;
      tipCategoria.textContent = tip.categoria;
      
      // Formatear fecha
      const fechaFormateada = tip.fecha.toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
      tipFecha.textContent = fechaFormateada;
      
      // Actualizar imagen (placeholder si no existe)
      tipImagen.src = `https://via.placeholder.com/140x140/2B7A78/FFFFFF?text=${tip.categoria}`;
      tipImagen.alt = `Ilustración para ${tip.titulo}`;
    }
  }

  // Inicializar
  mostrarTipDelDia();
}