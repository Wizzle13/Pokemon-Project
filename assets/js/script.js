var score = 0;
var time = 10;
var startBtn = document.getElementById('startBtn');
var submitHs = document.getElementById('submitHs');
var numAnswers = 4;
var count = numAnswers + 1;
var pokemonId = 1;
var sprite = 1;
var pokeAnswer = document.querySelector("#answerSection");
var displayScore = document.querySelector("#displayHighScore");
var anwLoc = 0;
var questionCount = 0;
var PokeScore = [];
var savedHighScores = [];

// randomly get pokemon
var getPokemon = function(){
    var randomPokemon = Math.floor(Math.random() * 149) + 1;
    pokemonId = randomPokemon;
}
// randomly where correct answer is
var answerLocaton = function(){
    anwLoc = Math.floor(Math.random() * numAnswers) + 1;
    // console.log("correct Answer = " + anwLoc);
}    
// create high score page
// Get the modal
var modalHS = document.getElementById("highScoreModal");
var modalQuiz = document.getElementById("quizModal");
var modalScore = document.getElementById("Submitscore");
// Get the button that opens the modal
var btn = document.getElementById("highScore");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  displayHighScores = "";
  modalHS.style.display = "block";
  var displayHighScores = localStorage.getItem("Pokemon");
  
  // parse into array of objects
  displayHighScores = JSON.parse(displayHighScores);

  // loop through savedTasks array
  for (var i = 0; i < displayHighScores.length; i++) {
    // pass each task object into the `createTaskEl()` function
    $(displayScore).append ("<tr><td>" + displayHighScores[i].name +"</td><td>" + displayHighScores[i].score + "</td></tr>");
  }

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
var startQuiz = function() {
  getPokemon();
  modalQuiz.style.display = "block";
  var apiUrl = "https://pokeapi.co/api/v2/pokemon/" + pokemonId;
  fetch(apiUrl).then(function(response){
    response.json().then(function(data){
      // console.log(data.name);
      // console.log(data.sprites.front_shiny);
      var name = data.name;
      answerLocaton();
      var pokeSprite = data.sprites.front_shiny;
      document.querySelector('video').style.visibility='hidden';
      document.getElementById('pokemonImage').setAttribute("src",pokeSprite)
      // loops to pull a select number of pokemon
      for(var i = 1; i < count; i++){
        
        // console.log("i= "+ i + ", " + anwLoc );
        if(i == anwLoc){
          // appends the correct answer to the quiz
          // console.log("i= "+ i + ", " + anwLoc + " correct Answer= "+ name);
          $(pokeAnswer).append (
          "<div><input type='radio' id = " + name + "name='pmon' value = " + name + "><lable> " + name + "</lable></div>"
          );
          
        } 
        else{
          // selects and display the other wrong answers
          getPokemon();
          
          var apiUrl = "https://pokeapi.co/api/v2/pokemon/" + pokemonId;
          fetch(apiUrl).then(function(response){
            response.json().then(function(data){
              // console.log("i = " + i + ", " + anwLoc +" wrong Answer= " + data.name );
              $(pokeAnswer).append (
                "<div><input type='radio' id = " + data.name + "name='pmon' value = " + data.name + "><lable> " + data.name + "</lable></div>"
                );
            });
          });
        };
      };
    }); 
  });
}

var correctAnswer = function(event){
  // event.preventDefault();
  if (questionCount < 10) {
    questionCount++;
    document.getElementById('answerSection').innerHTML = "";
    startQuiz();
  } else {
    score = 15;
    document.getElementById('score').innerHTML = score;
    modalQuiz.style.display = "none";
    submitScore.style.display = "block";
    
  };
};

var highScore = function(){
  
  var initials = document.querySelector("input[name='HSI']").value;
  console.log("Initials: " + initials);
  // writes initials and score to array and stores in localstorage
  PokeScore.push ({
    name: initials,
    score: score
  });

  localStorage.setItem("Pokemon", JSON.stringify(PokeScore));
  // window.location.reload(true);
  
};

var loadHighScores = function(){
  var savedHighScores = localStorage.getItem("Pokemon");
  // if there are no tasks, set tasks to an empty array and return out of the function
  if (!savedHighScores) {
    return false;
  }
  console.log("High Scores found!");
  // else, load up saved tasks

  // parse into array of objects
  savedHighScores = JSON.parse(savedHighScores);

  // loop through savedTasks array
  for (var i = 0; i < savedHighScores.length; i++) {
    // pass each task object into the `createTaskEl()` function
    PokeScore.push(savedHighScores[i]);
  }
};

startBtn.addEventListener("click", function(){
  startQuiz();

})

submitBtn.addEventListener("click", function(event){
  event.preventDefault();
  correctAnswer();
})

submitHs.addEventListener("click", function(event){
  event.preventDefault;
  highScore();
});  

loadHighScores();