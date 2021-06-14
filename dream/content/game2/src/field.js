'use strict';
const carrotSound = new Audio('./sound/carrot_pull.mp3');
const CARROT_SIZE = 80;

export default class Field{
    constructor(crrotCount, bugCount){
        this.crrotCount = crrotCount;
        this.bugCount = bugCount;
        this.field = document.querySelector('.game__field');
        this.fieldRect = this.field.getBoundingClientRect();
        this.field.addEventListener('click', this.onClick)
    }
    setClickListener(onClick){
      this.onClick = onClick;
  }
    init(){
      this.field.innerHTML = '';
      this._addItem('carrot', this.crrotCount, 'img/carrot.png');
      this._addItem('bug', this.bugCount, 'img/bug.png');
    }
    // _는 외부에서 부르면 안되는 표기법
    _addItem(className, count, imgPath) {
      const x1 = 0;
      const y1 = 0;
      const x2 = this.fieldRect.width - CARROT_SIZE;
      const y2 = this.fieldRect.height - CARROT_SIZE;
      for (let i = 0; i < count; i++) {
        const item = document.createElement('img');
        item.setAttribute('class', className);
        item.setAttribute('src', imgPath);
        item.style.position = 'absolute';
        const x = randomNumber(x1, x2);
        const y = randomNumber(y1, y2);
        item.style.left = `${x}px`;
        item.style.top = `${y}px`;
        this.field.appendChild(item);
      }
    }
    onClick(event){
      const target = event.target;
      if (target.matches('.carrot')) {
        // 당근!!
        target.remove();
        playSound(carrotSound);
        this.onItemClick && this.onItemClick('carrot');
      } else if (target.matches('.bug')) {
        this.onItemClick && this.onItemClick('bug');
      }
    }
}

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}