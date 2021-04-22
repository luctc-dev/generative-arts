const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
const palettes = require('nice-color-palettes/1000.json');

random.setSeed(random.getRandomSeed())

let palette = random.pick(palettes);

const settings = {
  suffix: random.getSeed(),
  dimensions: [ 2048, 2048 ]
};

function randomInRange(start,end){
  return Math.floor(random.value() * (end - start + 1) + start);
}
// 0 -> 1
// -3.5 -> 3.5

const sketch = () => {
  const count = 20;

  const createGrid = () => {
    const points = [];
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = x / (count - 1);
        const v = y / (count - 1);
        points.push([ u, v ]);
      }
    }
    return points;
  };

  const points = createGrid().filter(() => random.value() > 0.5)
  
  return ({ context, width, height }) => {
    context.fillStyle = 'pink';
    context.fillRect(0, 0, width, height);
    
    const margin = width * 0.175;
    points.forEach(([u, v]) => {
      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);

      context.beginPath();
      context.arc(x, y, Math.abs(randomInRange(-3.5, 3.5) * width * 0.01), 0, Math.PI * 2);
      context.fillStyle = random.pick(palette);
      context.fill();
    })
  };
};

canvasSketch(sketch, settings);
