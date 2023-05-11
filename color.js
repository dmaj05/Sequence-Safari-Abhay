const playBoard=document.querySelector(".play-board");
const scoreElement=document.querySelector(".score");
const highScoreElement=document.querySelector(".high-score");
const timerElement=document.querySelector(".timer");

let timerId;
let gameOver=false;
let foodX, foodY;
let snakeX=5, snakeY=10;
let snakeBody=[[5,10],[6,10],[7,10]];
let posX=0, posY=0;
let score=0;
let currentTime=15;
let gameStart=false;

let foodColors = ["red", "pink", "blue", "yellow"];
let foodPositions = [];





//getting highscore
let highScore=localStorage.getItem("high-score") || 0;
highScoreElement.innerHTML = "High Score:" + highScore;

//changing the location of food 
const changeFoodPosition= () => {
  foodPositions = [];
  for(let i = 0; i < 4; i++){
    let foodX = Math.floor(Math.random()*20) + 1;
    let foodY = Math.floor(Math.random()*20) + 1;
    foodPositions.push([foodX, foodY]);
  }
}
const startTimer = ()=>{
  if(gameStart==true){
     timerId = setInterval(initGame,125); 
  }
}

//gameover function
const handleGameOver = () =>{
  clearInterval(timerId);
  alert("You lost, press ok to restart the game");
  location.reload();
}

//Changing position of snake on keypress

const changeDirection= (e)=> {
   if(e.key === "ArrowUp" && posY!==1){
    posX=0;
    posY=-1;
    if(!gameStart){
    gameStart=true;
    startTimer();
  }
   }

   else if(e.key === "ArrowDown" && posY!==-1){
    posX=0;
    posY=1;
    if(!gameStart){
      gameStart=true;
      startTimer();
    }
   }

   else if(e.key === "ArrowLeft" && posX!==1){
    posX=-1;
    posY=0;
    if(!gameStart){
      gameStart=true;
      startTimer();    
    }
   }

   else if(e.key === "ArrowRight" && posX!==-1){
    posX=1;
    posY=0;
    if(!gameStart){
      gameStart=true;
      startTimer();   
    }
   }

   

}


//Onscreen Buttons



const moveLeft = () =>{
  if(posX!==1){
  posX=-1;
  posY=0;
    if(!gameStart){
      gameStart=true;
      startTimer();    
    }
  }
}

const moveRight = () =>{
  if(posX!==-1){
  posX=1;
  posY=0;
    if(!gameStart){
      gameStart=true;
      startTimer();   
    }
  }
}

const moveDown = () =>{
  if(posY!==-1){
  posX=0;
  posY=1;
    if(!gameStart){
      gameStart=true;
      startTimer();
    }
  }
}

const moveUp = () =>{
  if(posY!==1){
  posX=0;
  posY=-1;
    if(!gameStart){
      gameStart=true;
      startTimer();
    }
  }
}



//Initializing the food and snakehead position
const initGame = () =>{
  
  if(gameOver){
    return handleGameOver();
  }

  let htmlMarkup = "";

 
  for(let i = 0; i < foodPositions.length; i++){
    let color = foodColors[i];
    let foodX = foodPositions[i][0];
    let foodY = foodPositions[i][1];

    htmlMarkup += `<div class="food" style= "background-color: ${color}; grid-area: ${foodY} / ${foodX}" ></div>`;
    
    if(snakeX===foodX && snakeY===foodY){
      
      foodPositions.splice(i, 1);
      foodColors.splice(i, 1);
      if(foodPositions.length === 0){
        score+=4;
        currentTime+=5;
        snakeBody.push([foodX,foodY]);
        changeFoodPosition();
        foodColors = ["red", "green", "blue", "yellow"];
      }
      
      scoreElement.innerHTML = "Score:" + score;
      if(score>=highScore){
        highScore=score;
      }
      localStorage.setItem("high-score", highScore);
      highScoreElement.innerHTML = "High Score:" + highScore;
    }
  }


  for(let i = snakeBody.length - 1; i>0; i--){
    //shifting forward snake body
    snakeBody[i]=snakeBody[i-1];
  }

  snakeBody[0]=[snakeX,snakeY];
  
  
  //updating snakes head position
  snakeX+=posX;
  snakeY+=posY;

  if(snakeX <= 0 || snakeX>20 || snakeY <=0 || snakeY>20 ){
    gameOver=true;
  }

  //gameover if snake hits the wall
  

  for(let i = 0; i< snakeBody.length; i++){
    htmlMarkup += `<div class="head" style= "grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}" ></div>`;
    if(i!==0 && snakeBody[0][1]===snakeBody[i][1] && snakeBody[0][0]===snakeBody[i][0] && i!==2 && i!==1){
      gameOver=true;
    }
  }

  
  playBoard.innerHTML = htmlMarkup;

  
    timerElement.innerHTML= "Timer:" + Math.floor(currentTime);
    if(currentTime===0){
      gameOver=true;
    }
    currentTime-=.125;
  }

 



  

changeFoodPosition();
startTimer();
document.addEventListener("keydown", changeDirection);