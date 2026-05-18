const words = document.querySelectorAll(".word");
const dropzones = document.querySelectorAll(".dropzone");

let selectedWord = null;

// DRAG START
words.forEach(word => {

  word.addEventListener("dragstart", () => {
    selectedWord = word;
    word.classList.add("dragging");
  });

  word.addEventListener("dragend", () => {
    word.classList.remove("dragging");
  });

});

// DROP ZONES
dropzones.forEach(zone => {

  zone.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  zone.addEventListener("drop", () => {

    const correctAnimal = zone.dataset.animal;
    const draggedWord = selectedWord.dataset.word;

    if (correctAnimal === draggedWord) {

      zone.classList.add("correct");

      zone.appendChild(selectedWord);

      selectedWord.setAttribute("draggable", "false");

      // habilitar botón audio
      const btn = zone.querySelector(".audio-btn");
      btn.disabled = false;

      // sonido éxito
      successSound();

    } else {

      errorSound();

      alert("Inténtalo nuevamente");

    }

  });

});

// REPRODUCIR AUDIO
function playAudio(id) {
  const audio = document.getElementById(id);
  if (!audio) return;
  const p = audio.play();
  if (p !== undefined) {
    p.catch(err => {
      console.warn('Audio play failed for', id, err);
      try {
        audio.pause();
        audio.currentTime = 0;
        audio.load();
        audio.play().catch(e => console.error('Retry play failed for', id, e));
      } catch (e) {
        console.error(e);
      }
    });
  }
}

// SONIDOS
function successSound() {
  const audio = new Audio(
    "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3"
  );
  audio.play();
}

function errorSound() {
  const audio = new Audio(
    "https://cdn.pixabay.com/download/audio/2022/03/15/audio_3bb187f2d8.mp3"
  );
  audio.play();
}