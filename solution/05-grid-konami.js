const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [ 2048, 2048 ]
};

const sketch = async () => {
  const count = 20;
  const characters = '😅'.split('');
  const background = '#eee';
  const palette = ['hsl(0, 0%, 10%)'];

  const createGrid = () => {
    const points = [];
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = x / (count - 1);
        const v = y / (count - 1);
        const position = [ u, v ];
        const character = random.pick(characters);
        const r = /[AB]/i.test(character) ? 25 : 20;
        const e = /[AB]/i.test(character) ? 10 : 20;
        points.push({
          color: random.pick(palette),
          radius: r + e * random.value() * 3.5,
          position,
          character
        });
      }
    }
    return points;
  };

  let points = createGrid().filter(() => random.chance(0.5));

  // Now return a render function for the sketch
  return ({ context, width, height }) => {
    const margin = width * 0.175;

    context.fillStyle = background;
    context.fillRect(0, 0, width, height);

    points.forEach(data => {
      const {
        position,
        radius,
        color,
        character
      } = data;
      const x = lerp(margin, width - margin, position[0]);
      const y = lerp(margin, height - margin, position[1]);

      // Draw the character
      context.fillStyle = color;
      context.font = `${radius * 0.5}px serif`;
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(['😅', 'N', 'h', 'u'], x, y);
    });
  };
};

canvasSketch(sketch, settings);
