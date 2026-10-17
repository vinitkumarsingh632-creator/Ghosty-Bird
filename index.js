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
       this.height = 150
       this.width = 150
       this.speed = 2
    }
    draw(){
      ctx.drawImage(pumpkins,this.x,this.y,this.width,this.height)
    }
    update(){
        this.x += this.speed
    }
}
const pumpkinArray = []
for(let i = 0; i < 10; i++){
    const distance = Math.random() + 100 
    console.log(distance)
    console.log('dONE')
    const vertical = Math.floor(Math.random() + 400)
    if(pumpkinArray[0]){
        const previous = pumpkinArray[pumpkinArray.length - 1].x
        pumpkinArray[new Pumpkin(previous + distance,vertical,ctx)]
        console.log(pumpkinArray)
    }
    else{
        pumpkinArray[0] = new Pumpkin(distance,vertical,ctx)
    }
}
bgImage.onload = () => {
    let x = 0
    let Scrollspeed = 2
    let charSpeed = 10
    let gravity = 0
    let y = 200
    let charWidth = 150
    let gravitySpeed = 0.02
    window.addEventListener('keydown',(event)=>{
        gravity = -2.5
    })
    function raf () {
        requestAnimationFrame(raf)
        ctx.clearRect(0,0,window.innerWidth,window.innerHeight)
        ctx.drawImage(bgImage,x,0,window.innerWidth,window.innerHeight)
    ctx.drawImage(bgImage,window.innerWidth + x,0,window.innerWidth,window.innerHeight)
    ctx.drawImage(pumpkins,(window.innerWidth + 100 + x),100,100,100)
     ctx.drawImage(ghostSprite,49,84,144,262,100,y,charWidth,250)
      for(let i = 0; i < 10;i++){
        const pumpkins = pumpkinArray[i]

        pumpkins.update()
        pumpkins.draw()
      }
     if(y > window.innerHeight - charWidth){
        y = window.innerHeight - charWidth
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