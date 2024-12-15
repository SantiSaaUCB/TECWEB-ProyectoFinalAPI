document.addEventListener("DOMContentLoaded", async () => {
     await loadSongs();
});

async function loadSongs() {
     try {
          const response = await fetch("https://tecweb-proyectofinalapi.onrender.com/api/songs");
          const songs = await response.json();
          const songsList = document.getElementById("songsList");
          songsList.innerHTML = ""; // Limpiar el contenido previo
          
          songs.forEach((song) => {
               const songCard = document.createElement("div");
               songCard.classList.add("song-card");
               songCard.innerHTML = `
                    <div class="song-image-container">
                         <img src="/img/disco.png" alt="Imagen de la canción" class="song-image">
                    </div>
                    <div>
                         <h3>${song.name}</h3>
                         <p>Artista: ${song.artist}</p>
                         <p>Álbum: ${song.album}</p>
                    </div>
               `;
               songsList.appendChild(songCard);
          });
     } catch (err) {
          console.error("Error al cargar las canciones:", err);
     }
}
