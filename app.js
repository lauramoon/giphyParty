console.log("Let's get this party started!");
const form = document.getElementById('search');
const input = document.getElementById('input');
const clear = document.getElementById('clear');
const imageDiv = document.getElementById('images');

async function addGiphy(term) {
    try {
        const url = `http://api.giphy.com/v1/gifs/search?q=${term}&api_key=MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym`;
        const res = await axios.get(url);
        // console.log(res);
        if (res.data.data.length) {
            const imageUrl = getRandomGiphy(res.data.data);
            appendGiphy(imageUrl);
        } else {
            alert("No results available for that search. Please try again.")
        }
    } catch (e) {
        console.log(e);
        alert("SOMETHING WENT WRONG!");
    }
}

function getRandomGiphy(data) {
    const selection = Math.floor(Math.random()*data.length);
    return data[selection].images.original.url;
}

function appendGiphy(url) {
    const newImg = document.createElement('IMG');
    newImg.src = url;
    newImg.classList.add('giphy');
    imageDiv.append(newImg);
}

form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (input.value) {
        addGiphy(input.value);
    }
    input.value = '';
})

clear.addEventListener('click', function() {
    imageDiv.innerHTML = '';
})