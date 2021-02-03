var pacman,pacmanimg
var back,backimg
var road,roadimg
var score = 0
var tb,wb
var tbg,wbg
var car1img,car2img
var carg
var PLAY = 1
var END = 0
var gameState = 1

function preload(){
  pacmanimg = loadImage("pacman.png")
  backimg = loadImage("background.png")
  roadimg = loadImage("road.png")
  tbimg = loadAnimation("tb1.png","tb2.png")
  wbimg = loadAnimation("wb1.png","wb2.png")
  car1img = loadImage("car1.png")
  car2img = loadImage("car2.png")
}


function setup() {
  createCanvas(400, 400);
  
  back = createSprite(200,200,10,10)
  back.addImage("back-ground",backimg)
  
  road = createSprite(200,390,10,10)
  road.addImage("road-ground",roadimg)
  road.scale = 2.8
  
  pacman = createSprite(200,200,10,10)
  pacman.addImage("pac-man",pacmanimg)
  pacman.scale = 0.1
  
  tbg = new Group()
  wbg = new Group()
  carg = new Group()
}

function draw() {
  background(220);
  
  if(gameState === PLAY){
    pacman.x = World.mouseX
    pacman.y = World.mouseY

    tbSpawn()
    wbSpawn()
    cars()
  
    if (pacman.isTouching(tbg)){
      score = score +2
      tbg.destroyEach()
    }
    if (pacman.isTouching(wbg)){
      score = score +1
      wbg.destroyEach()
    }
    if (pacman.isTouching(carg)){
      score = score - 1
      carg.destroyEach()
      pacman.y = 200
    }
    if(score === -1){
      gameState = END
    }
  }
  else if(gameState === END){
    carg.destroyEach()
    tbg.destroyEach()
    wbg.destroyEach()
    pacman.destroy()
  }
  drawSprites();
  text("Score = " + score,180,20)
}

function tbSpawn(){
  if(frameCount % 80 === 0){ 
    tb = createSprite(Math.round(random(20,370)),0,10,10)
    tb.addAnimation("tb-man",tbimg)
    tb.scale = 0.1
    tb.velocityY = 2
    console.log("tb")
    tbg.add(tb)
    tb.lifetime = 205
  }
}
function wbSpawn(){
  var select = Math.round(random(1,2))
  if(select === 1){
    //spawn from right
    if(frameCount % 60 === 0){ 
    wb = createSprite(400,Math.round(random(20,300)),10,10)
    wb.addAnimation("wb-man",wbimg)
    wb.scale = 0.2
    wb.velocityX = -2
    console.log("wb")
    wbg.add(wb)
    wb.lifetime = 205
  }
  }
  else{
    //spawn from left
     if(frameCount % 60 === 0){ 
    wb = createSprite(0,Math.round(random(20,300)),10,10)
    wb.addAnimation("wb-man",wbimg)
    wb.scale = 0.2
    wb.velocityX = 2
    console.log("wb")
    wbg.add(wb)
    wb.lifetime = 205
  }
}
}
function cars(){
  if(frameCount % 70 === 0){
    var car = createSprite(400,370,10,10)
    car.velocityX = -3
    car.scale = 0.3
    carg.add(car)
    var rand = Math.round(random(1,2))
    switch(rand){
      case 1: car.addImage(car1img)
        break;
      case 2: car.addImage(car2img)
        break;
    }
  }
}