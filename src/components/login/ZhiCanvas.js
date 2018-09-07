// class Canvas{
//   constructor(){
//     this.elem = document.querySelector("#canvas");
//     this.ctx = this.elem.getContext("2d");
//     this.w = this.elem.width = document.body.offsetLeft;
//     this.h = this.elem.height = document.body.offsetHeight;
//   }
// }
class Circle{
  constructor(x, y){
    this.x = x;
    this.y = y;
    //半径
    this.r = Math.random() * 10;
    //移动的距离
    this._x = Math.random();
    this._y = Math.random();
  }
  drawCircle(ctx){
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 360);
    ctx.closePath();
    ctx.fillStyle = 'rgba(204, 204, 204, 1)';
    ctx.fill();
  }
  move(w, h){
    this._x = (this.x < w && this.x > 0)? this._x : (- this._x);
    this._y = (this.y < h && this.y > 0)? this._y : (- this._y);
    this.x += this._x / 2;
    this.y += this._y / 2;
  }
  drawLine(ctx, _circle){
    let dx = this.x - _circle.x;
    let dy = this.y - _circle.y;
    let d = Math.sqrt(dx * dx + dy * dy);
    if(d < 250){
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(_circle.x, _circle.y);
      ctx.closePath();
      ctx.strokeStyle = 'rgba(204, 204, 204, .1)';
      ctx.stroke();
    }
  }
}
// class currentCircle extends Circle {
//   constructor(x, y) {
//     super(x, y);
//   }
//   drawCircle(ctx) {
//     ctx.beginPath();
//     this.r = (this.r < 14 && this.r > 1)? this.r + (Math.random() * 2 - 1): 2;
//     ctx.arc(this.x, this.y, this.r, 0, 360);
//     ctx.closePath();
//     ctx.fillStyle = 'rgba(45, 120, 244, ' + (parseInt(Math.random()*100)/100) + ')';
//     ctx.fill();
//   }
// }
let circles = [];

let draw = function(){
  _canvas.ctx.clearRect(0, 0, _canvas.w, _canvas.h);
  for(let i = 0; i < circles.length; i++) {
    circles[i].move(_canvas.w, _canvas.h);
    circles[i].drawCircle(_canvas.ctx);
    for(let j = i + 1; j < circles.length; j++){
      circles[i].drawLine(_canvas.ctx, circles[j]);
    }
  }
  requestAnimationFrame(draw)
}

let _canvas = {
  canvas: null,
  ctx: null,
  w: null,
  h: null
}

export default  function(num){
  window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  _canvas.canvas = document.querySelector("#canvas");
  _canvas.ctx = _canvas.canvas.getContext("2d");
  // let WIDTH = document.body.offsetLeft;
  // let HEIGHT = document.body.offsetHeight;
  _canvas.w = _canvas.canvas.width =  document.body.offsetWidth;
  _canvas.h = _canvas.canvas.height = document.body.offsetHeight;
  for(let i = 0; i < num; i ++){
    circles.push(new Circle(Math.random() * _canvas.w, Math.random() * _canvas.h));
  }
  draw();
}
// addEventListener('load', init(80))
