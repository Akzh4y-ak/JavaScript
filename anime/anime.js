async function searchAnime() {
    const query = document.getElementById("searchInput").value;
    if (!query) return alert("Please enter an anime name!");

    const url = `https://api.jikan.moe/v4/anime?q=${query}&limit=1`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.data.length > 0) {
            const anime = data.data[0];
            document.getElementById("animeResult").innerHTML = `
                <h2>${anime.title}</h2>
                <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
                <p><strong>Episodes:</strong> ${anime.episodes}</p>
                <p><strong>Rating:</strong> ${anime.score}</p>
                <p>${anime.synopsis}</p>
            `;
        } else {
            document.getElementById("animeResult").innerHTML = "<p>No results found.</p>";
        }
    } catch (error) {
        console.error("Error fetching anime:", error);
        alert("Failed to fetch anime. Try again later.");
    }
}
