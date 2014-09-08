//Variables
var ship;
var shipX = 400;
var shipY = 600;
var shipSpeed = 2.5;
var vx = vy = shipSpeed;
var bullet;
var bullet_array = new Array();
var bulletSpeed = 5;
var bulletVy = bulletSpeed;
var left = false;
var right = false;
var up = false;
var down = false;
var fire = false;
var isLoaded = true;

//Player Score
var internalScore = 0;
var playerScore = 0;

//Set to change when ending scene occurs
var maxScore = 35;

var enemy_array = new Array(); //Array of enemies

//Starting enemy position
var enemyX = 0;
var enemyY = 0;

//Enemy spawn variable
var counter = 500;

//Enemy index (0 position is filled by default)
var index = 0;

//Speed of enemy movement
var enemySpeed = 2.5;

//Direction enemy will travel (1 for right, -1 for left)
var direction = 1;

//Array for holding enemy bullets
var enemy_bullet = new Array();

var enemyWidth = 60;
var enemyHeight = 82;

var cruiserWidth = 32;
var cruiserHeight = 85;

var carrierWidth = 52;
var carrierHeight = 82;

var bulletWidth = 12;
var bulletHeight = 12;

var explosions = []; //Array of explosions
var explosionImg = new Image(); //Explosion image
explosionImg.src = "images/explosion.png"; //Explosion source

//Ending Scene Variables
var endScene = false;
var planet;
var blast;
var vBlastLaunched = false;
var planetDestruction = false;
var explosionTimeOut = 0;

//Special Enemy Carrier Variables
var carrier_array = new Array();
var carrier_counter = 0;
var carrier_index = 0;

//Special Enemy2 Variables
var cruiser_array = new Array();
var cruiser_counter = 0;
var cruiser_index = 0;

//Max number of enemies
var maxRegular = 4;
var maxCarrier = 3;
var maxCruiser = 1;

//Onload Function (Begin Game)
function canvasVengeanceShooter() {
	canvas = document.getElementById("canvas");
	
	if (canvas.getContext) {
          // Specify 2d canvas type.
          ctx = canvas.getContext("2d");
		  movingBackground(); //moving background
		  ship = new Ship(shipX, shipY); //create ship
          
          setInterval(loop, 10); //loop interval-call, every 10 ms
          setInterval(bulletLoaded, 350); //bullet-reload interval
          window.addEventListener('keydown', onKeyDown, true); //add listener
          window.addEventListener('keyup', onKeyUp, true); //add listener
		}
}
		 
	function movingBackground() {
	var cssBGImage=new Image();
    cssBGImage.src="images/background.png";

	window.cssMaxHeight=cssBGImage.height;
	window.cssYPos=0;
	setInterval("MoveBackGround()",05);
	}

	function MoveBackGround () {
	window.cssYPos=window.cssYPos+1;
	if (window.cssYPos>=window.cssMaxHeight) {
		window.cssYPos=0;
		}
	toMove=document.getElementById("canvas");
	toMove.style.backgroundPosition="0px  " + window.cssYPos + "px";
	}
	
	//ship function
    function Ship(shipX, shipY){
        var shipImg = new Image();
        shipImg.src = "images/spaceship.png";
        this.x = shipX;
        this.y = shipY;
        return shipImg;
    }
    
    //Enemy object
     function Enemy(enemyX, enemyY)
    {
        var enemy = new Image();
        enemy.src = "images/destroyer_0.png";
        this.x = enemyX;
        this.y = enemyY;
        this.direction = -1;
        this.firespeed = 2.5;
        this.recharge = 0;
        
        this.update = function()
        {
             if (this.x >= $(canvas).width() - enemy.width )
            {
                this.direction = -1;
            }
            else if (this.x <= 0)
            {
                this.direction = 1;
            }
            
            //Add speed to position based on current direction
            this.x += enemySpeed * this.direction;
            
            if( this.y < 0)
            {
            this.y += enemySpeed;
            }
            ctx.drawImage(enemy, this.x, this.y);
        }

    }
    
    function Carrier(x, y)
    {
        var carrier = new Image();
        carrier.src = "images/carrier0.png";
        this.x = x;
        this.y = y;
        this.direction = -1;
        this.firespeed = 2.5;
        this.recharge = 0;
        this.health = 3;
        
        this.updateCarrier = function()
        {
            if (this.x >= $(canvas).width() - carrier.width )
            {
                this.direction = -1;
            }
            else if (this.x <= 0)
            {
                this.direction = 1;
            }
            
            //Add speed to position based on current direction
            this.x += (enemySpeed - 1) * this.direction;
            
            if( this.y < 100)
            {
            this.y += enemySpeed;
            }
            
            ctx.drawImage(carrier, this.x, this.y);
        }
    }
    
    function Cruiser(x, y)
    {
        var cruiser = new Image();
        cruiser.src = "images/cruiser0.png";
        this.x = x;
        this.y = y;
        this.direction = -1;
        this.firespeed = 1.5;
        this.recharge = 0;
        this.health = 2;
        
        this.updateCruiser = function()
        {
            if (this.x >= $(canvas).width() - cruiser.width )
            {
                this.direction = -1;
            }
            else if (this.x <= 0)
            {
                this.direction = 1;
            }
            
            //Add speed to position based on current direction
            this.x += (enemySpeed + 1) * this.direction;
            
            if( this.y < 0)
            {
            this.y += enemySpeed;
            }
            
            ctx.drawImage(cruiser, this.x, this.y);
        }
    }
 
    //bullet function
    function Bullet(xPos, yPos) {
        var bulletImg = new Image();
        bulletImg.src = "images/bullet.png";
        var eBulletImg = new Image();
        eBulletImg.src = "images/bullet2.png";
        this.x = xPos;
        this.y = yPos;
 
    //function for updating bullet position
    this.update = function(){
        if(this.y > 0){
            this.x = xPos;
            this.y -= bulletVy;
            ctx.drawImage(bulletImg, this.x, this.y);
        }
    }
    this.updateEnemy = function()
    {
            this.y += bulletVy;
            ctx.drawImage(eBulletImg, this.x, this.y);
    }
    
    }

function Planet()
    {
        var planet = new Image();
        planet.src = "images/planet_cropped.png";
        this.y = -400;
        this.x = $(canvas).width() / 2 - 428;
        
        this.update = function()
        {
            if(this.y < 0)
            {
            this.y += 1;
            }
            ctx.drawImage(planet, this.x, this.y);
        }
    }
    
    function Blast()
    {
        var blast = new Image();
        blast.src = "images/vBlast2.png";
        this.y = shipY + (ship.height / 2) - (105 / 2);
        this.x = shipX + (ship.width / 2) - (65 / 2);
        
        this.update = function()
        {
            this.y -= 2;
            ctx.drawImage(blast, this.x, this.y);
        }
    }
 
    //function for reloading the bullets (it's nice to have a little delay between the shots)
    function bulletLoaded(){
        isLoaded = true;
        clearInterval(bulletLoaded);
    }
	
	//Explosion function
	function Explosion(x, y, w, h, sprite, image) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.sprite = sprite;
    this.image = image;
    }

//Background music
function bgSound()
{
    var bgSound = new Audio('sounds/space.mp3');   
	bgSound.volume = .7;
	bgSound.loop = true;
    bgSound.play();
}

bgSound();
	
// sound to be played when enemy is killed
function explosionSound()
{
    var explosionSound = new Audio('sounds/explosion.mp3');   
	explosionSound.volume = .2;
    explosionSound.play();
}

// sound to be played when user fires
function fireSound()
{
    var fireSound = new Audio('sounds/shot.mp3');
    fireSound.volume = .2;	
    fireSound.play();
}
        
// sound to be played when user is killed
function killedSound()
{
    var fireSound = new Audio('sounds/killed.mp3');   
	fireSound.volume = .2;
    fireSound.play();
}

// sound to be played when enemy is created
function spawnSound()
{
    var fireSound = new Audio('sounds/spawn.mp3');
    fireSound.volume = .1;	
    fireSound.play();
}

function reset()
{
    counter = 500;
    explosions.splice(0, explosions.length);
    enemy_bullet.splice(0, enemy_bullet.length);
    enemy_array.splice(0, enemy_array.length);
    bullet_array.splice(0, bullet_array.length);
    index = 0;
    playerScore = 0;
    internalScore = 0;
    endScene = false;
    vBlastLaunched = false;
    planetDestruction = false;
    explosionTimeOut = 0;
    up = false;
    down = false;
    left = false;
    right = false;
    fire = false;
    shipX = 400;
    shipY = 600;
    
    carrier_array.splice(0, carrier_array.length);
    carrier_counter = 0;
    carrier_index = 0;
    
    cruiser_array.splice(0, cruiser_array.length);
    cruiser_counter = 0;
    cruiser_index = 0;
}
 
    //Animation loop
    function loop() {
 
    //clear the ctx
    ctx.clearRect(0, 0, canvas.width, canvas.height);
	
    //listen for keyboard inputs, ship-pos, check boundaries
        if(down && shipY + ship.height < canvas.height){
            shipY += vy;
        }
 
        if(up && shipY > canvas.height / 2){
            shipY -= vy;
        }
 
        if(right && shipX + ship.width < canvas.width){
            shipX += vx;
        }
 
        if(left && shipX > 0){
            shipX -= vx;
        }
        
        //draw ship at position
        ctx.drawImage(ship, shipX, shipY);
		
		//Player score
		ctx.font = "15px Verdana";
        ctx.fillStyle = "#FFF";
        ctx.fillText("[v]Score: " + playerScore * 10 + " points.", 05, 675);
 
        //function for creating bullet-objects when fire
        if(fire && isLoaded){
            isLoaded = false;
            bullet = new Bullet(shipX + 32, shipY - 5);  //create new bullets
            bullet_array.push(bullet); //push bullets
        }
        
        //Loop for generating enemy bullets
        for(var i = 0; i < enemy_array.length; i++)
        {
            //Arbitrary recharge value check
            
            if(enemy_array[i].recharge > 50)
            {
                bullet = new Bullet(enemy_array[i].x, enemy_array[i].y + 50);
                enemy_bullet.push(bullet);
                enemy_array[i].recharge = 0;
                
            }
            else
            {
                enemy_array[i].recharge +=1;
            }
        }
        
        for(var i = 0; i < carrier_array.length; i++)
        {
            //Arbitrary recharge value check
            
            if(carrier_array[i].recharge > 150)
            {
                bullet = new Bullet(carrier_array[i].x, carrier_array[i].y + 50);
                enemy_bullet.push(bullet);
                carrier_array[i].recharge = 0;
                
            }
            else
            {
                carrier_array[i].recharge +=1;
            }
        }
        
        for(var i = 0; i < cruiser_array.length; i++)
        {
            //Arbitrary recharge value check
            
            if(cruiser_array[i].recharge > 25)
            {
                bullet = new Bullet(cruiser_array[i].x, cruiser_array[i].y + 50);
                enemy_bullet.push(bullet);
                cruiser_array[i].recharge = 0;
                
            }
            else
            {
                cruiser_array[i].recharge +=1;
            }
        }
        
        //Randomize counter value for enemy creation
        counter += Math.floor((Math.random()*5)+1 );
        
        //Create new enemy
        if (counter >= 500 && enemy_array.length < maxRegular && internalScore < maxScore)
        {
            spawnSound();
            counter = 0;
            enemyX = Math.floor( (Math.random()* $(canvas).width() - 100 ) );
            enemyY = -50;
            enemy_array[index] = new Enemy(enemyX, enemyY);
            index += 1;
            
        }
        
        //Update enemy positions
        for (var i = 0; i < enemy_array.length; i++)
        {
            enemy_array[i].update();
        }
        
        carrier_counter += Math.floor((Math.random()*5)+1 );
        
        if(carrier_array.length < maxCarrier && carrier_counter >= 3000 && internalScore > 10 && internalScore < maxScore)
        {
            enemyX = Math.floor( (Math.random()* $(canvas).width() - 100 ) );
            enemyY = -50;
            carrier_array[carrier_index] = new Carrier(enemyX,enemyY);
            carrier_index += 1;
            carrier_counter = 0;
        }
        
        if(carrier_array.length > 0)
        {
            for(var i = 0; i < carrier_array.length; i++)
            {
                carrier_array[i].updateCarrier();
            }
        }
        
        cruiser_counter += Math.floor((Math.random()*5)+1 );
        
        if(cruiser_array.length < maxCruiser && cruiser_counter >= 2000 && internalScore > 5 && internalScore < maxScore)
        {
            enemyX = Math.floor( (Math.random()* $(canvas).width() - 100 ) );
            enemyY = -50;
            cruiser_array[cruiser_index] = new Cruiser(enemyX,enemyY);
            cruiser_index += 1;
            cruiser_counter = 0;
        }
        
        if(cruiser_array.length > 0)
        {
            for(var i = 0; i < cruiser_array.length; i++)
            {
                cruiser_array[i].updateCruiser();
            }
        }
        
 
        //loop through bullet-array and update each bullet position
        for(var i= bullet_array.length - 1; i >= 0; i--){
            //If out of bounds, remove bullet
            if (bullet_array[i].y <= 0)
            {
                bullet_array.splice(i, 1);
            }
            else
            {
                bullet_array[i].update();
            }
        }
        
        //Loop for updating enemy bullet positions
        for(var i= enemy_bullet.length - 1; i >= 0; i--)
        {
            
            //If bullet out of bounds, remove bullet
            if( enemy_bullet[i].y >= $(canvas).height)
            {
                enemy_bullet.splice(i, 1);
            }
            else
            {
                enemy_bullet[i].updateEnemy();
            }
        }
        
       
        //Loop for enemy collision detection based on Pythagorean Thereom.
     
        for(var i = bullet_array.length - 1; i >=0; i--)
        {
            var bulletCenterX = bullet_array[i].x + bulletWidth / 2;
            var bulletCenterY = bullet_array[i].y + bulletHeight / 2;
            
            for (var j = enemy_array.length - 1; j >= 0; j--)
            {
                var enemyCenterX = enemy_array[j].x + enemyWidth / 2;
                var enemyCenterY = enemy_array[j].y + enemyHeight / 2;
            
                if ( Math.sqrt(Math.pow((enemyCenterX - bulletCenterX),2) + Math.pow((enemyCenterY - bulletCenterY), 2)) <= enemyWidth / 2)
                {
                
                    explosionSound();
                    
                    bullet_array.splice(i, 1);
                    enemy_array.splice(j, 1);
					explosions.push(new Explosion(enemyCenterX, enemyCenterY, 120, 120, 0, explosionImg));
					playerScore = playerScore + enemy_array.length + 1;
                    internalScore++;
                    index--;
                    
                }
            }
            
            for(var j = carrier_array.length - 1; j >= 0; j--)
            {
            
                var enemyCenterX = carrier_array[j].x + carrierWidth / 2;
                var enemyCenterY = carrier_array[j].y + carrierHeight / 2;
            
                if ( Math.sqrt(Math.pow((enemyCenterX - bulletCenterX),2) + Math.pow((enemyCenterY - bulletCenterY), 2)) <= enemyWidth / 2)
                {
                
                    if(carrier_array[j].health == 1)
                    {
                        explosionSound();
                    
                        bullet_array.splice(i, 1);
                        carrier_array.splice(j, 1);
                        explosions.push(new Explosion(enemyCenterX, enemyCenterY, 120, 120, 0, explosionImg));
                        playerScore = playerScore + enemy_array.length + 2;
                        internalScore++;
                        carrier_index--;
                    }
                    else
                    {
                        bullet_array.splice(i, 1);
                        explosionSound();
                        explosions.push(new Explosion(enemyCenterX, enemyCenterY, 120, 120, 0, explosionImg));
                        carrier_array[j].health--;
                    }
                }
                
            }
            
            for(var j = cruiser_array.length - 1; j >= 0; j--)
            {
            
                var enemyCenterX = cruiser_array[j].x + cruiserWidth / 2;
                var enemyCenterY = cruiser_array[j].y + cruiserHeight / 2;
            
                if ( Math.sqrt(Math.pow((enemyCenterX - bulletCenterX),2) + Math.pow((enemyCenterY - bulletCenterY), 2)) <= enemyWidth / 2)
                {
                
                    if(cruiser_array[j].health == 1)
                    {
                        explosionSound();
                    
                        bullet_array.splice(i, 1);
                        cruiser_array.splice(j, 1);
                        explosions.push(new Explosion(enemyCenterX, enemyCenterY, 120, 120, 0, explosionImg));
                        playerScore = playerScore + 3;
                        internalScore++;
                        cruiser_index--;
                    }
                    else
                    {
                        bullet_array.splice(i, 1);
                        explosionSound();
                        explosions.push(new Explosion(enemyCenterX, enemyCenterY, 120, 120, 0, explosionImg));
                        cruiser_array[j].health--;
                    }
                }
                
            }
        }
        
        var shipCenterX = shipX + ship.width / 2;
        var shipCenterY = shipY + ship.height / 2;
        
        //Loop for player collision detection based on Pythagorean Thereom
        for(var i = enemy_bullet.length - 1; i >= 0; i--)
        {
            if ( Math.sqrt(Math.pow((enemy_bullet[i].x - shipCenterX),2) + Math.pow((enemy_bullet[i].y - shipCenterY), 2)) <= ship.width / 2)
            {
                killedSound();
                reset();
                window.alert("You lost! Try again.");
            }
            
            if (enemy_bullet[i].y >= $(canvas).height() )
            {
                enemy_bullet.splice(i, 1);
            }
        }
        
        //Set up ending scene
        if (internalScore >= maxScore && enemy_array.length == 0 && carrier_array.length == 0 && endScene == false)
        {
            endScene = true;
            planet = new Planet();
        }
        
        //Run ending scene
        if(endScene == true)
        {
            
            planet.update();
            
            //Spawn [v] bomb
            if(planet.y >= 0 && vBlastLaunched == false)
            {
                blast = new Blast();
                vBlastLaunched = true;
            }
            
            //Once [v] bomb reaches end of screen, explode planet
            if(vBlastLaunched == true)
            {
                
                if(planetDestruction == false)
                {
                blast.update();
                }
                
                //Planet is destroyed
                if ( blast.y < 25)
                {
                    planetDestruction = true;
              
                }
                
                //Randomize explosions for planet destruction
                if(planetDestruction == true)
                {
                    if(explosionTimeOut < 100)
                    {
                        explosionSound();
                        explosions.push(new Explosion((Math.random()*1024), (Math.random()*200), 120, 120, 0, explosionImg));
                        explosionTimeOut++;
                    }
                    else
                    {
                        reset();
                        window.alert("I didn't think you could actually do it. Uh...congrats, I guess. Don't expect a medal.");
                        
                    }
                }
            }
            
        }


        
		//Explosion loop
        if (explosions.length > 0) {
            for (var j in explosions) {
                if (explosions[j] != 0) {
                    //Draw explosion sprite
                    ctx.drawImage(explosionImg, explosions[j].sprite*explosions[j].w, 0, explosions[j].w, explosions[j].h, explosions[j].x - explosions[j].w/2, explosions[j].y - explosions[j].h/2, explosions[j].w, explosions[j].h);
                    explosions[j].sprite++;

                    //Remove sprite after 10
                    if (explosions[j].sprite > 10) {
                        delete explosions[j];
                    }
                }
            }
        }
	
 
    }
 
    //function for keyDown
    function onKeyDown(evt){
        evt.preventDefault();
        switch (evt.keyCode){ //get the key-code
            case 38:  //up-arrow pressed
				up = true;
				break;
            case 40:  //down-arrow pressed
                down = true;
                break;
            case 37:  //left-arrow pressed
                left = true;
                break;
            case 39:  //right-arrow pressed
                right = true;
                break;
            case 32:  //space-bar pressed
                fire = true;
                break;
        }
    }
 
    //function for keyUp
    function onKeyUp(evt){
        switch (evt.keyCode) {
            case 38:
                up = false;
                break;
            case 40:
                down = false;
                break;
            case 37:
                left = false;
                break;
            case 39:
                right = false;
                break;
            case 32:
                fire = false;
                break;
        }
    }