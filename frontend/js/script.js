document.addEventListener("DOMContentLoaded", async () => {
     await loadSongs();
     document.getElementById('addSongForm').addEventListener('submit', async (event) => {
          event.preventDefault();
          const name = document.getElementById('name').value;
          const artist = document.getElementById('artist').value;
          const album = document.getElementById('album').value;
          const response = await fetch("http://localhost:5000/api/songs", {
               method: "POST",
               headers: {
                    "Content-Type": "application/json"
               },
               body: JSON.stringify({ name, artist, album })
          });
          const result = await response.json();
          if (response.ok) {
               document.getElementById("result").innerText = "Canción agregada correctamente";
               await loadSongs();
               document.getElementById('name').value = '';
               document.getElementById('artist').value = '';
               document.getElementById('album').value = '';
          } else {
               document.getElementById("result").innerText = result.message;
          }
     });
     document.getElementById('updateSongForm').addEventListener('submit', async (event) => {
          event.preventDefault();
          const name = document.getElementById('updateName').value;
          const artist = document.getElementById('updateArtist').value;
          const album = document.getElementById('updateAlbum').value;
          const response = await fetch(`http://localhost:5000/api/songs/${name}`, {
               method: "PUT",
               headers: {
                    "Content-Type": "application/json"
               },
               body: JSON.stringify({ artist, album })
          });
          const result = await response.json();
          if (response.ok) {
               document.getElementById("result").innerText = "Canción actualizada correctamente";
               await loadSongs();
               document.getElementById('updateName').value = '';
               document.getElementById('updateArtist').value = '';
               document.getElementById('updateAlbum').value = '';
          } else {
               document.getElementById("result").innerText = result.message;
          }
     });
});
async function loadSongs() {
     try {
          const response = await fetch("http://localhost:5000/api/songs");
          const songs = await response.json();
          const songsList = document.getElementById("songsList");
          songsList.innerHTML = "";
          songs.forEach((song) => {
               const songCard = document.createElement("div");
               songCard.classList.add("song-card");
               songCard.innerHTML = `
                    <div style="display: flex; align-items: center;">
                         <img src="../css/img/disco.png" alt="Disco" class="song-image">
                         <div>
                              <h3>${song.name}</h3>
                              <h3 style="font-size: 14px; font-weight: normal;">by ${song.artist} - ${song.album}</h3>
                         </div>
                    </div>
                    <button onclick="deleteSong('${song.name}')">Eliminar</button>
               `;
               songsList.appendChild(songCard);
          });
     } catch (err) {
          console.error("Error al cargar las canciones:", err);
     }
}
async function deleteSong(name) {
     const response = await fetch(`http://localhost:5000/api/songs/${name}`, {
          method: "DELETE"
     });
     const result = await response.json();
     if (response.ok) {
          await loadSongs();
     } else {
          alert(result.message);
     }
}