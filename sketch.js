//Create variables here
var dog,dogImg, happyDog, database, foodS, foodStock;
function preload()
{
  //load images here
  happyDog = new Image("happydog.png");
  dogImg = new Image("Dog.png");
  
}

function setup() {
	createCanvas(500, 500);
  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
  dog = createSprite(250,250,10,10); 
  dog.addImage(dogImg);
}


function draw() {  
  background(46,139,87);
  fill(255);
  text("Balance: " +foodS, 200, 20);
  if(keyWentDown(UP_ARROW)) {
    writeStock(foodS);
    dog.addImage(happyDog);
  }
  else{
    dog.addImage(dogImg);
  }

  drawSprites();
  //add styles here

}
function readStock(data){
  foodS = data.val();
}
function writeStock(x){

  if(x<= 0){
    x = 0;
  }
  else{
    x = x - 1;
  }
  database.ref('/').update({ 
    Food : x
  })
}

