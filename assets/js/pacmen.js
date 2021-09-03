let pos = 0;
const pacArray = [
  ['./assets/images/PacMan1.png', './assets/images/PacMan2.png'],
  ['./assets/images/PacMan3.png', './assets/images/PacMan4.png'],
];
const pacMen = [];

function setToRandom(scale) {
  return {
    x: Math.random() * scale,
    y: Math.random() * scale,
  };
}

function makePac() {
  let velocity = setToRandom(10); // {x:?, y:?}
  let position = setToRandom(200);
  let mouth = 0;
  let counter = 0;
  let direction = 0;

  let game = document.getElementById('game');
  let newimg = document.createElement('img');
  newimg.style.position = 'absolute';
  newimg.src = './assets/images/PacMan1.png';
  newimg.width = Math.floor(Math.random() * (150 - 50 + 1) + 50)

  newimg.style.left = position.x;
  newimg.style.top = position.y;
  game.appendChild(newimg);

  return {
    position,
    velocity,
    newimg,
    counter,
    direction,
    mouth,
  };
}

function update() {
  pacMen.forEach((item) => {
    checkCollisions(item);
    item.position.x += item.velocity.x;
    item.position.y += item.velocity.y;
    item.counter++;
    if (item.counter % 10 == 0) {
      item.mouth = (((item.counter / 10) % 2) ? 0 : 1);
      item.newimg.src = pacArray[item.direction][item.mouth];
    }
    item.newimg.style.left = item.position.x;
    item.newimg.style.top = item.position.y;
  });
  setTimeout(update, 20);
}

function checkCollisions(item) {
  if (item.position.x + item.velocity.x + item.newimg.width > window.innerWidth ||
    item.position.x + item.velocity.x < 0) {
    item.velocity.x = -item.velocity.x;
    item.direction = (Math.sign(item.velocity.x) == 1 ? 0 : 1 );
    item.newimg.src = pacArray[item.direction][item.mouth]
  } 
  if (item.position.y + item.velocity.y + item.newimg.height > window.innerHeight ||
    item.position.y + item.velocity.y < 0) {
    item.velocity.y = -item.velocity.y;
  }
}

function makeOne() {
  pacMen.push(makePac());
}