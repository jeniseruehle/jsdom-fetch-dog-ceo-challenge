console.log('%c HI', 'color: firebrick')

document.addEventListener('DOMContentLoaded', function() {
    fetchImages();
    fetchBreeds();
});

function fetchImages() {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
    fetch(imgUrl)
    .then(response => response.json())
    .then(json => {
        json.message.forEach(image => addImage(image))
    });
}

function addImage(dogImg) {
    let imgContainer = document.querySelector('#dog-image-container');
    let img = document.createElement('img');
    img.src = dogImg;
    imgContainer.appendChild(img);
}

function fetchBreeds() {
    const breedUrl = 'https://dog.ceo/api/breeds/list/all'
    fetch(breedUrl)
    .then(resp => resp.json())
    .then(json => {
        breeds = Object.keys(json.message);
        updateBreedList(breeds);
        breedListener();
    });
}

function updateBreedList(breeds) {
    let ul = document.querySelector('#dog-breeds');
    removeBreeds(ul);
    breeds.forEach(breed => addBreed(breed));
}

function removeBreeds(element) {
    let child = element.lastElementChild;
    while (child) {
        element.removeChild(child);
        child = element.lastElementChild;
    }
}

function breedsStartingWith(letter) {
    updateBreedList(breeds.filter(breed => breed.startsWith(letter)));
}

function breedListener() {
    let dropDown = document.querySelector('#breed-dropdown');
    dropDown.addEventListener('change', function(e) {
        breedsStartingWith(e.target.value);
    });
}

function addBreed(breed) {
    let ul = document.querySelector('#dog-breeds');
    let li = document.createElement('li');
    li.innerText = breed;
    ul.appendChild(li);
    li.addEventListener('click', changeColor);
}

function changeColor(event) {
    event.target.style.color = 'purple';
}