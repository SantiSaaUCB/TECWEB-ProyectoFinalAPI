document.addEventListener("DOMContentLoaded", async () => {
    await loadSongs();
});

async function loadSongs() {
    try {
        const response = await fetch("https://tecweb-proyectofinalapi.onrender.com/api/songs");
        const songs = await response.json();
        const songsList = document.getElementById("songsList");
        songsList.innerHTML = "";
        songs.forEach((song) => {
            const songCard = document.createElement("div");
            songCard.classList.add("song-card");
            songCard.innerHTML = `
                <div style="display: flex; align-items: center;">
                    <img src="https://tecweb-proyectofinalapi.onrender.com/frontend/css/img/disco.png" alt="Disco" class="song-image"> <!-- Ruta de imagen corregida -->
                    <div>
                        <h3>${song.name}</h3>
                        <h3 style="font-size: 14px; font-weight: normal;">by ${song.artist} - ${song.album}</h3>
                    </div>
                </div>
            `;
            songsList.appendChild(songCard);
        });
    } catch (err) {
        console.error("Error al cargar las canciones:", err);
    }
}
