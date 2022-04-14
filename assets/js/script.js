var score = 0;
var time = 10;
var startBtn = document.getElementById('startBtn');
var pokemonId = 1;
var sprite = 1
var apiUrl = "https://pokeapi.co/api/v2/pokemon/" + pokemonId;

// fetch(apiUrl).then(function(response){
//     response.json().then(function(data){
//         console.log(data.name);
//         console.log(data.sprites.front_shiny)
//     });
// });

startBtn.addEventListener("click", function(){
    fetch(apiUrl).then(function(response){
        response.json().then(function(data){
            console.log(data.name);
            console.log(data.sprites.front_shiny);
            var name = data.name;
            var pokeSprite = data.sprites.front_shiny;
            document.querySelector('video').style.visibility='hidden';
            document.getElementById('pokemonImage').setAttribute("src",pokeSprite)
        }); 
    });
})




