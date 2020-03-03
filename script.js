function rand(from, to) {
  return ~~(Math.random() * (to - from) + from)
}

const offset = 30
const ex = []
const ey = []

class Slider {
  constructor() {
    this.bindMethods()
    
    this.DOM = {
      fragment: document.querySelectorAll('.fragment'),
      donor: document.querySelectorAll('.donor'),
      parent: document.querySelector('.parent'),
      button: document.querySelector('button'),
      container: document.querySelector('.container'),
    }
    
    this.index = 0
    this.base = 64
    this.init() 
  }

  bindMethods() {
    ['next', 'resize']
    .forEach((fn) => this[fn] = this[fn].bind(this));
  }
  
  resize() {
    this.base = ~~(this.DOM.container.clientHeight / 10)
    this.showParent()
  }
  
  move() {
      setTimeout(() => {
      this.DOM.fragment.forEach((elem, index) => {
        elem.style.top = `${ey[index]}px`
        elem.style.left = `${ex[index]}px`
        elem.style.opacity = 0
      })
    }, 1000 )  
  }
  
  place() {
    let sx, sy, width, height = 0
    let base = this.base
    
    this.DOM.fragment.forEach((elem, i) => {
      do {
        sx = rand(0, 16)
        sy = rand(0, 10)
        width = rand(1, 16)
        height = rand(1, 10)
      } while (((width + sx) > 16 ) || ((height + sy) > 10 ))

      ex[i] = sx * base
      ey[i] = sy * base
      let ssx = (sx > 7 ) ? ex[i] + rand(0, offset) : ex[i] - rand(0, offset)
      let ssy = (sy > 4 ) ? ey[i] + rand(0, offset) : ey[i] - rand(0, offset)
      elem.style.top = `${ssy}px`
      elem.style.left = `${ssx}px`
      elem.style.opacity = 1
      this.slice(this.DOM.donor[this.index], sx, sy, width, height, elem)
    })  
  }
  
  slice(source, sx, sy, width, height, target) {
    let base = this.base
    let cnv = target
    cnv.height = base * height
    cnv.width = base * width
    let ctx = cnv.getContext('2d')
    try {
      ctx.drawImage(source, sx * 64, sy * 64, width * 64, height * 64, 0, 0, cnv.width, cnv.height)
    } catch (e) {
      console.log(e, source)
    }
  }
  
  next() {
    if (this.index > 7 ) {
      this.index = 0
    } else {
      this.index++
    }
    this.showParent()
    this.place()
    this.move()
  }
  
  showParent() {
    this.slice(this.DOM.donor[this.index], 0, 0, 16, 10, this.DOM.parent)
  }
  
  init() {
    this.DOM.button.addEventListener("click", this.next)
    window.addEventListener("resize", this.resize)
    this.resize()
    this.place()
    this.move()
  }
}

new Slider()