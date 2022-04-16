var score = 0;
var time = 10;
var startBtn = document.getElementById('startBtn');
var numAnwsers = "4"
var pokemonId = 1;
var sprite = 1
var apiUrl = "https://pokeapi.co/api/v2/pokemon/" + pokemonId;

// randomly get pokemon
var getPokemon = function(){
    var randomNumber = Math.floor(Math.random() * 149) + 1;
    console.log(randomNumber);
}
// randomly where correct anwser is
var anwserLocaton = function(){
    var anwLoc = Math.floor(Math.random() * numAnwsers) + 1;
    console.log(anwLoc);
}    
// create high score page
// Get the modal
var modalHS = document.getElementById("highScoreModal");

// Get the button that opens the modal
var btn = document.getElementById("highScore");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modalHS.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modalHS.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modalHS) {
    modalHS.style.display = "none";
  }
}

// create / cleanup game/start function



startBtn.addEventListener("click", function(){
    fetch(apiUrl).then(function(response){
        response.json().then(function(data){
            console.log(apiUrl);
            console.log(data.name);
            console.log(data.sprites.front_shiny);
            var name = data.name;
            var pokeSprite = data.sprites.front_shiny;
            document.querySelector('video').style.visibility='hidden';
            document.getElementById('pokemonImage').setAttribute("src",pokeSprite)
        }); 
    });
})




