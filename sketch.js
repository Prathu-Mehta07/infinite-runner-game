var PLAY = 1;
var END = 0;
var gameState = PLAY;


var ground, invisibleGround, groundImage;


var obstaclesGroup, obstacle1, obstacle2, obstacle3;
var player, playerImage

var score=0;

var gameOver, restart;



function preload(){
  playerImage = loadImage("images/player.jpg");
  
  groundImage = loadImage("images/track.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("images/obstacle.png");
  obstacle2 = loadImage("images/train.jpg");
  obstacle3 = loadImage("images/train 2.png");
}

function setup() {
  createCanvas(displayWidth,displayHeight);
  
  player = createSprite(width/2,height,20,50);
  
  player.addAnimation("running", playerImage);
  player.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.y = ground.height /2;
  ground.velocityY= (6 + 3*score/100);
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  //player.debug = true;
  background(255);
  text("Score: "+ score, 500,50);
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityY = (6 + 3*score/100);
  
    if(keyDown("space") && player.y >= 159) {
      player.velocityY = -12;
    }
  
    player.velocityY = player.velocityY + 0.8
  
    if (ground.y > height-100){
      ground.y = ground.height/2;
    }
  
    player.collide(invisibleGround);
    
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(player)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityY = 0;

    obstaclesGroup.setVelocityXEach(0);

    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
  drawSprites();
}


function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,0,10,40);
    //obstacle.debug = true;
    obstacle.velocityY = (6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
    
  score = 0;
  
}