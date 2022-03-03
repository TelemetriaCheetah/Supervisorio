const socket = io();

socket.on("cheetah_server", (message) =>
{
  console.log(message.SA76);
  document.getElementById("SA38").innerHTML = message.SA38 + "º";
  document.getElementById("SA8").innerHTML = message.SA8 + "º";
  document.getElementById("SA61").innerHTML = message.SA61;
  document.getElementById("SA63").innerHTML = message.SA63 + "º";
  document.getElementById("SA55").innerHTML = message.SA55/10;
  document.getElementById("SA56").innerHTML = message.SA56;
  document.getElementById("SA34").innerHTML = (Math.round(message.SA34 * 100) / 100).toFixed(2) + "%";

  document.getElementById("barraBateria").style.width = (Math.round(message.SA34 * 100) / 100).toFixed(2) + "%";
  document.getElementById("tps").style.height = message.SA1 + "%";
  document.getElementById("freio").style.height = message.SA76/10 + "%";

});

function toggleFullscreen(elem) {
  elem = elem || document.documentElement;

  if (!document.fullscreenElement && !document.mozFullScreenElement &&
    !document.webkitFullscreenElement && !document.msFullscreenElement) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
}

document.getElementById('botao').addEventListener('click', function() {
  toggleFullscreen();
});
