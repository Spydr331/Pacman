
 function pacObject(id, gX, gY){
	this.id = id;
	this.x=gX;
	this.y=gY;
	this.simpleX=Math.round(gX/g);
	this.simpleY=Math.round(gY/g);
	this.prev;
	this.current = "left";
	this.next = "";
	this.pacColor = "";
	this.squareColor = "";
	this.favX;
	this.favY;
	this.feelin = 'normal';
    this.timer = 0;
    this.speed = 1;
 }

 var freeze = 1;
 var _debug = false;
 var w = 28;
 var h = 31;
 var g = 20;
 var lvl;
 //padding around grid
 var p = 0;
 var score = 0;
 var total = 0;
 var lives = 3;
 var scoreBoard = document.getElementById("scorenumber");
 var livesBoard = document.getElementById("scorelives");
  
 var context;
 var context2;
 //Pacman
 var pacMan=new pacObject('user', 280, 470);
 pacMan.current = "left";
 pacMan.pacColor = "#fbf";
 pacMan.squareColor = "rgba(255, 255, 55, 0.5)";
 
 //Red Ghost
 var ghost1=new pacObject(1, 280, 230);
 ghost1.current = "left";
 ghost1.next = "left"
 ghost1.prev = "left"
 ghost1.favX = 1;
 ghost1.favY = -1;
 ghost1.pacColor = "#f00";
 ghost1.squareColor = "rgba(255, 155, 255, 0.5)";
 ghost1.timer = 650;
 
 var ghost2=new pacObject(2, 280, 230);
 ghost2.current = "left";
 ghost2.next = "left"
 ghost2.prev = "left"
 ghost2.favX = 1;
 ghost2.favY = 32;
 ghost2.pacColor = "#fb0";
 ghost2.squareColor = "rgba(255, 155, 55, 0.5)";
 ghost2.timer = 500;
 
 var ghost3=new pacObject(3, 280, 230);
 ghost3.current = "left";
 ghost3.next = "left"
 ghost3.prev = "left"
 ghost3.favX = 27;
 ghost3.favY = 32;
 ghost3.pacColor = "#0ff";
 ghost3.squareColor = "rgba(55, 255, 255, 0.5)";
 ghost3.timer = 350;
 
 var ghost4=new pacObject(4, 280, 230);
 ghost4.current = "left";
 ghost4.next = "left"
 ghost4.prev = "left"
 ghost4.favX = 27;
 ghost4.favY = -1;
 ghost4.pacColor = "#f00";
 ghost4.squareColor = "rgba(255, 55, 55, 0.5)";
 ghost4.timer = 200;
 
 var goingGhosts = [];
 
 var gameinterval;
 var paused = false;
 
 //Movement speed
 var dx = 2;
 var dy = 2;

 //size of canvas
 var cw = g*w + (p*2);
 var ch = g*h + (p*2);
 
 function addGhost() {
     /*
    switch (goingGhosts.length) {
        case 0:
            goingGhosts.push(ghost4);
            break;
        case 1:
            goingGhosts.push(ghost3);
            break;
        case 2:
            goingGhosts.push(ghost2);
            break;
        case 3:
            goingGhosts.push(ghost1);
            break;
    }
    */
}
 
 function feelingGhost(feelin){
    for(var i = 0; i < goingGhosts.length; i++){
        if(feelin === 'scared'){
            if(goingGhosts[i].feelin != 'scared'){
                switch(goingGhosts[i].current){
                    case 'up':
                        goingGhosts[i].current = goingGhosts[i].prev = goingGhosts[i].next = 'down';
                        break;
                    case 'left':
                        goingGhosts[i].current = goingGhosts[i].prev = goingGhosts[i].next = 'right';
                        break;
                    case 'down':
                        goingGhosts[i].current = goingGhosts[i].prev = goingGhosts[i].next = 'up';
                        break;
                    case 'right':
                        goingGhosts[i].current = goingGhosts[i].prev = goingGhosts[i].next = 'left';
                        break;
                }
            }
            goingGhosts[i].feelin = feelin;
            goingGhosts[i].speed = feelin == 'scared' ? .5 : 1
        } else {
            goingGhosts[i].feelin = feelin;
        }
    }
 }
	
 function drawboard(){
  //grid width and height
	pelet= [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0],
			[0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0],
			[0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0],
			[0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0],
			[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
			[0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0],
			[0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0],
			[0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0],
			[0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
			[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
			[0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0],
			[0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0],
			[0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0],
			[0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0],
			[0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0],
			[0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0],
			[0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
			[0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
			[0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]
  
	lvl =  [[8, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 8, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5],
			[4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4],
			[4, 1, 8, 3, 3, 5, 1, 8, 3, 3, 3, 5, 1, 4, 4, 1, 8, 3, 3, 3, 5, 1, 8, 3, 3, 5, 1, 4],
			[4, 1, 4, 1, 1, 4, 1, 4, 1, 1, 1, 4, 1, 4, 4, 1, 4, 1, 1, 1, 4, 1, 4, 1, 1, 4, 1, 4],
			[4, 1, 7, 3, 3, 6, 1, 7, 3, 3, 3, 6, 1, 7, 6, 1, 7, 3, 3, 3, 6, 1, 7, 3, 3, 6, 1, 4],
			[4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4],
			[4, 1, 8, 3, 3, 5, 1, 8, 5, 1, 8, 3, 3, 3, 3, 3, 3, 5, 1, 8, 5, 1, 8, 3, 3, 5, 1, 4],
			[4, 1, 7, 3, 3, 6, 1, 4, 4, 1, 7, 3, 3, 5, 8, 3, 3, 6, 1, 4, 4, 1, 7, 3, 3, 6, 1, 4],
			[4, 1, 1, 1, 1, 1, 1, 4, 4, 1, 1, 1, 1, 4, 4, 1, 1, 1, 1, 4, 4, 1, 1, 1, 1, 1, 1, 4],
			[7, 3, 3, 3, 3, 5, 1, 4, 7, 3, 3, 5, 1, 4, 4, 1, 8, 3, 3, 6, 4, 1, 8, 3, 3, 3, 3, 6],
			[1, 1, 1, 1, 1, 4, 1, 4, 8, 3, 3, 6, 1, 7, 6, 1, 7, 3, 3, 5, 4, 1, 4, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 4, 1, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 4, 1, 4, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 4, 1, 4, 4, 1, 18, 12, 12, 9, 9, 12, 12, 15, 1, 4, 4, 1, 4, 1, 1, 1, 1, 1],
			[3, 3, 3, 3, 3, 6, 1, 7, 6, 1, 14, 1, 1, 1, 1, 1, 1, 11, 1, 7, 6, 1, 7, 3, 3, 3, 3, 3],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 14, 1, 1, 1, 1, 1, 1, 11, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[3, 3, 3, 3, 3, 5, 1, 8, 5, 1, 14, 1, 1, 1, 1, 1, 1, 11, 1, 8, 5, 1, 8, 3, 3, 3, 3, 3],
			[1, 1, 1, 1, 1, 4, 1, 4, 4, 1, 17, 13, 13, 13, 13, 13, 13, 16, 1, 4, 4, 1, 4, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 4, 1, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 4, 1, 4, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 4, 1, 4, 4, 1, 8, 3, 3, 3, 3, 3, 3, 5, 1, 4, 4, 1, 4, 1, 1, 1, 1, 1],
			[8, 3, 3, 3, 3, 6, 1, 7, 6, 1, 7, 3, 3, 5, 8, 3, 3, 6, 1, 7, 6, 1, 7, 3, 3, 3, 3, 5],
			[4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4],
			[4, 1, 8, 3, 3, 5, 1, 8, 3, 3, 3, 5, 1, 4, 4, 1, 8, 3, 3, 3, 5, 1, 8, 3, 3, 5, 1, 4],
			[4, 1, 7, 3, 5, 4, 1, 7, 3, 3, 3, 6, 1, 7, 6, 1, 7, 3, 3, 3, 6, 1, 4, 8, 3, 6, 1, 4],
			[4, 1, 1, 1, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 4, 1, 1, 1, 4],
			[7, 3, 5, 1, 4, 4, 1, 8, 5, 1, 8, 3, 3, 3, 3, 3, 3, 5, 1, 8, 5, 1, 4, 4, 1, 8, 3, 6],
			[8, 3, 6, 1, 7, 6, 1, 4, 4, 1, 7, 3, 3, 5, 8, 3, 3, 6, 1, 4, 4, 1, 7, 6, 1, 7, 3, 5],
			[4, 1, 1, 1, 1, 1, 1, 4, 4, 1, 1, 1, 1, 4, 4, 1, 1, 1, 1, 4, 4, 1, 1, 1, 1, 1, 1, 4],
			[4, 1, 8, 3, 3, 3, 3, 6, 7, 3, 3, 5, 1, 4, 4, 1, 8, 3, 3, 6, 7, 3, 3, 3, 3, 5, 1, 4],
			[4, 1, 7, 3, 3, 3, 3, 3, 3, 3, 3, 6, 1, 7, 6, 1, 7, 3, 3, 3, 3, 3, 3, 3, 3, 6, 1, 4],
			[4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4],
			[7, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 6]];
  
	ghostPoints =[[2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
				  [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
				  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				  [0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0],
				  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				  [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
				  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				  [3, 3, 3, 3, 3, 3, 1, 0, 0, 1, 0, 2, 2, 2, 2, 2, 2, 0, 1, 0, 0, 1, 3, 3, 3, 3, 3, 3],
				  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				  [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				  [0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0],
				  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				  [0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0],
				  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				  [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
				  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2]];
	for(var y = 0; y < h; y += 1)
	{
		for (var x = 0; x < w; x += 1) 
		{
			var tempdiv = document.createElement('div');
			tempdiv.style.top=y*g + "px";
			tempdiv.style.left=x*g + "px";
			if(lvl[y][x] != 1)
				tempdiv.className = "blue" + lvl[y][x]; 
			else
				tempdiv.className = "black"; 
			document.getElementById("divboardcontainer").appendChild(tempdiv);
		}
	}	
  }

 function checkTimers() {
    if(ghost1.timer > 0){
        if(ghost1.timer == 1)
            goingGhosts.push(ghost1);
        ghost1.timer -= 1 * freeze;
    }
    if(ghost2.timer > 0){
        if(ghost2.timer == 1)
            goingGhosts.push(ghost2);
        ghost2.timer -= 1 * freeze;
    }
    if(ghost3.timer > 0){
        if(ghost3.timer == 1)
            goingGhosts.push(ghost3);
        ghost3.timer -= 1 * freeze;
    }
    if(ghost4.timer > 0){
        if(ghost4.timer == 1)
            goingGhosts.push(ghost4);
        ghost4.timer -= 1 * freeze;
    }
}
 
 function gameLoop(){
	movePac();
	
	context.clearRect(0, 0, cw, ch);
	context.fillStyle = pacMan.pacColor;
	context.beginPath();
	context.arc(pacMan.x, pacMan.y, 2, 0, Math.PI*2, true);
	context.closePath();
	context.fill(); 
	
	for (var ghstX in goingGhosts) {
	    var ghst = goingGhosts[ghstX];
		moveGhost(ghst);
		if(ghst.feelin == "scared")
			context.fillStyle = "#fff";
		else
			context.fillStyle = ghst.pacColor;
		context.beginPath();
		context.arc(ghst.x, ghst.y, 2, 0, Math.PI*2, true);
		context.closePath();
		context.fill(); 
	}
	checkTimers();
	drawCurrentSquare();
 }
 
 function init() {
    $("#scoreboard").css({'width': cw, 'margin': '0 auto'});
	$("#layer1").attr({width: cw, height: ch});
	$("#layer2").attr({width: cw, height: ch});
	$("#layer3").attr({width: cw, height: ch});
	$("#divboardcontainer").css({width: cw+"px", height: ch+"px"});
	context = $("#layer1").get(0).getContext("2d");
	context2 = $("#layer2").get(0).getContext("2d");
	contextdebug = $("#layer3").get(0).getContext("2d");
	window.addEventListener('keydown',doKeyDown,true);
	drawPellets();
	gameinterval = setInterval(gameLoop, 1000/60);
     
    scoreBoard.innerHTML = score;
    livesBoard.innerHTML = lives;
     
    getPelletsTotal();
 }
 
 function drawCurrentSquare(){
	context.fillStyle = pacMan.squareColor;
	context.beginPath();
	context.fillRect(Math.round((pacMan.x-10)/g)*g,Math.round((pacMan.y-10)/g)*g,g,g);
	context.fill();
	
	for (var ghstX in goingGhosts) {
	    var ghst = goingGhosts[ghstX];
		if (ghst.feelin == "scared")
			context.fillStyle = "rgba(55, 55, 255, 0.5)";
		else
			context.fillStyle = ghst.squareColor;
		context.beginPath();
		context.fillRect(Math.round((ghst.x-10)/g)*g,Math.round((ghst.y-10)/g)*g,g,g);
		context.fill();
	}
 }
 
 function drawPellets(){
	context2.clearRect(0, 0, cw, ch);
	for(var y = 0; y < h; y += 1)
	{
		for (var x = 0; x < w; x += 1) 
		{
			if(pelet[y][x] > 0)
			{
				context2.fillStyle = "#fff";
				context2.beginPath();
				context2.arc(x*g+10, y*g+10, 2*pelet[y][x], 0, Math.PI*2, true);
				context2.closePath();
				context2.fill(); 
			}
		}
	}
 }

 function getPelletsTotal() {
     
	for(var y = 0; y < h; y += 1)
	{
		for (var x = 0; x < w; x += 1) 
		{
            if(pelet[y][x] == 1)
                total += 1;
        }
    }
 }
 
 function moveGhost(ghostitem){
	if(((Math.round(ghostitem.x-10)%20)+(Math.round(ghostitem.y-10)%20)) == 0 )
	{
		ghostitem.prev = ghostitem.current;
		
		ghostitem.simpleX = Math.round(ghostitem.x/g);
		ghostitem.simpleY = Math.round(ghostitem.y/g);
		
		ghostMoveCur(ghostitem);
	}
	else
	{
		if(ghostitem.next != "")
			pacPerpetual(ghostitem);
	}	
 }
 
 function ghostMoveCur(ghostitem){
	if(ghostPoints[(ghostitem.simpleY-1)][(ghostitem.simpleX-1)] == 1)
		smartGhost(ghostitem);
	
	switch (ghostitem.next) {
		case "up":
			if (ghostitem.y - dy > 0 && lvl[(ghostitem.simpleY-2)][(ghostitem.simpleX-1)] == 1){
				ghostitem.y -= dy;
				ghostitem.current = ghostitem.next;
			}
			else{
				ghostNext(ghostitem);
				pacMoveCur(ghostitem);
			}
		break;
		case "left":
			if (ghostitem.x - dx > 0 && lvl[(ghostitem.simpleY-1)][(ghostitem.simpleX-2)] == 1){
				ghostitem.x -= dx;
				ghostitem.current = ghostitem.next;
			}
			else if(lvl[(ghostitem.simpleY-1)][(ghostitem.simpleX-2)] == undefined)
				pacPort(0, ghostitem);
			else{
				ghostNext(ghostitem);
				pacMoveCur(ghostitem);
			}
		break;
		case "down":
			if (ghostitem.y + dy < ch && lvl[(ghostitem.simpleY)][(ghostitem.simpleX-1)] == 1){
				ghostitem.y += dy;
				ghostitem.current = ghostitem.next;
			}
			else{
				ghostNext(ghostitem);
				pacMoveCur(ghostitem);
			}
		break;
		case "right":
			if (ghostitem.x + dx < cw && lvl[(ghostitem.simpleY-1)][(ghostitem.simpleX)] == 1){
				ghostitem.x += dx;
				ghostitem.current = ghostitem.next;
			}
			else if(lvl[(ghostitem.simpleY-1)][(ghostitem.simpleX)] == undefined)
				pacPort(1, ghostitem);
			else{
				ghostNext(ghostitem);
				pacMoveCur(ghostitem);
			}
		break;
	}
 }
  
 function smartGhost(ghostitem){
	var followup = 0;
	var followleft = 0;
	var followdown = 0;
	var followright = 0;
	var nextdir;
	
	/*Can go down, right, up, left depending on the direction you are going and the board*/
	if(ghostitem.current == "down" || lvl[(ghostitem.simpleY-2)][(ghostitem.simpleX-1)] != 1)
		followup = -1;
	if(ghostitem.current == "right" || lvl[(ghostitem.simpleY-1)][(ghostitem.simpleX-2)] != 1)
		followleft = -1;
	if(ghostitem.current == "up" || lvl[ghostitem.simpleY][(ghostitem.simpleX-1)] != 1)
		followdown = -1;
	if(ghostitem.current == "left" || lvl[(ghostitem.simpleY-1)][ghostitem.simpleX] != 1)
		followright = -1;	
		
	if(ghostitem.feelin == 'normal')
		boredGhost(ghostitem, followup, followleft, followdown, followright);
	else if(ghostitem.feelin == 'scared')
		scaredGhost(ghostitem, followup, followleft, followdown, followright);
	else if(ghostitem.feelin == 'mad')
	{
		switch(ghostitem.id){
		case 1: 
			findPacandForget(ghostitem, followup, followleft, followdown, followright, pacMan);
			break;
		case 2: 
			findpacItem(ghostitem, followup, followleft, followdown, followright, ghost4);
			break;
		case 3: 
			findPacman4Forward(ghostitem, followup, followleft, followdown, followright);
			break;
		case 4: 
			findpacItem(ghostitem, followup, followleft, followdown, followright, pacMan);
			break;
		}
	}
	else	
		boredGhost(ghostitem, followup, followleft, followdown, followright);
 }
 
 function smartGhostTest(ghostitem){
	document.getElementById("debug").value = ghostitem.current + "\nUP: " + 
		(lvl[(ghostitem.simpleY-2)][(ghostitem.simpleX-1)] != 1) + "\nLEFT: " + 
		(lvl[(ghostitem.simpleY-1)][(ghostitem.simpleX-2)] != 1) + "\nDOWN: " + 
		(lvl[ghostitem.simpleY][(ghostitem.simpleX-1)] != 1) + "\nRIGHT: " + 
		(lvl[(ghostitem.simpleY-1)][ghostitem.simpleX] != 1);
 }
 
 function scaredGhost(ghostitem, followup, followleft, followdown, followright){
	var nextdir;
	var directionsGhost = new Array();
	
	if(followup >= 0)
		directionsGhost.push("up");
	if(followright >= 0)
		directionsGhost.push("right");
	if(followdown >= 0)
		directionsGhost.push("down");
	if(followleft >= 0)
		directionsGhost.push("left");
	
	var randomnumber = (Math.floor(Math.random()*(directionsGhost.length + 1)))-1;
	
	ghostitem.next = directionsGhost[randomnumber];
 }
 
 function boredGhost(ghostitem, followup, followleft, followdown, followright){
	var nextdist = 100;
	var nextdir;
		
	drawPellets();
	
	if(followup >= 0)
	{
		if(nextdist > lineDistancefav((ghostitem.simpleX-1),(ghostitem.simpleY-2), ghostitem))
		{
			nextdist = lineDistancefav((ghostitem.simpleX-1),(ghostitem.simpleY-2), ghostitem);
			nextdir = "up";
		}
	}
	if(followright >= 0)
	{
		if(nextdist > lineDistancefav(ghostitem.simpleX,(ghostitem.simpleY-1), ghostitem))
		{
			nextdist = lineDistancefav(ghostitem.simpleX,(ghostitem.simpleY-1), ghostitem);
			nextdir = "right";
		}
	}
	if(followdown >= 0)
	{
		if(nextdist > lineDistancefav((ghostitem.simpleX-1),ghostitem.simpleY, ghostitem))
		{
			nextdist = lineDistancefav((ghostitem.simpleX-1),ghostitem.simpleY, ghostitem);
			nextdir = "down";
		}
	}
	if(followleft >= 0)
	{
		if(nextdist > lineDistancefav((ghostitem.simpleX-2),(ghostitem.simpleY-1), ghostitem))
		{
			nextdist = lineDistancefav((ghostitem.simpleX-2),(ghostitem.simpleY-1), ghostitem);
			nextdir = "left";
		}
	}
	
	ghostitem.next = nextdir;
 }
 
 function findpacItem(chaserghostitem, followup, followleft, followdown, followright, chasedPacitem){
	var nextdist = 100;
	if(followup >= 0)
	{
		if(nextdist > lineDistance((chaserghostitem.simpleX-1),(chaserghostitem.simpleY-2), chasedPacitem, chaserghostitem))
		{
			nextdist = lineDistance((chaserghostitem.simpleX-1),(chaserghostitem.simpleY-2), chasedPacitem, chaserghostitem);
			nextdir = "up";
		}
	}
	if(followright >= 0)
	{
		if(nextdist > lineDistance(chaserghostitem.simpleX,(chaserghostitem.simpleY-1), chasedPacitem, chaserghostitem))
		{
			nextdist = lineDistance(chaserghostitem.simpleX,(chaserghostitem.simpleY-1), chasedPacitem, chaserghostitem);
			nextdir = "right";
		}
	}
	if(followdown >= 0)
	{
		if(nextdist > lineDistance((chaserghostitem.simpleX-1),chaserghostitem.simpleY, chasedPacitem, chaserghostitem))
		{
			nextdist = lineDistance((chaserghostitem.simpleX-1),chaserghostitem.simpleY, chasedPacitem, chaserghostitem);
			nextdir = "down";
		}
	}
	if(followleft >= 0)
	{
		if(nextdist > lineDistance((chaserghostitem.simpleX-2),(chaserghostitem.simpleY-1), chasedPacitem, chaserghostitem))
		{
			nextdist = lineDistance((chaserghostitem.simpleX-2),(chaserghostitem.simpleY-1), chasedPacitem, chaserghostitem);
			nextdir = "left";
		}
	}
	
	chaserghostitem.next = nextdir;
 }
 
 function findPacman4Forward(ghostitem, followup, followleft, followdown, followright) {
	var nextdist = 100;
	
	var pacCopy = new pacObject(-1, pacMan.x, pacMan.y);
	
	if(pacMan.current == "up")
		pacCopy.simpleY -= 4;
	else if(pacMan.current == "left")
		pacCopy.simpleX -= 4;
	else if(pacMan.current == "down")
		pacCopy.simpleY += 4;
	else if(pacMan.current == "right")
		pacCopy.simpleX += 4;
		
	if(followup >= 0)
	{
		if(nextdist > lineDistance((ghostitem.simpleX-1),(ghostitem.simpleY-2), pacCopy, ghostitem))
		{
			nextdist = lineDistance((ghostitem.simpleX-1),(ghostitem.simpleY-2), pacCopy, ghostitem);
			nextdir = "up";
		}
	}
	if(followright >= 0)
	{
		if(nextdist > lineDistance(ghostitem.simpleX,(ghostitem.simpleY-1), pacCopy, ghostitem))
		{
			nextdist = lineDistance(ghostitem.simpleX,(ghostitem.simpleY-1), pacCopy, ghostitem);
			nextdir = "right";
		}
	}
	if(followdown >= 0)
	{
		if(nextdist > lineDistance((ghostitem.simpleX-1),ghostitem.simpleY, pacCopy, ghostitem))
		{
			nextdist = lineDistance((ghostitem.simpleX-1),ghostitem.simpleY, pacCopy, ghostitem);
			nextdir = "down";
		}
	}
	if(followleft >= 0)
	{
		if(nextdist > lineDistance((ghostitem.simpleX-2),(ghostitem.simpleY-1), pacCopy, ghostitem))
		{
			nextdist = lineDistance((ghostitem.simpleX-2),(ghostitem.simpleY-1), pacCopy, ghostitem);
			nextdir = "left";
		}
	}
	
	ghostitem.next = nextdir;
 }
 
 function findPacandForget(chaserghostitem, followup, followleft, followdown, followright, chasedPacitem){
	var distance = lineDistance( chaserghostitem.simpleX, chaserghostitem.simpleY, chasedPacitem, chaserghostitem );
	if(distance > 8)
		findpacItem(chaserghostitem, followup, followleft, followdown, followright, chasedPacitem);
	else
		boredGhost(chaserghostitem, followup, followleft, followdown, followright);
 }
 
 function ghostNext(ghostitem) {
     //Ghost does not double back, so use that to make sure the next direction is correct
	if(ghostitem.prev != "down" && lvl[(ghostitem.simpleY-2)][(ghostitem.simpleX-1)] == 1)
		ghostitem.next = "up";
	else if(ghostitem.prev != "left" && lvl[(ghostitem.simpleY-1)][ghostitem.simpleX] == 1)
		ghostitem.next = "right";
	else if(ghostitem.prev != "up" && lvl[ghostitem.simpleY][(ghostitem.simpleX-1)] == 1)
		ghostitem.next = "down";
	else if(ghostitem.prev != "right" && lvl[(ghostitem.simpleY-1)][(ghostitem.simpleX-2)] == 1)
		ghostitem.next = "left";
    }

 function killGhost(ghostitem, i){
    ghostitem.timer = 500;
	ghostitem.x=280;
	ghostitem.y=230;
	ghostitem.simpleX=Math.round(280/g);
	ghostitem.simpleY=Math.round(470/g);
    goingGhosts.splice(i, 1);
    ghostitem.feelin = 'normal'; 
    ghostitem.speed = 1;
    ghostitem.current = "left";
    ghostitem.next = "left"
    ghostitem.prev = "left"
 }
 
 function movePac(){
    for(var i = 0; i < goingGhosts.length; i++){
        if(goingGhosts[i].simpleX == pacMan.simpleX && goingGhosts[i].simpleY == pacMan.simpleY){
            if(goingGhosts[i].feelin == 'scared'){
                killGhost(goingGhosts[i], i);
            } else {
                freeze = 0;
            }
        }
    }
     
	if(((Math.round(pacMan.x-10)%20)+(Math.round(pacMan.y-10)%20)) == 0 )
	{
		pacMan.simpleX = Math.round(pacMan.x/g);
		pacMan.simpleY = Math.round(pacMan.y/g);
	
        switch(pelet[(Math.round(pacMan.y/g)-1)][(Math.round(pacMan.x/g)-1)]){
            case 1:
                score += 10;
                scoreBoard.innerHTML = score;
                total -= 1;

                if(total <= 0){
                    pause();
                }
                break;
            case 2:
			    feelingGhost('scared');
                break;
        }
        
        pelet[(Math.round(pacMan.y/g)-1)][(Math.round(pacMan.x/g)-1)] = 0;
        
		drawPellets();
		
		switch (pacMan.next) {
			case "up":
				if (pacMan.y - dy > 0 && lvl[(pacMan.simpleY-2)][(pacMan.simpleX-1)] == 1){
					pacMan.y -= dy;
					pacMan.current = pacMan.next;
				}
				else
					pacMoveCur(pacMan);
			break;
			case "down":
				if (pacMan.y + dy < ch && lvl[(pacMan.simpleY)][(pacMan.simpleX-1)] == 1){
					pacMan.y += dy;
					pacMan.current = pacMan.next;
				}
				else
					pacMoveCur(pacMan);
			break;
			case "left":
				if (pacMan.x - dx > 0 && lvl[(pacMan.simpleY-1)][(pacMan.simpleX-2)] == 1){
					pacMan.x -= dx;
					pacMan.current = pacMan.next;
				}
				else
					pacMoveCur(pacMan);
			break;
			case "right":
				if (pacMan.x + dx < cw && lvl[(pacMan.simpleY-1)][(pacMan.simpleX)] == 1){
					pacMan.x += dx;
					pacMan.current = pacMan.next;
				}
				else
					pacMoveCur(pacMan);
			break;
		}
	}
	else
	{
		if(pacMan.next != "")
			pacPerpetual(pacMan);
	}
	/*
	if(((Math.round(pacMan.x-10)%20)+(Math.round(pacMan.y-10)%20)) == 0 )
	{
		
		 document.getElementById("debug").value ="Can only Travel if 1 | NEXT: " + pacMan.next + " | PREV: " + pacMan.current +
												 "\ngoU:" + lvl[(Math.round(pacMan.y/g)-2)][(Math.round(pacMan.x/g)-1)] +
												 "\ngoR:" + lvl[(Math.round(pacMan.y/g)-1)][(Math.round(pacMan.x/g))] +
												 "\ngoD:" + lvl[(Math.round(pacMan.y/g))][(Math.round(pacMan.x/g)-1)] +
												 "\ngoL:" + lvl[(Math.round(pacMan.y/g)-1)][(Math.round(pacMan.x/g)-2)];
	}
	else
	{
		document.getElementById("debug").value = Math.round(pacMan.x-10)%20 + " " + Math.round(pacMan.y-10)%20;
	}
	*/
 }
 
 function pacMoveCur(pacmanItem){ 
	switch (pacmanItem.current) {
		case "up":
			if (pacmanItem.y - dy > 0 && lvl[(pacmanItem.simpleY-2)][(pacmanItem.simpleX-1)] == 1)
				pacmanItem.y -= dy;
		break;
		case "down":
			if (pacmanItem.y + dy < ch && lvl[(pacmanItem.simpleY)][(pacmanItem.simpleX-1)] == 1)
				pacmanItem.y += dy;
		break;
		case "left":
			if (pacmanItem.x - dx > 0 && lvl[(pacmanItem.simpleY-1)][(pacmanItem.simpleX-2)] == 1)
				pacmanItem.x -= dx;
			else if(lvl[(pacmanItem.simpleY-1)][(pacmanItem.simpleX-2)] == undefined)
				pacPort(0, pacmanItem);
		break;
		case "right":
			if (pacmanItem.x + dx < cw && lvl[(pacmanItem.simpleY-1)][(pacmanItem.simpleX)] == 1)
				pacmanItem.x += dx;
			else if(lvl[(pacmanItem.simpleY-1)][(pacmanItem.simpleX)] == undefined)
				pacPort(1, pacmanItem);
		break;		
	}
 }
 
 function pacPort(direction, pacmanItem){
	if(direction == 0)
		pacmanItem.x = 560;
	else
		pacmanItem.x = 0;
 }
 
 function pacPerpetual(pacmanItem){
	switch (pacmanItem.current) {
		case "up":
			if (pacmanItem.next == "down"){
				pacmanItem.y += dy * pacmanItem.speed * freeze;
			}
			else
				pacmanItem.y -= dy * pacmanItem.speed * freeze;
		break;
		case "down":
			if (pacmanItem.next == "up"){
				pacmanItem.y -= dy * pacmanItem.speed * freeze;
			}
			else
				pacmanItem.y += dy * pacmanItem.speed * freeze;
		break;
		case "left":
			if (pacmanItem.next == "right"){
				pacmanItem.x += dx * pacmanItem.speed * freeze;
			}
			else
				pacmanItem.x -= dx * pacmanItem.speed * freeze;
		break;
		case "right":
			if (pacmanItem.next == "left"){
				pacmanItem.x -= dx * pacmanItem.speed * freeze;
			}
			else
				pacmanItem.x += dx * pacmanItem.speed * freeze;
		break;		
	}
 }
 
 function doKeyDown(evt){
    evt.preventDefault();
	switch (evt.keyCode) {
		case 38:
			pacMan.next = "up";
		break;
		case 40:
			pacMan.next = "down";
		break;
		case 37:
			pacMan.next = "left";
		break;
		case 39:
			pacMan.next = "right";
		break;
		case 71:
			addGhost();
		break;
		case 67:
			feelingGhost('mad');
		break;
		case 70:
			feelingGhost('scared');
		break;
		case 78:
			feelingGhost('normal');
		break;
		case 80:
			pause();
		break;		
	}
 }
 
 function pause(){
	if(paused)
		gameinterval = setInterval(gameLoop, 1000/60);
	else
		clearInterval(gameinterval);
	paused = !paused;
 }
 
 function lineDistance( ghostitemX, ghostitemY, pacmanitem, ghostitem ){
  var xs = 0;
  var ys = 0;
 
  xs = pacmanitem.simpleX - ghostitemX;
  xs = xs * xs;
 
  ys = pacmanitem.simpleY - ghostitemY;
  ys = ys * ys;
  
  if(_debug){
	  contextdebug.strokeStyle = ghostitem.squareColor;
	  contextdebug.lineWidth = 2;
	  contextdebug.beginPath();
	  contextdebug.moveTo(ghostitemX*g+10, ghostitemY*g+10); // give the (x,y) coordinates
	  contextdebug.lineTo(pacmanitem.simpleX*g, pacmanitem.simpleY*g-10);
	  contextdebug.stroke();
	  contextdebug.closePath();
  }
  
  return Math.round(Math.sqrt( xs + ys ) * 100) / 100;
}

 function lineDistancefav( ghostitemX, ghostitemY, ghostitem ){
  var xs = 0;
  var ys = 0;
 
  xs = ghostitemX - ghostitem.favX;
  xs = xs * xs;
 
  ys = ghostitemY - ghostitem.favY;
  ys = ys * ys;
  
  if(_debug){
	  contextdebug.strokeStyle = ghostitem.pacColor;
	  contextdebug.lineWidth = 2;
	  contextdebug.beginPath();
	  contextdebug.moveTo(ghostitemX*g+10, ghostitemY*g+10); // give the (x,y) coordinates
	  contextdebug.lineTo(ghostitem.favX*g, ghostitem.favY*g);
	  contextdebug.stroke();
	  contextdebug.closePath();
  }
  
  return Math.round(Math.sqrt( xs + ys ) * 100) / 100;
}

 function clearDebug(){
	contextdebug.clearRect(0, 0, cw, ch);
}

$(document).ready(function(e){
	drawboard();
	init();
	
	$("#debug").change(function(e){
		_debug = $(this).is(":checked");
		if(!_debug)
			clearDebug();
	});
});