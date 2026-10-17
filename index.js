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
    let speed = 2
    function raf () {
        requestAnimationFrame(raf)
        ctx.clearRect(0,0,window.innerWidth,window.innerHeight)
       
        ctx.drawImage(bgImage,x,0,window.innerWidth,window.innerHeight)
    ctx.drawImage(bgImage,window.innerWidth + x,0,window.innerWidth,window.innerHeight)
     ctx.drawImage(ghostSprite,49,84,144,262,100,200,150,250)
  
    if(x < -window.innerWidth){
        x+=window.innerWidth
    }
    else{
      x-=speed
    }
    }
    raf()
}