//Create variables here
var dog, dogImg, happyDog, happyDogImg;
var database, foodStock, foodS = 20;

function preload() {
  //load images here
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
}

function readStock(data){
    foodS=data.val();
}

function writeStock(x){
    if(x<=0){
        x=0;
    }
    else{
        x=x-1;
    }

    database.ref('/').update({
        Food:x
    })
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);

  dog = createSprite(250, 350, 50, 50);
  dog.addImage(dogImg);
  dog.scale = 0.2;
  
  happyDog = createSprite(250, 350, 50, 50);
  happyDog.addImage(happyDogImg);
  happyDog.scale = 0.2;
  happyDog.visible = false;

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
}

function draw() {
    if(keyWentDown(UP_ARROW)){
        writeStock(foodS);
        changeImage();
    }
    text("Note: Press UP_ARROW Key To Feed Drago Milk !",30,100,textSize(20),fill("red"),stroke(2));
    text("Food remaining: " + foodS, 50, 150)

  drawSprites();
}
function changeImage(){
    happyDog.visible = true;
    dog.visible = false;
}