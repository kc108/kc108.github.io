// console.log("Finn cat")
const API_KEY = 'bb7080f5-00e5-4645-9c7b-6d3eca4f0645';
let catData, imageData, breeds, correctBreed, buttonBreeds;
let rightAnswers = 0, wrongAnswers = 0, pickedAnswer, lives = 9;
let showRightAnswer = false, showOutOfLives = false;

const $breed = $("#breed");
const $cat_image = $(".catImage");
const $energy_level = $("#energy_level");
const $country = $("#country");
const $weight = $("#weight");
const $life_span = $("#life_span");
const $desc = $("#desc");
const $buttons = $(".breedButton");
const $score = $("#score");

loadBreeds();

function loadBreeds() {
    const promise = $.ajax({
        url: 'https://api.thecatapi.com/v1/breeds', 
        headers: { "x-api-key": API_KEY }
    }).then(
        (data) => {
            // console.log(data);
            breeds = data;
            getNewCat();
        }, 
        (error) => {
            console.log('bad request', error);
        });
}


function getNewCat() {
    showRightAnswer = false;
    showOutOfLives = false;
    $buttons.removeClass("wrong");
        
    // select 4 unique breeds
    buttonBreeds = [];
    while (buttonBreeds.length < 4) {
        let breed = breeds[Math.floor(Math.random() * breeds.length)];
        // console.log(breed);
        if (!buttonBreeds.includes(breed)) {
            buttonBreeds.push(breed);
        }
    }

   
    // set correctBreed
    correctBreed = buttonBreeds[0];

    //console.log(buttonBreeds[0]);
    shuffle(buttonBreeds);
    // console.log(buttonBreeds[0]);
    console.log(correctBreed);
    pickedAnswer = false;

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

    // TODO: keep track of lives
    // TODO: create popup 
    // TODO: restart button
      
 
    // name button with random cat breeds
    for (let i = 0; i < 4; i++) {
        $buttons.eq(i).text(buttonBreeds[i].name);
    }

    // display score
    $score.text(`${rightAnswers}/${rightAnswers + wrongAnswers}`);
    $("#lives").text(lives);

    $("#pop_up").hide();
    $("#rightAnswer").hide();
    $("#outOfLives").hide();

    if (showRightAnswer) {
        $("#rightAnswer").show();
        $("#pop_up").show();
    } else if (showOutOfLives) {
        $("#outOfLives").show();
        $("#pop_up").show();
    }
}

// when correct answer is selected, will pop-up with breed information
$buttons.on('click', handleClick);
function handleClick(event) {
    // call preventDefault() 'onclick' event will refresh page
    event.preventDefault();
    if(correctBreed.name === $(event.target).text()) {
        showRightAnswer = true;
        // if you haven't picked an answer before increment the score
        if(!pickedAnswer) {
            rightAnswers++;
        }
    } else {
        $(event.target).addClass("wrong");
        if(!pickedAnswer) {
            wrongAnswers++;
        }
        lives--;
        if(lives <= 0) {
            showOutOfLives = true;
        }
    }
    // console.log("finn");
    // set picked answer to true
    pickedAnswer = true;
    
    // keep track of num of wrongAnswers + rightAnswers
    render();
 }

// event handler for button on 'popup' 
$("#meow").on('click', (event) => {
    getNewCat();
});


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



