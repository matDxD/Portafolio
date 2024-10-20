$(document).ready(function() {
  // Cachear todos los elementos del carrusel
  var allItems = $('#project-carousel .item').clone();
  
  // Inicializar el carrusel
  var owl = $('#project-carousel').owlCarousel({
    items: 1, // Número de elementos visibles
    loop: true,
    margin: 10,
    nav: true,
    dots: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    responsive: {
      0: { items: 1 },
      600: { items: 1 },
      1000: { items: 1 }
    }
  });

  var projectData = {}; // Variable para almacenar los datos del archivo JSON

  // Cargar datos del archivo JSON usando fetch
  function loadProjectData() {
    return fetch('js/projects.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al cargar los datos del proyecto');
        }
        return response.json();
      })
      .then(data => {
        projectData = data; // Asignar los datos cargados a la variable projectData
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
  
  // Función para mostrar detalles de un proyecto en base al ID
  function showDetails(projectId) {
    var details = document.getElementById("project-details");
  
    // Verificar si el proyecto existe en el objeto projectData
    if (projectData[projectId]) {
      console.log("ID del proyecto:", projectId);
      var project = projectData[projectId];
     
      var imagesHtml = project.images.map(image => 
        `<img src="${image}" alt="${project.title}" style="width:800%; max-width:800px; margin-bottom: 10px;" /> <br> </br>`
    ).join(''); // Crear HTML para cada imagen

    var htmlContent = `
        <h3>${project.title}</h3>
        
        <p><strong>Descripción:</strong> ${project.description}</p>
        <p><strong>Tecnologías:</strong> ${project.technologies}</p>
        <p><a href="${project.link}" target="_blank">Repositorio del proyecto en GitHub</a></p>
        <p><strong>Galeria de imagenes:</strong> <div> ${imagesHtml}</div> </p>
        
    `;
      
      // Insertar los detalles
      details.innerHTML = htmlContent;
      $('#project-info').slideDown();
    } else {
      details.innerHTML = "Detalles no disponibles.";
      $('#project-info').slideDown();
    }
  }

  // Inicializar el cargado de datos cuando el documento esté listo
  loadProjectData(); // Cargar los datos al iniciar la página

  /* Evento que detecta el cambio de imagen en el carrusel (opcional)
  owl.on('changed.owl.carousel', function(event) {
    var currentIndex = event.item.index;  // Índice de la imagen activa
    console.log("Imagen activa index: " + currentIndex);
  }); */

  // Función para filtrar proyectos
  function filterProjects(filter) {
    // Destruir el carrusel actual
    owl.trigger('destroy.owl.carousel');
    // Vaciar el carrusel
    $('#project-carousel').html('');

    // Filtrar y agregar los elementos correspondientes
    var filteredItems;
    if (filter === 'all') {
      filteredItems = allItems.clone();
    } else {
      filteredItems = allItems.filter('[data-category="' + filter + '"]').clone();
    }

    if (filteredItems.length > 0) {
      $('#project-carousel').append(filteredItems);
    } else {
      $('#project-carousel').append('<div class="item"><p>No hay proyectos en esta categoría.</p></div>');
    }

    // Re-inicializar el carrusel con los elementos filtrados
    owl = $('#project-carousel').owlCarousel({
      items: 1,
      loop: true,
      margin: 10,
      nav: true,
      dots: true,
      autoplay: true,
      autoplayTimeout: 3000,
      autoplayHoverPause: true,
      responsive: {
        0: { items: 1 },
        600: { items: 1 },
        1000: { items: 1 }
      }
    });
  }

  // Manejar clics en los botones de filtro
  $('.filter-btn').on('click', function() {
    var filter = $(this).attr('data-filter');

    // Añadir clase activa al botón seleccionado
    $('.filter-btn').removeClass('active');
    $(this).addClass('active');

    // Filtrar proyectos
    filterProjects(filter);
  });

  // Asignar evento a los botones de "Detalles"
  $(document).on('click', '.details-btn', function() {
    var projectId = $(this).data('id'); // Obtener el ID del proyecto del botón
    showDetails(projectId);  // Llamar a la función para mostrar los detalles
  });
});
