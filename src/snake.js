import React, { Component } from 'react';
import ground from './img/ground.png';
import food from './img/food.png';
import deadAudio from './audio/dead.mp3';
import downAudio from './audio/down.mp3';
import eatAudio from './audio/eat.mp3';
import leftAudio from './audio/left.mp3';
import rightAudio from './audio/right.mp3';
import upAudio from './audio/up.mp3'

class Snake extends Component {
  constructor(props){
    super(props)
       this.state={
         score : 0,
         newGame : false
       }
  }
    componentDidMount() {
      const cvs = this.refs.canvas
      const ctx = cvs.getContext("2d")
      const groundImage = this.refs.image;
      const foodImage = this.refs.imagefood;

    //   load audios
      const dead = new Audio();
      const left = new Audio();
      const down = new Audio();
      const right = new Audio();
      const up = new Audio();
      const eat = new Audio();

      dead.src =deadAudio;
      left.src = leftAudio;
      right.src = rightAudio;
      down.src = downAudio;
      up.src = upAudio;
      eat.src = eatAudio;
    
    
      const box = 32;


       // create the snake
       let snake = [];

       snake[0] = {
           x : 9 * box,
           y : 10 * box
       };
          //  create the food
       let food = {
           x: Math.floor(Math.random()*17+1) * box,
           y: Math.floor(Math.random()*15+3) * box
       }
       
      //  score variable
  

       let d ;

    //    control the snake
    document.addEventListener("keydown",direction );
    function direction(event){
        if(event.keyCode === 37 && d !== "RIGHT"){
           d = "LEFT";
           left.play()
        }else if(event.keyCode === 38 && d !== "DOWN"){
            d = "UP";
            up.play();
        }else if(event.keyCode === 39 && d !== "LEFT"){
            d = "RIGHT";
            right.play();
        } else if(event.keyCode === 40 && d !== "UP"){
            d = "DOWN";
            down.play();
            
        }

    }

    // cheack collision function
function collision(head,array){
  for(let i = 0; i < array.length; i++){
      if(head.x === array[i].x && head.y === array[i].y){
          return true;
  
      }
  }
  return false;
}


        // draw every thing to canvas
      groundImage.onload = () => {
        ctx.drawImage(groundImage,0,0);
        for(let i = 0; i< snake.length; i++){
            ctx.fillStyle = (i === 0) ? "green" : "white";
            ctx.fillRect(snake[i].x,snake[i].y,box, box);

            ctx.strokeStyle = "red";
            ctx.strokeRect(snake[i].x, snake[i].y ,box,box);
        }

        ctx.drawImage(foodImage, food.x, food.y);


        // old head position
        let snakeX = snake[0].x;
        let snakeY = snake[0].y;


        // which direction
        if(d === "LEFT") snakeX -= box;
        if(d === "UP") snakeY -= box;
        if(d === "RIGHT") snakeX += box;
        if(d === "DOWN") snakeY += box;


    //    if the snake eats food
    if(snakeX === food.x && snakeY === food.y){
      this.setState({
       score : this.state.score + 1
      })
      eat.play();

        food = {
         x: Math.floor(Math.random()*17+1) *box,
         y: Math.floor(Math.random()*15+3) *box
     }
     // we dont remove the tail
   }else{
// remove the tail
     snake.pop();
   }

        // add new head
        let newHead = {
            x: snakeX,
            y: snakeY
        }

         //   game over
     if(snakeX < box || snakeX > 17 * box || snakeY < 3 * box || snakeY > 17*box || collision(newHead,snake)){
      clearInterval(game);
      dead.play();
    
      this.setState({
         newGame : true
      })
      
       }

       snake.unshift(newHead);

       ctx.fillStyle = "white";
       ctx.font = "45px Arail";
       ctx.fillText(this.state.score, 2*box, 1.6*box);
    
      }
      
      // call draw function every 100ms
      let game = setInterval(groundImage.onload, 100)
  
    }

    // start new Game
    new = ()=>{
      
   this.componentDidMount()
   this.setState({
     score: 0,
     newGame: false
   })
    }

    
    
    render() {
  
      return(
        <div className="container">
     

        <canvas ref="canvas" width={608} height={608} className="snake" />

        <img ref="image" src={ground} className="hidden" id="ground" alt="abc" />
        <img ref="imagefood" src={food} className="hidden" alt="abc" />
        

        <div className="row right">
        <div className="col s12">
        <div className="card new ">
        <div className="card-content black white-text center">
        <h5>=>  Press Arrow Key to Start The Game</h5>
        </div>
        <div className="card-action center">
        <button className="btn black waves-effect waves-light"  disabled={!this.state.newGame}  onClick={this.new}>New Game</button>
        </div>
        </div>
        </div>
        </div>
  
        </div>
      )
    }
  }
  export default Snake


  