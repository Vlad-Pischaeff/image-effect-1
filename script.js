function rand(from, to) {
  return ~~(Math.random() * (to - from) + from)
}

const base = 64
const ex = []
const ey = []

class Slider {
  constructor() {
    this.DOM = {
      fragment: document.querySelectorAll('.fragment'),
      donor: document.querySelectorAll('.donor'),
      parent: document.querySelector('.parent'),
      cnv: document.querySelector('canvas')
    }
    
    this.init() 
  }

  move() {
      setTimeout(() => {
      this.DOM.fragment.forEach((elem, index) => {
        elem.style.top = `${ey[index]}px`
        elem.style.left = `${ex[index]}px`
        elem.style.opacity = 0
      })
    }, 2000 )  
  }
  
  place() {
    let index = 0
    this.DOM.fragment.forEach((elem, index) => {
      let sx = rand(0, 15)
      let sy = rand(0, 9)
      ex[index] = sx * base
      ey[index] = sy * base
      let width = rand(1, 15)
      let height = rand(1, 9)
      if ((width + sx) > 16 ) width = 16 - sx
      if ((height + sy) > 10 ) height = 10 - sy
      let ssx = (sx > 7 ) ? (sx * base) + rand(0, 30) : (sx * base) + rand(-30, 0)
      let ssy = (sy > 4 ) ? (sy * base) + rand(0, 30) : (sy * base) + rand(-30, 0)
      elem.style.top = `${ssy}px`
      elem.style.left = `${ssx}px`
      this.slice(this.DOM.donor[1], sx, sy, width, height, elem)
//      console.log('data', index, sx*base, ssx, sy*base, ssy, width*base, height*base)
    })  
  }
  
  slice(source, sx, sy, width, height, target) {
    let cnv = this.DOM.cnv
    cnv.height = base * height
    cnv.width = base * width
    let ctx = cnv.getContext('2d')
    ctx.drawImage(source, sx * base, sy * base, cnv.width, cnv.height, 0, 0, cnv.width, cnv.height);
    target.src = cnv.toDataURL()
  }
  
  
  init() {
//    console.log('fragment', this.DOM.parent, this.DOM.fragment, this.DOM.donor, this.DOM.cnv)
    this.slice(this.DOM.donor[1], 0, 0, 16, 10, this.DOM.parent)
    this.place()
    this.move()
  }
}

new Slider()