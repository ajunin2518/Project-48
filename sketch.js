var PLAY = 1;
var END = 0;
var gameState = PLAY;
var bg
var target
var score=0
var bulletCount=15
var bullet
var gameover
var shootingSound

function preload(){
  bg=loadImage("bg.jpg");
  targetImage=loadImage("target.png");
  crossImage=loadImage("cross.png");
  targetBImage=loadImage("targetB.png");
  targetCImage=loadImage("targetC.png");
  targetGImage=loadImage("targetG.png");
  bulletImage=loadImage("bullet.png");
  gameoverImage=loadImage("gameOver.png");
  shootingSound=loadSound("shot sound.mp3");
  bulletSound=loadSound("bulletSound.mp3");
  gameoverSound=loadSound("gameoverSound.mp3");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  cross=createSprite(width/2, height/2);
  cross.addImage(crossImage);
  cross.scale=0.3;
  cross.setCollider("circle",0,0,30)
  cross.debug=true;
  targetGroup=new Group();
  targetBGroup=new Group();
  targetCGroup=new Group();
  targetGGroup=new Group();
  edge=createEdgeSprites();
  bulletGroup=new Group();
  gameover=createSprite(width/2, height/2);
  gameover.addImage(gameoverImage);
  gameover.scale=0.5
}

function draw() {
  background(bg);
  cross.collide(edge);
  if (gameState===PLAY){
    if(keyDown(UP_ARROW)){
      cross.y += -5;
    } 
    if(keyDown(DOWN_ARROW)){
      cross.y += 5;
    }
    if(keyDown(LEFT_ARROW)){
      cross.x += -5;
    }
    if(keyDown(RIGHT_ARROW)){
      cross.x += 5;
    }
    spawnTarget();
    spawnBlackTarget();
    spawnBlueTarget();
    spawnGreenTarget();
    spawnBullet();
    if (cross.isTouching(targetGroup) && keyDown("space")){
      targetGroup.destroyEach();
      score=score+15
      shootingSound.play()
    }
    if (cross.isTouching(targetBGroup) && keyDown("space")){
      targetBGroup.destroyEach();
      score=score+5
      shootingSound.play()
    }
    if (cross.isTouching(targetCGroup) && keyDown("space")){
      targetCGroup.destroyEach();
      score=score+20
      shootingSound.play()
    }
    if (cross.isTouching(targetGGroup) && keyDown("space")){
      targetGGroup.destroyEach();
      score=score+10
      shootingSound.play()
    }
    if (keyDown("space")&& bulletCount>0){
      bulletCount = Math.floor(bulletCount -0.5) 
    }
    if(bulletCount<=0){
      gameState=END
      gameoverSound.play()
    }
    if(cross.isTouching(bulletGroup)){
      bulletCount +=5
      bulletGroup.destroyEach();
      bulletSound.play()
    }
    gameover.visible=false;
  }
  else{
    targetGroup.setVelocityXEach(0)
    targetBGroup.setVelocityXEach(0)
    targetCGroup.setVelocityXEach(0)
    targetGGroup.setVelocityXEach(0)
    bulletGroup.setVelocityXEach(0)
    //gameOver()
    gameover.visible=true;
  }

  drawSprites();
  fill("red")
  textSize(30)
  text("score : "+ score, width-200,50);
  text("Bullets : "+ bulletCount, width-200,80);

}

function spawnTarget(){
  if(frameCount%500==75){
    target=createSprite(width, Math.round(random(100,350)))
    target.addImage(targetImage);
    target.velocityX=-3
    target.scale=0.3
    cross.depth=target.depth+1
    target.setCollider("circle",0,60,70);
    target.debug=true;
    targetGroup.add(target)
  }
}

function spawnBlackTarget(){
  if(frameCount%500==150){
    targetB=createSprite(width, Math.round(random(100,350)))
    targetB.addImage(targetBImage);
    targetB.velocityX=-3
    targetB.scale=0.5
    cross.depth=targetB.depth+1
    targetB.setCollider("circle",0,50,70);
    targetB.debug=true;
    targetBGroup.add(targetB)
  }
}

function spawnBlueTarget(){
  if(frameCount%500==225){
    targetC=createSprite(width, Math.round(random(100,350)))
    targetC.addImage(targetCImage);
    targetC.velocityX=-3
    targetC.scale=0.25
    cross.depth=targetC.depth+1
    targetC.setCollider("circle",0,90,70);
    targetC.debug=true;
    targetCGroup.add(targetC)
  }
}

function spawnGreenTarget(){
  if(frameCount%500==300){
    targetG=createSprite(width, Math.round(random(100,350)))
    targetG.addImage(targetGImage);
    targetG.velocityX=-3
    targetG.scale=0.4
    cross.depth=targetG.depth+1
    targetG.setCollider("circle",0,40,70);
    targetG.debug=true;
    targetGGroup.add(targetG)
  }
}

function spawnBullet(){
  if(frameCount%500==400){
    bullet=createSprite(width, Math.round(random(100,350)))
    bullet.addImage(bulletImage);
    bullet.velocityX=-3
    bullet.scale=0.2
    cross.depth=bullet.depth+1
    bullet.setCollider("circle",0,40,70);
    bullet.debug=true;
    bulletGroup.add(bullet)
  }
}

function gameOver() {
  swal({
    title: `Game Over`,
    text: "Oops you lost the race....!!!",
    imageUrl:
      "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
    imageSize: "100x100",
    confirmButtonText: "Thanks For Playing"
  });
}

//work on swal
//bg music