const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
canvas.height = window.innerHeight
canvas.width = window.innerWidth
const bgImage = new Image()
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
       this.speed = 2
       this.radius = 100
    }
    draw(){
        
      ctx.beginPath()
      ctx.arc(this.x,this.y,100,0,Math.PI * 2, )
      ctx.strokeStyle = 'red'
      ctx.stroke()
      ctx.drawImage(pumpkins,this.x - this.radius,this.y - this.radius, this.width,this.height )
    }
    update(){
        this.x -= this.speed
    }
}

const pumpkinArray = []
for(let i = 0; i < 10; i++){
    const distance = (Math.random() * 500) + 400
    const vertical = (Math.random() * 800) + 100

    if(pumpkinArray[0]){
        const previous = pumpkinArray[pumpkinArray.length - 1].x
        console.log(previous)
        pumpkinArray.push(new Pumpkin(previous + distance,vertical,ctx))
    }
    else{
        pumpkinArray[0] = new Pumpkin(distance,vertical,ctx)
    }
}
// 100 < object.x + object.width && 100 + 150 > object.x &&y < object.y + object.height && y + 220 > object.y 
function collision (object,charWidth,y) {
    if ( 100 < object.radius + object.x && 100 + 120 >object.x && y <object.y +  object.radius && y + 220 > object.y
    ){
           return true
    }
 return false   
}
bgImage.onload = () => {
    let x = 0
    let Scrollspeed = 2
    let gravity = 0
    let y = 200
    let charWidth = 120
    let gravitySpeed = 0.02
    window.addEventListener('keydown',(event)=>{
        gravity = -2.5
    })
    let animationId;
    function raf () {
       animationId =  requestAnimationFrame(raf)
        ctx.clearRect(0,0,window.innerWidth,window.innerHeight)
        ctx.drawImage(bgImage,x,0,window.innerWidth,window.innerHeight)
    ctx.drawImage(bgImage,window.innerWidth + x,0,window.innerWidth,window.innerHeight)
        for(let i = pumpkinArray.length - 1; i >= 0; i--){
        const pumpkins = pumpkinArray[i]
        if(collision(pumpkins,charWidth,y)){
            cancelAnimationFrame(animationId)
        }
        pumpkins.update()
        pumpkins.draw()
        if(pumpkins.x < -100) {
            console.log(pumpkinArray[i])
            pumpkinArray.splice(i,1)
        }
      }
      if(pumpkinArray.length < 6){
        for(let i = 0; i < pumpkinArray.length; i++){
    const distance = (Math.random() * 500) + 400
    const vertical = (Math.random() * 800) + 100

    if(pumpkinArray[0]){
        const previous = pumpkinArray[pumpkinArray.length - 1].x
        console.log(previous)
        pumpkinArray.push(new Pumpkin(previous + distance,vertical,ctx))
    }
    else{
        pumpkinArray[0] = new Pumpkin(distance,vertical,ctx)
    }
}
      }
     ctx.drawImage(ghostSprite,49,120,144,262,100,y,charWidth,220)
      
     if(y > window.innerHeight){
       console.log('Done')
       gravity = 0
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
    raf()
}