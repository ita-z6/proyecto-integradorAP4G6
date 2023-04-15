// Para que el video se reproduzca desde el principio
$('#carouselExampleIndicators').on('slide.bs.carousel', function (event) {
  if ($(event.relatedTarget).find('#videoC').length > 0) {
    $('#videoC').get(0).currentTime = 0;
    $('#videoC').get(0).play();
  }
});

//validador del form contactenos
const form = document.querySelector('form');
const mensajeAgradecimiento = document.getElementById('mensajeAgradecimiento');

form.addEventListener('submit', function(event) {
  event.preventDefault();
  const nombre = document.getElementById('nombre').value.trim();
  const telefono = document.getElementById('telefono').value.trim();
  const email = document.getElementById('email').value.trim();
  const mensaje = document.getElementById('mensaje').value.trim();

  if (nombre !== '' && telefono !== '' && email !== '' && mensaje.replace(/^\s+|\s+$/g, '').length>0) {
    mensajeAgradecimiento.innerHTML = '<p>¡Muchas gracias por contactate con nosotros!</p>';
    mensajeAgradecimiento.style.display = 'block';
//el carte de agradecimiento desaparece a los 4 segundo
    setTimeout(function() {
      mensajeAgradecimiento.style.display = 'none';
    }, 4000);
    form.reset();
  }else{
    return false
  }
});
// sacar el carte de agradecimiento haciendo click en cualquier parte
document.addEventListener('click', function() {
  mensajeAgradecimiento.style.display = 'none';
});
