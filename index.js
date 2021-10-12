var buttonColors=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var started=false;
var level=0;

$("#level-title").clicked(function(event){
  if(!started)
  {
     $("h1").text("Level "+level);
    nextSequence();
    started=true;
  }
});

function nextSequence()
{
  userClickedPattern=[];
  level++;
  $("h1").text("Level "+level);
  var randomNumber=Math.floor(Math.random()*4);
  var randomChosenColor=buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}
$(".btn").click(function(){
  var userChosenColor=$(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});

function playSound(userChosenColor){
  var sound=new Audio("sounds/"+userChosenColor+".mp3");
  sound.play();
}

function animatePress(userChosenColor){
  $("#"+userChosenColor).addClass("pressed");
  setTimeout(function(){
    $("#"+userChosenColor).removeClass("pressed");
  },100);
}

function checkAnswer(currentLevel)
{
  if(userClickedPattern[currentLevel]===gamePattern[currentLevel])
  {
    console.log("Success");
    if(userClickedPattern.length===gamePattern.length)
    {
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }
  else
  {
    console.log("Wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    var score=level*10
    $("h1").text("Game Over! Score : "+score+". "+"\nPress any key to restart");
    startOver();
  }
}

function startOver(){
  gamePattern=[];
  userClickedPattern=[];
  started=false;
  level=0;
}
