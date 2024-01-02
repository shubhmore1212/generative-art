const canvasSketch = require("canvas-sketch");
const { lerp } = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");
const palettes = require("nice-color-palettes");

const settings = {
  dimensions: [2048, 2048],
  //units: "in",
  // orientation: "landscape",
  pixelsPerInch: 600,
};

const sketch = () => {
  const colorCount = random.rangeFloor(1, 6);
  const palette = random.shuffle(random.pick(palettes)).slice(0, colorCount);

  const createGrid = () => {
    const points = [];
    const count = 150;

    for (let i = 0; i < count; i++) {
      for (let j = 0; j < count; j++) {
        let u = count <= 1 ? 0.5 : i / (count - 1);
        let v = count <= 1 ? 0.5 : j / (count - 1);
        const radius = random.noise2D(u, v);

        points.push({
          position: [u, v],
          radius: Math.abs(radius) * 0.05,
          color: random.pick(palette),
          rotation: random.noise2D(u, v),
        });
      }
    }

    return points;
  };

  //random.setSeed(1212);
  const points = createGrid().filter(() => random.value() > 0.5);
  const margin = 400;

  return ({ context, width, height }) => {
    context.fillStyle = "#32a852";
    context.fillRect(0, 0, width, height);

    const x = lerp(margin, width - margin, 0);
    const y = lerp(margin, height - margin, 0);
    context.fillStyle = "red";
    context.fillRect(0, 0, width, height);

    points.forEach((data) => {
      const { position, radius, color, rotation } = data;
      const [u, v] = position;

      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);

      // context.beginPath();
      // context.arc(x, y, radius * width, 0, Math.PI * 2, false);
      // context.fillStyle = color;
      // context.fill();

      context.save();

      context.fillStyle = color;
      context.font = `${radius * width}px "Helvetica"`;
      context.translate(x, y);
      context.rotate(rotation);
      context.fillText("~`", 0, 0);

      context.restore();
    });
  };
};

canvasSketch(sketch, settings);
