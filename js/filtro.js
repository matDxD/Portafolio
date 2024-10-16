$(document).ready(function(){
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
  
    // Función para filtrar proyectos
    function filterProjects(filter) {
      // Destruir el carrusel actual
      owl.trigger('destroy.owl.carousel');
      // Vaciar el carrusel
      $('#project-carousel').html('');
  
      // Filtrar y agregar los elementos correspondientes
      var filteredItems;
      if(filter === 'all'){
        filteredItems = allItems.clone();
      } else {
        filteredItems = allItems.filter('[data-category="' + filter + '"]').clone();
      }
  
      if(filteredItems.length > 0){
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
    $('.filter-btn').on('click', function(){
      var filter = $(this).attr('data-filter');
  
      // Añadir clase activa al botón seleccionado
      $('.filter-btn').removeClass('active');
      $(this).addClass('active');
  
      // Filtrar proyectos
      filterProjects(filter);
    });
  });
  