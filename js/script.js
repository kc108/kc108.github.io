// console.log("Finn cat")
const API_KEY = 'bb7080f5-00e5-4645-9c7b-6d3eca4f0645';
let catData, imageData, breeds, breed;

const $breed = $("#breed");
const $image = $("#image");
const $energy_level = $("#energy_level");
const $country = $("#country");
const $weight = $("#weight");
const $life_span = $("#life_span");
const $desc = $("#desc");


const promise = $.ajax({
    url: 'https://api.thecatapi.com/v1/breeds', 
    headers: { "x-api-key": API_KEY }
}).then(
    (data) => {
        // console.log(data);
        breeds = data;
        getImage();
    }, 
    (error) => {
        console.log('bad request', error);
    }
);


function getImage() {
    let breedNum = Math.floor(Math.random() * Math.floor(breeds.length));
    breed = breeds[breedNum];
    // console.log(breed);

    const promise2 = $.ajax({
        url: 'https://api.thecatapi.com/v1/images/search?breed_id=' + breed.id,
        headers: { "x-api-key": API_KEY }
    }).then(
        (data) => {
            //console.log(data);
            imageData = data;
            render();
        }, 
        (error) => {
            console.log('bad request', error);
        }
    );
}

// console.log($breed);

function render() {
    $breed.text(breed.name);
    // $image.attr(imageData);
    //console.log(breed);
    $image.attr('src', imageData[0].url);
    $energy_level.text(breed.temperament);
    $country.text(breed.origin);
    $weight.text(breed.weight_imperial);
    $life_span.text(breed.life_span);
    $desc.text(breed.description);
}


