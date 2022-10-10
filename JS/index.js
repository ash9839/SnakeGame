// Constants
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio('food.mp3');
const gameOver = new Audio('gameover.mp3');
const moveSound = new Audio('move.mp3');
const musicSound = new Audio('music.mp3');
let speed = 10;
let lastPaintTime = 0;
let snakeArr = [
    { x: 11, y: 13 }
];
food = { x: 6, y: 5 };
let score=0;
//Audio files have to be where the HTML files are

// Functions
function main(ctime) {
    //ctime is current time
    window.requestAnimationFrame(main);
    // console.log(lastPaintTime);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}
function isCollide(snakeArr){
    //collided with itself
    for (let i = 1; i < snakeArr.length; i++) {
        if(snakeArr[i].x === snakeArr[0].x &&
            snakeArr[i].y === snakeArr[0].y){
                hsv=score;
                return true;
            }
    }
    if(snakeArr[0].x>=20 || snakeArr[0].x<=0
        || snakeArr[0].y>=20 || snakeArr[0].y<=0){
            hsv=score;
            return true;
    }
        
    }
function gameEngine() {
    // musicSound.play();
    //updating snake pos
    if(isCollide(snakeArr)){
        gameOver.play();
        musicSound.pause();
        direction={x:0,y:0};
        alert("Game Over. Press any key to Restart");
        snakeArr = [{ x: 11, y: 13 }];
        score=0;
        
    }

    //eaten food
    if(snakeArr[0].y==food.y && snakeArr[0].x==food.x){
        foodSound.play();
        score+=1;
        scorebox.innerHTML="Score: "+score;
        snakeArr.unshift({x:snakeArr[0].x+inputDir.x, y:snakeArr[0].y+inputDir.y});
        let a=2;
        let b=18;
        food={x: Math.round(a+(b-a)*Math.random()), y: Math.round(a+(b-a)*Math.random())};
    }
    //move snake
    for (let i = snakeArr.length-2; i >=0; i--) {
        // const element = array[i];
        snakeArr[i+1]={...snakeArr[i]};
    }
    
    snakeArr[0].x+=inputDir.x;
    snakeArr[0].y+=inputDir.y;
    //display snake
    board.innerHTML = "";

    
    snakeArr.forEach((e, index) => {
        snakeEle = document.createElement('div');
        snakeEle.style.gridRowStart = e.y;
        snakeEle.style.gridColumnStart = e.x;

        if (index == 0) {
            snakeEle.classList.add('head');
        }
        else {
            snakeEle.classList.add('snake');
        }
        board.appendChild(snakeEle);
    })
    //display food
    foodEle = document.createElement('div');
    foodEle.style.gridRowStart = food.y;
    foodEle.style.gridColumnStart = food.x;
    foodEle.classList.add('food');
    board.appendChild(foodEle);

}




// Logic
window.requestAnimationFrame(main);
//this function must give a callback to itself
//calling it once is just 1 shot
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 };//start game
    musicSound.play();
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            inputDir.x=0;
            inputDir.y=-1;
            // console.log("ArrowUp")
            break;
        case "ArrowDown":
            inputDir.x=0;
            inputDir.y=1;
            // console.log("ArrowDown")
            break;
        case "ArrowLeft":
            inputDir.x=-1;
            inputDir.y=0;
            // console.log("ArrowLeft")
            break;
        case "ArrowRight":
            inputDir.x=1;
            inputDir.y=0;
            console.log("ArrowRight")
            break;
        default:
            break;
    }
})