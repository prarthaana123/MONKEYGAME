var Monkey, Monkey_Running
var Banana, Banana_Image, Obstacle, Obstacle_Image
var FoodGroup, ObstacleGroup
var Score, Ground
var SurvivalTime


function preload() {


  Monkey_Running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  Banana_Image = loadImage("banana.png");
  Obstacle_Image = loadImage("obstacle.png");

  FoodGroup = new Group()
  ObstacleGroup = new Group()

}


function setup() {
  createCanvas(670, 400);
  Score = 0
  SurvivalTime = 0

  Ground = createSprite(0, 400, 1500, 10)

  Monkey = createSprite(90, 370, 10, 10)
  Monkey.addAnimation("monkey_running", Monkey_Running)
  Monkey.scale = 0.1


}


function draw() {
  background("lime")

  if (keyDown("space") && Monkey.y >= 350) {
    Monkey.velocityY = -10
  }
  Monkey.velocityY = Monkey.velocityY + 0.3
  Monkey.collide(Ground)


  Ground.velocityX = -7
  Ground.x = Ground.width / 2;

  if (World.frameCount % 200 === 0) {
    fruits()
  }

  if (World.frameCount % 300 === 0) {
    stones()
  }

  if (Monkey.isTouching(FoodGroup)) {
    FoodGroup.destroyEach()
    Score = Score + 1
  }


  drawSprites()
  fill("teal")
  stroke(50)
  textSize(18)
  text("Score: " + Score, 500, 50);

  fill("black")
  var SurvivalTime = Math.round(getFrameRate() / 1);
  text("Survival Time: " + SurvivalTime, 350, 50)

}

function fruits() {
  Banana = createSprite(670, Math.round(random(170, 230)), 10, 10)
  Banana.addImage(Banana_Image)
  Banana.scale = 0.1
  Banana.velocityX = -3
  FoodGroup.add(Banana)
}

function stones() {
  Obstacle = createSprite(670, 380, 10, 10)
  Obstacle.addImage(Obstacle_Image)
  Obstacle.velocityX = -4
  Obstacle.scale = 0.2
  ObstacleGroup.add(Obstacle)
}