/** @type {HTMLCanvasElement}*/
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
CANVAS_WIDTH = canvas.width = 500;
CANVAS_HEIGHT = canvas.height = 1000;
const numberOfEnemies = 40;
const enemiesArray = [];

let gameFrame = 0;

const SPECIES_SPRITE_SIZE = {
    '1': {
        'spriteWidth': 293,
        'spriteHeight': 155,
    },
    '2': {
        'spriteWidth': 265,
        'spriteHeight': 165,
    },
};

class Enemy {
    constructor(){
        this.image = new Image();
        this.enemy_species = Math.random() > 0.5 ? '1' : '2'
        this.image.src = `enemy${this.enemy_species}.png`;


        this.spriteWidth = SPECIES_SPRITE_SIZE[this.enemy_species].spriteWidth
        this.spriteHeight = SPECIES_SPRITE_SIZE[this.enemy_species].spriteHeight

        if (this.enemy_species == '2') {
            this.spriteWidth = 265;
            this.spriteHeight = 165;      
        } else {
            this.spriteWidth = 293;
            this.spriteHeight = 155;
        }


        // correct values for enemy1
        // this.spriteWidth = 293;
        // this.spriteHeight = 155;
        this.width = this.spriteWidth / 2.5;
        this.height = this.spriteHeight / 2.5;
        this.x = Math.random() * (canvas.width - this.width);
        this.y = Math.random() * (canvas.height - this.height);
        this.frame = 0;
        this.flapSpeed = Math.floor(Math.random() * 5 + 1);
    }
    hover(){
        this.x += Math.random() * 5 - 2.5;
        this.y += Math.random() * 5 - 2.5;
        // animate sprites
        if (gameFrame % this.flapSpeed === 0){
            this.frame > 4 ? this.frame = 0 : this.frame++;
        }
    }
    slow_escape(){
        this.x += Math.random() * 2 - 2.5;
        this.y += Math.random() * 2 - 2.5;
        // animate sprites
        if (gameFrame % this.flapSpeed === 0){
            this.frame > 4 ? this.frame = 0 : this.frame++;
        }
    }
    draw(){
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
};

for (let i = 0; i < numberOfEnemies; i++){
    enemiesArray.push(new Enemy());     
}

function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);    
    enemiesArray.forEach(enemy => {
        enemy.hover();
        enemy.draw();
    });
    gameFrame++;
    requestAnimationFrame(animate);
}
animate();