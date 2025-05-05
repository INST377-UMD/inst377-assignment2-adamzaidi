document.addEventListener('DOMContentLoaded', function() {
    loadRandomDogs();
    loadBreeds();
});

function loadRandomDogs() {
    fetch('https://dog.ceo/api/breeds/image/random/10')
        .then(response => response.json())
        .then(data => {
            const carousel = document.getElementById('dog-carousel');
            let index = 0;

            function showImage(idx) {
                carousel.innerHTML = '';
                const img = document.createElement('img');
                img.src = data.message[idx];
                carousel.appendChild(img);
            }

            showImage(index);
            setInterval(() => {
                index = (index + 1) % data.message.length;
                showImage(index);
            }, 3000);
        })
        .catch(error => {
            console.error('Error fetching dog images:', error);
        });
}

function loadBreeds() {
    fetch('https://dogapi.dog/api/v2/breeds')
        .then(response => response.json())
        .then(data => {
            const breedsContainer = document.getElementById('breedsContainer');
            data.data.forEach(breed => {
                const button = document.createElement('button');
                button.className = 'fancy-button';
                button.innerText = breed.attributes.name;
                button.setAttribute('data-id', breed.id);
                button.addEventListener('click', function() {
                    showBreedInfo(breed);
                });
                breedsContainer.appendChild(button);
            });
        })
        .catch(error => {
            console.error('Error fetching breeds:', error);
        });
}

function showBreedInfo(breed) {
    document.getElementById('breedName').innerText = breed.attributes.name;
    document.getElementById('breedDescription').innerText = breed.attributes.description;
    document.getElementById('minLife').innerText = breed.attributes.min_life;
    document.getElementById('maxLife').innerText = breed.attributes.max_life;
    document.getElementById('breedInfo').classList.remove('hidden');
}

if (annyang) {
    annyang.addCommands({
        'load dog breed *breedName': function(breedName) {
            fetch('https://dogapi.dog/api/v2/breeds')
                .then(response => response.json())
                .then(data => {
                    const breed = data.data.find(b => b.attributes.name.toLowerCase() === breedName.toLowerCase());
                    if (breed) {
                        showBreedInfo(breed);
                    }
                })
                .catch(error => {
                    console.error('Error fetching breed:', error);
                });
        }
    });
}