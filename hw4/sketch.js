//##############################################################
//Created by: Adem Dugalic, International University of Sarajevo
//							Dec,2018
//##############################################################


//##############################################################
//For background sound							
//##############################################################
var sound;
function preload(){sound = loadSound("hw3/so.mp3");}
function setup(){
	noCanvas();
	if(!sound.isPlaying()){sound.loop();}
}
function mousePressed() { getAudioContext().resume() }
class Agent{
	constructor(x,y,num,speedX,speedY){
		this.x=x;
		this.y=y;
		this.r=10; 
		this.num=num;
		this.speedX=speedX;
		this.speedY=speedY;
	}
	move(){
		if (this.x>first.width-13||this.x<13){
			this.speedX = -1*this.speedX;
			this.r++;
		}
		this.x= this.x + this.speedX;

		if (this.y>first.height-13||this.y<13){
			this.speedY = -1*this.speedY;
			this.r++;
		}
		this.y= this.y + this.speedY;
	}
	show(){
		first.stroke(first.color(0, 0, 255));
		first.strokeWeight(4);
		first.fill('orange');
		first.ellipse(this.x, this.y, this.r*2, this.r*2);
	}
	intersects(obj){
		var d = first.dist(this.x,this.y,obj.x,obj.y);
		if(d<this.r+obj.r){
			return true;
		}else
			return false;
	}
}
class Ball{
	constructor(x,y,num,speedX,speedY){
		this.x=x;
		this.y=y;
		this.r=15; 
		this.num=num;
		this.speedX=speedX;
		this.speedY=speedY;
	}
	move(){
		if (this.x>first.width-13||this.x<13){
			this.speedX = -1*this.speedX;
			this.show();
		}
		this.x= this.x + this.speedX;

		if (this.y>first.height-13||this.y<13){
			this.speedY = -1*this.speedY;
			this.show();
		}
		this.y= this.y + this.speedY;
	}
	show(){
		third.stroke(third.color(0, 0, 150));
		third.strokeWeight(4);
		third.fill(third.color(third.random(0,255),third.random(0,255),third.random(0,255)));
		third.ellipse(this.x, this.y, this.r*2, this.r*2);
	}
	intersects(obj){
		var d = third.dist(this.x,this.y,obj.x,obj.y);
		if(d<this.r+obj.r){
			return true;
		}else
			return false;
	}
	dirx(){
		this.speedX = -1*this.speedX;
	}
	diry(){
		this.speedY = -1*this.speedY;
	}
}
var can1 = function(a){
	var agents = [];
	var removedAgents= [];
	var numOfAgents = 50;
	//##############################################################
	//Creating canvas setting its size and filling array with objects
	//#############################################################
	a.setup=function() {
		 a.createCanvas(480, 480);
	     for (var i=0;i<numOfAgents;i++){
	  	agents[i]= new Agent(a.random(0,a.width-17),a.random(0,a.height-17),a.random(0,1000),a.random(-5,5), a.random(-5,5));
	  }
	}
	//##############################################################
	//Main logic
	//##############################################################
	a.draw=function() {
		a.background(51);
    for (var j=0;j<agents.length;j++){
	  	a.textSize(20);
		a.text("In hall: "+agents.length,100,50);
		a.text("Gone back to dealer: "+removedAgents.length,100,100);
		agents[j].show();
		agents[j].move();
  		for (var x=0;x<agents.length;x++){
  			if(j<agents.length&&x<agents.length){
  				if(x!=j&&agents[x].intersects(agents[j])){
  					if(agents[j].num == agents[x].num){
	  					removedAgents.push(agents[j]);
	  					removedAgents.push(agents[x]);
	  					agents.splice(j, 1);
	  					agents.splice(x, 1);

  					}else if(agents[j].num > agents[x].num){
	  					removedAgents.push(agents[j]);
	  					agents.splice(j, 1);
	  				}else if(agents[j].num < agents[x].num) {
	  					removedAgents.push(agents[x]);
	  					agents.splice(x, 1);
  					}
  				}
  			}
		}
  		if (agents.length==1){
			agents.splice(0, 1);
			for(var l=0;l<removedAgents.length;l++){
				agents[l]=new Agent(a.random(0,a.width-17),a.random(0,a.height-17),a.random(0,1000),a.random(-5,5), a.random(-5,5));// i had additional array to temp sotore the objs that have been returned to give myself and option to reuse them if I had to
			}
			while(removedAgents.length > 0) {
				removedAgents.pop();
			}
		if (agents.length==0)
			{
				a.noLoop(); // function to end loop
				a.text("Thanks for being patient this long, thats it :D ",50,280);
				}	
			}
		}
	}
}
var can2 = function(b){
	let values = [];
	let i = 0;
	let j = 0;
	let temp=0;
	b.setup=function() {
	  b.createCanvas(480, 480);
	  values = new Array(b.width);
	  for (let i = 0; i < values.length; i++) {
	    values[i] = b.random(b.height);
	  }
	  i=0;
	}
	b.draw=function() {
	  b.background(51);
	  if(values[j]>values[j+1]){
	  	temp=values[j];
	  	values[j]=values[j+1];
	  	values[j+1]=temp;
	  }
	 if (i<values.length){
	 	j++;
	 	if(j>=values.length-1-i){
	 		j=0;
	 		i++;
	 	}
	 }else{
	 	b.nloop();
	 	}
	  for (let i = 0; i < values.length; i++) {
	    b.stroke(255);
	    b.line(i, b.height, i, b.height - values[i]);
	  	}
	}
}
var can3 = function(e){
	var balls = [];
	var numOfBalls = 30;
	//###############################################################
	//Creating canvas setting its size and filling array with objects
	//###############################################################
	e.setup=function() {
		 e.createCanvas(480, 480);
	     for (var i=0;i<numOfBalls;i++){
	  	balls[i]= new Ball(e.random(0,e.width-25),e.random(0,e.height-25),e.random(0,1000),e.random(-5,5), e.random(-5,5));
	  }
	}
	//##############################################################
	//Main logic
	//##############################################################
	e.draw=function() {
		e.background(51);
    for (var j=0;j<balls.length;j++){
		balls[j].show();
		balls[j].move();
  		for (var x=0;x<balls.length;x++){
  			if(j<balls.length&&x<balls.length){
  				if(x!=j&&balls[x].intersects(balls[j])){
  					balls[x].diry();
  					balls[x].dirx();
  					balls[j].diry();
  					balls[j].dirx();
  					}
				}	
			}
		}
	}
}
var can4 = function(t){
	t.setup=function(){
		t.createCanvas(480,480);
		t.background(51);
	}
	t.draw=function(){
		t.stroke(100);
		t.fill('cyan');
		t.ellipse(t.mouseX, t.mouseY, 25, 25);
	}
	t.mousePressed=function() {
	    t.clear();
	    t.setup();
	}
}
//##############################################################
//Different canvases (processes)
//##############################################################
var first = new p5(can1, 'd2');
var second = new p5(can2, 'd1');
var third = new p5(can3, 'd3');
var fourth = new p5(can4, 'd4');