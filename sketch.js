//Create variables here
var dog, happyDog, database;
var foods,foodStock,foodObj;
var  fedTime, lastFed;
var bedRoom,garden,washRoom

function preload()
{
  //load images here
  this.image=loadImage("images/dogImg.png");
  this.image=loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(500,500);
  
var firebase=database;

  dog=createSprite(100,200,20,20);
  dog=addImage(dogImg.png);

  happydog=createSprite(100,200,20,20);
  happydog=addImage(dogImg1.png);

  foodStock=database.ref("food");
   foodStock.on("value",readStock);

feed=createButton("Feed the dog");
feed.position(700,95);
feed.mousePresssed(feedDog);

addFood=createButton("Add Food");
addFood.position(800,95);
addFood.mousePresssed(addFood);

//read game state from database
readState=database.ref('gameState');
readState.on("value",function(data){
  gameState=data.val();
});

}


function draw() {  

  background(46, 139, 87);
if(dog.foods){
  this.loadimage("dogImg1.png");
}

fill(255,255,254);
textSize(15);
if(lastFed>=12){
  text("Last Feed : "+ lastFed%12 + "PM",350,30);
}else if(lastFed==0){
  text("Last Feed : 12 AM",350,30);
}else{
  text("Last Feed : "+ lastFed +"AM",350,30);
}

fedTime=database.ref('FeedTime');
fedTime.on("value",function(data){
  lastFed=data.val();
});

if(gameState!="Hungry"){
  feed.hide();
  addFood.hide();
  dog.remove();
}else{
  feed.show();
  addFood.show();
  dog.addImage(sadDog);
}

//function to update gameStates in database
function update(state){
   database.ref('/').update({
     gameState:state
   });
}

currentTime=hour();
if(currentTime==(lastFed+1)){
  update("playing");
  foodObj.garden();
}else if(currentTime==(lastFed+2)){
  update("sleeping");
  foodObj.bedroom();
}else if(currentTime>(lastFed+2)&& currentTime<=(lastFed+4)){
  update("bathing");
  foodObj.washroom();
}else{
  update("Hungry");
  foodObj.display();
}


function display(){
  var x=80,y=100;

  imageMode(CENTER);
  image(this.image,720,220,70,70);

  if(this.foodStock!=0){
    for(var i=0;i<this.foodStock;i++){
      if(i%10==0){
        x=80;
        y=y+50;
      }
      image(this.image,x,y,50,50);
      x=x+30;
    }
  }
}

 



 



//function to update foodStock and last fed time
function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  }) 

}
//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

  drawSprites();
  //add styles here


}

function keyPressed(){
  if(keyWentDown(UP_ARROW)){
    writeStock(foods);
    dog.addImage()
  }
}

//function to Read values from DB
function readStock(data){
  foods=data.val();
}

//function to write values DB
function writeStock(x){

  database.ref('/').update({
    Food:x
  })
}

//function to write values in DB
function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }
  database.ref('/').update({
  Food:x
  })
}