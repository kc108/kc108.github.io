// console.log("Finn cat")
const API_KEY = 'bb7080f5-00e5-4645-9c7b-6d3eca4f0645';
let catData, imageData, breeds, correctBreed;

const $breed = $("#breed");
const $cat_image = $(".catImage");
const $energy_level = $("#energy_level");
const $country = $("#country");
const $weight = $("#weight");
const $life_span = $("#life_span");
const $desc = $("#desc");
const $buttons = $(".breed");



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
    $buttons.removeClass("wrong");
    let breedNum = Math.floor(Math.random() * Math.floor(breeds.length));
    correctBreed = breeds[breedNum];
    console.log(correctBreed);

    const promise2 = $.ajax({
        url: 'https://api.thecatapi.com/v1/images/search?breed_id=' + correctBreed.id,
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
    $breed.text(correctBreed.name);
    // $image.attr(imageData);
    //console.log(breed);
    $cat_image.attr('src', imageData[0].url);
    $energy_level.text(correctBreed.temperament);
    $country.text(correctBreed.origin);
    $weight.text(correctBreed.weight.imperial + " pounds");
    $life_span.text(correctBreed.life_span + " years");
    $desc.text(correctBreed.description);
    // select 3 wrong answers
    let buttonBreeds = [correctBreed];
    for (let i = 0; i < 3; i++) {
       let wrongBreed = breeds[Math.floor(Math.random() * breeds.length)];
       // console.log(wrongBreed);
       buttonBreeds.push(wrongBreed);
       
    }

    //console.log(buttonBreeds[0]);
    shuffle(buttonBreeds);
    // console.log(buttonBreeds[0]);
    // name button with random cat breeds
    for (let i = 0; i < 4; i++) {
    $buttons.eq(i).text(buttonBreeds[i].name);
    }
    
    // TODO: show number of correctly guessed cat breeds
    
}

// when correct answer is selected, will pop-up with breed information
$buttons.on('click', handleClick);
function handleClick(event) {
    // call preventDefault() 'onclick' event will refresh page
    event.preventDefault();
    if(correctBreed.name === $(event.target).text()) {
        $("#pop_up").show();
    } else {
        $(event.target).addClass("wrong");
    }
    // console.log("finn");

    
    /* need to work on making pop-up display*/
    
}

// will shuffle arrays for buttons: reference: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

// event handler for button on 'popup' 
$("#meow").on('click', (event) => {
    $("#pop_up").hide();
    getImage();
});




