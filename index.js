const canvas = document.getElementById('canvas')
document.getElementsByTagName('svg')[0].addEventListener('click',()=>{
    document.getElementsByClassName('container')[0].style.display = 'none'
    document.getElementById('rulesContainer').style.display = 'flex'
    
})
const ctx = canvas.getContext('2d')
canvas.height = window.innerHeight
canvas.width = window.innerWidth
const bgImage = new Image()
let play = true
bgImage.src = './Assets/bg.jpg';
const ghostSprite = new Image()
ghostSprite.src = './Assets/ghostSprite.png'
const pumpkins = new Image()
pumpkins.src = './Assets/pumpkins.png'
class Pumpkin {
    constructor (x,y,ctx){
       this.x = x
       this.y = y
       this.height = 210
       this.width = 210
       this.speed = 1.5
       this.radius = 100
    }
    draw(){
        
      ctx.beginPath()
      ctx.arc(this.x,this.y,100,0,Math.PI * 2, )
      ctx.drawImage(pumpkins,this.x - this.radius,this.y - this.radius, this.width,this.height )
    }
    update(){
        this.x -= this.speed
    }
}

const pumpkinArray = []
function createObstacles () {
    for(let i = 0; i < 10; i++){
    const distance = (Math.random() * 500) + 400
    const vertical = (Math.random() * 800) + 100

    if(pumpkinArray[0]){
        const previous = pumpkinArray[pumpkinArray.length - 1].x
        pumpkinArray.push(new Pumpkin(previous + distance,vertical,ctx))
    }
    else{
        pumpkinArray[0] = new Pumpkin(distance + 900,vertical,ctx)
    }
}

}
createObstacles()
function collision(object, charWidth, y) {
    const padding = 20;

    const ghostLeft = 100 + padding;
    const ghostRight = 100 + charWidth - padding;
    const ghostTop = y + padding;
    const ghostBottom = y + 220 - padding;

    const pumpkinLeft = object.x - object.radius + 15;
    const pumpkinRight = object.x - object.radius + object.width - 15;
    const pumpkinTop = object.y - object.radius + 15;
    const pumpkinBottom = object.y - object.radius + object.height - 15;

    return (
        ghostLeft < pumpkinRight &&
        ghostRight > pumpkinLeft &&
        ghostTop < pumpkinBottom &&
        ghostBottom > pumpkinTop
    );
}

bgImage.onload = () => {
    document.getElementById('gotIt').addEventListener('click',()=>{
        document.getElementById('rulesContainer').style.display = 'none'
        document.getElementById('gameScoreDisplay').style.display = 'flex'
        raf()
    })
   
    let x = 0
    let Scrollspeed = 1.5
    let score = 0
    let scoreIncreaser = 0.01
    let gravity = 0
    let y = 200
    let charWidth = 120
    let gravitySpeed = 0.02
     document.getElementById('retrySvg').addEventListener('click',()=>{
        document.getElementById('retryContainer').style.display = 'none'
        x = 0
        gravity = 0 
        y = 200
        score = 0
        pumpkinArray.length = 0
        createObstacles()
        document.getElementById('gameScoreDisplay').style.display = 'flex'
        raf()
    })
    ctx.drawImage(bgImage,x,0,window.innerWidth,window.innerHeight)
    window.addEventListener('keydown',(event)=>{
        gravity = -2.5
    })
    let animationId;
    function raf () {

        score+=scoreIncreaser
        document.getElementById('gameScore').textContent = score.toFixed(0)
        console.log(score.toFixed(0))
        animationId = requestAnimationFrame(raf)
        ctx.clearRect(0,0,window.innerWidth,window.innerHeight)
        ctx.drawImage(bgImage,x,0,window.innerWidth,window.innerHeight)
    ctx.drawImage(bgImage,window.innerWidth + x,0,window.innerWidth,window.innerHeight)
        for(let i = pumpkinArray.length - 1; i >= 0; i--){
        const pumpkins = pumpkinArray[i]
        if(collision(pumpkins,charWidth,y)){
            cancelAnimationFrame(animationId)
            document.getElementById('gameScoreDisplay').style.display = 'none'
            document.getElementById('score').textContent = score.toFixed(0)
            document.getElementById('retryContainer').style.display = 'flex'
        }
        pumpkins.update()
        pumpkins.draw()
        if (pumpkins.x + pumpkins.radius < 0) {
              pumpkinArray.splice(i, 1);
}
      }
      if(pumpkinArray.length < 5){
        for(let i = 0; i < 10; i++){
    const distance = (Math.random() * 500) + 400
    const vertical = (Math.random() * 800) + 100

    if(pumpkinArray[0]){
        const previous = pumpkinArray[pumpkinArray.length - 1].x
        pumpkinArray.push(new Pumpkin(previous + distance,vertical,ctx))
    }
    else{
        pumpkinArray[0] = new Pumpkin(distance,vertical,ctx)
    }
}
      }
     ctx.drawImage(ghostSprite,49,120,135,230,100,y,charWidth,220)
      
     if(y > window.innerHeight){
       gravity = 0
       cancelAnimationFrame(animationId)
       document.getElementById('gameScoreDisplay').style.display = 'none'
       document.getElementById('score').textContent = score.toFixed(0)
       document.getElementById('retryContainer').style.display = 'flex'
     }
     else if(y < 0){
           y = 0
           gravity = 0
     }
     else{
         y+=gravity
     gravity+=gravitySpeed
     }
    

     if(x < -window.innerWidth){
        x+=window.innerWidth
    }
    else{
      x-=Scrollspeed
    }
    
    }
    
}