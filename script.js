document.getElementById("search").addEventListener('click', event => {
    // Prevent the browser from refreshing
    event.preventDefault()

    // Clear all the stuff
    document.getElementById('results').innerHTML = ''
    document.getElementById('lyrics').innerText = ''
    document.getElementById('songTitle').innerText = ''

    // Get the input value and clear the input field
    const userSongInput = document.getElementById('songInput').value
    document.getElementById('songInput').value = ''

    // Get 10 results for input value
    fetch(`https://api.lyrics.ovh/suggest/${userSongInput}`)
        .then(response => response.json())
        .then(data => {
            // Filter out 10 results
            const searchResults = data.data.filter((song, index) => index < 10)

            // Place all Results in HTML
            searchResults.map((song) => {
                document.getElementById('results').innerHTML += `
                <div class="single-result row align-items-center my-3 p-3">
                    <div class="col-md-2">
                        <img width="80%" src="${song.album.cover}" alt="">
                    </div>
                    <div class="col-md-7 ml-0">
                        <h3 class="lyrics-name">${song.title}</h3>
                        <p class="author lead">Album by <span>${song.artist.name}</span></p>
                    </div>
                    <div class="col-md-3 text-md-right text-center">
                        <button onclick="getLyrics('${song.artist.name}', '${song.title}')" class="btn btn-success">Get Lyrics</button>
                    </div>
                </div>
                `
            })
        })
})

/*
    getLyrics function takes artist and title as argument,
    calls the api for that artist and title and 
    puts the lyrics in HTML
*/
const getLyrics = (artist, title) => {
    fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
        .then(res => res.json())
        .then(data => {
            const lyrics = data.lyrics
            const songTitle = `${title} - ${artist}`
            if (lyrics == undefined) {
                document.getElementById('songTitle').innerText = songTitle
                document.getElementById('lyrics').innerText = "No Lyrics Found"
            }
            else {
                document.getElementById('songTitle').innerText = songTitle
                document.getElementById('lyrics').innerText = lyrics
            }
    })
}
