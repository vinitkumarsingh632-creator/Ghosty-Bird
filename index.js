const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
canvas.height = window.innerHeight
canvas.width = window.innerWidth
const bgImage = new Image()
bgImage.src = './Assets/bg.jpg';
const ghostSprite = new Image()
ghostSprite.src = './Assets/ghostSprite.png'
bgImage.onload = () => {
    let x = 0
    let Scrollspeed = 1
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
     ctx.drawImage(ghostSprite,49,84,144,262,100,y,charWidth,250)
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