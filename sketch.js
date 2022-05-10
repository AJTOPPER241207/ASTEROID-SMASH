var spaceshipImage, asteroidImage
var bulletImage 
var bullet,bullets , bulletG
var asteroid, asteroidG , asteroidG1 , asteroid1 , asteroid2 , asteroidG2
var score = 0
var lives = 5
var LEVEL1 = 1
var END = 0
var LEVEL0 = 10
var invisibleGround,spaceImg , invisibleGround1
var GAMESTATE = LEVEL0
var LEVEL2 = 2
var LEVEL3 = 3
var LEVEL4 = 4
var  bigAsteroidImg , health , bigAsteroidG


function preload(){
  
spaceshipImage = loadImage("spaceship.png" ) 
bulletImage = loadImage("bullet.png")
asteroidImage = loadImage("asteroid.png")
spaceImg = loadImage("space.png") 
bigAsteroidImg = loadImage("boss asteroid.png")
gameOverImg = loadImage("gameOver.png")
}

function setup(){
  createCanvas(500,500)
  
  gameOver = createSprite(250,250,500,500)
  gameOver.addImage("gameOver", gameOverImg)
  gameOver.visible = true

  space = createSprite(250,250,600,600)
  space.addImage("space" , spaceImg)
  space.scale = 3
  space.visible = true
  
spaceship = createSprite(200,450,20,20)  
spaceship.addImage("shooting" , spaceshipImage)
spaceship.scale = 0.25
  spaceship.visible = true


  invisibleGround = createSprite(0,300,0,600)
  invisibleGround.visible = false
  invisibleGround1 = createSprite(500,300,0,600)
  invisibleGround1.visible = false
    invisibleGround2 = createSprite(300,600,600,1)
  invisibleGround2.visible = false
    
bulletG = new Group()
asteroidG = new Group()  
asteroidG1 = new Group() 
asteroidG2 = new Group()
bigAsteroidG = new Group()


}



function draw(){
  
 background(0) 
    
    if(asteroidG.isTouching(invisibleGround2)){
    lives = lives-1  
      asteroidG.destroyEach()
    }   
    
    if(asteroidG1.isTouching(invisibleGround2)){
      asteroidG1.destroyEach()     
    }    
    
    if(asteroidG2.isTouching(invisibleGround2)){
    lives = lives-1   
      asteroidG2.destroyEach()
    }
    
    if(bulletG.isTouching(asteroidG)){
      score = score + 1
      asteroidG.destroyEach()
    }
    if(bulletG.isTouching(asteroidG1)){
      asteroidG1.destroyEach()
      score = score + 1
    }
    if(bulletG.isTouching(asteroidG2)){
      asteroidG2.destroyEach()
      score = score + 1
    }
    if(bulletG.isTouching(bigAsteroidG)){
      bigAsteroidG.destroyEach()
      score = score + 2
    }
    if(bigAsteroidG.isTouching(invisibleGround2)){
      bigAsteroidG.destroyEach()
     lives = lives - 1
    }

    
    
    
  spaceship.visible = true
  spaceship.collide(invisibleGround) 
  spaceship.collide(invisibleGround1)
  
  if(keyDown("left_arrow")){
    spaceship.x = spaceship.x - 5
  }
    if(keyDown("right_arrow")){
     spaceship.x = spaceship.x + 5 
      
    }
    
  if(GAMESTATE === LEVEL1){
    if(keyDown("x")){
      makingBullets() 
      }
      makingAsteroids();
      //makingBigAsteroid()
      //makingBigAsteroid1()
    
    if(lives<=0){
      GAMESTATE = END
    } 
    if(score > 30){
      GAMESTATE = LEVEL2      
    }

  }
     
    
  if(GAMESTATE === LEVEL2){

    if(keyDown("x")){
      makingBullets() 
      }
      makingAsteroids();
      makingBigAsteroid()


if(score >= 35){
GAMESTATE = LEVEL3
}

      if(lives<=0){
        GAMESTATE = END
      }
      
  }
  
  if(GAMESTATE === LEVEL3){
    if(keyDown("x")){
      makingBullets() 
      }
      makingAsteroids();
      makingBigAsteroid()

  }
  
if(GAMESTATE === END){
  endingGame();
}
  
  drawSprites();
  text("lives = " + lives,300,50)
 text("score = " + score, 200 ,50)
 
 //text("asteroidLife = " + bgLives,400,50)
  
 if(GAMESTATE === LEVEL0){
   text("use arrow keys to move" , 200,200)
   text("press key x to shoot", 200,250)
   text("To play game press space",200,300)
   if(keyDown("space")){
     GAMESTATE = LEVEL1
   }
 }
}

function makingBullets(){
  
  if(frameCount % 15 === 0){
  bullet = createSprite(200,200,20,20)
  bullet.addImage("boom" , bulletImage)
  bullet.y = spaceship.y
   bullet.x = spaceship.x - 13
  bullet.scale = 0.08
  bullet.velocityY = -6
  
  bullets = createSprite(200,200,20,20)
  bullets.addImage("boom" , bulletImage)
  bullets.y = spaceship.y
   bullets.x = spaceship.x + 13
  bullets.scale = 0.04
  bullets.velocityY = -6
  bullets.lifetime = 90
  bullet.lifetime = 90
  
  bulletG.add(bullet)
  bulletG.add(bullets)
  }
}

function makingAsteroids(){
  
if(frameCount % 70 == 0){
  asteroid = createSprite(300,0,20,20) 
asteroid.addImage("asteroids" , asteroidImage)
asteroid.x = Math.round(random(30,450))
asteroid.scale = 0.25
asteroid.velocityY = 5
 asteroidG.add(asteroid)
asteroid.debug = false
}
 
 if(frameCount % 80 == 0){
 asteroid1 = createSprite(200,0,20,20) 
asteroid1.addImage("asteroids" , asteroidImage)
asteroid1.x = Math.round(random(30,450))
asteroid1.scale = 0.25
asteroid1.velocityY = 5
 asteroidG1.add(asteroid1)
asteroid1.debug = false

}
  if(frameCount % 80 == 0){
 asteroid2 = createSprite(200,0,20,20) 
asteroid2.addImage("asteroids" , asteroidImage)
asteroid2.x = Math.round(random(30,450))
asteroid2.scale = 0.25
asteroid2.velocityY = 5
 asteroidG2.add(asteroid2)
asteroid2.debug = false




}

if(GAMESTATE === LEVEL2){
  asteroidG1.setVelocityYEach(5.5)

  asteroidG2.setVelocityYEach(5.5)

  asteroidG.setVelocityYEach(5.5)
}
}

function endingGame(){
  
asteroidG.setVelocityYEach(0) 
asteroidG1.setVelocityYEach(0)
asteroidG2.setVelocityYEach(0) 
gameOver.visible = true 
bigAsteroidG.setVelocityYEach(0)  
space.visible = false
asteroidG.destroyEach()
asteroidG1.destroyEach()
asteroidG2.destroyEach()
bigAsteroidG.destroyEach()
spaceship.visible = false

if(mousePressedOver(gameOver)){
  GAMESTATE = LEVEL1
  lives = 5
  score = 0
  gameOver.visible = false
  space.visible = true
}
  
}

function makingBigAsteroid(){

if(frameCount % 100 === 0){

  bigAsteroid = createSprite(300,-100,100,100)
  bigAsteroid.addImage("big" , bigAsteroidImg)
  bigAsteroid.velocityY = 9
  bigAsteroid.scale = 0.5

 
  bigAsteroidG.add(bigAsteroid)
}

}

