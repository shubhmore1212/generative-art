/**
 * A Canvas2D example of "10 PRINT" algorithm.
 * @author Shubham More (@shubhmore1212)
 */

const createSketch = require("canvas-sketch");
const { lerp } = require("canvas-sketch-util/math");

const settings = {
  dimensions: [2048, 2048],
  rotation: Math.PI / 2,
};

const sketch = (props) => {
  const tileCount = 30;
  const tiles = Array(tileCount)
    .fill(0)
    .map((_, i) => {
      return Array(tileCount)
        .fill(0)
        .map((_, j) => {
          const [width, height] = [
            props.width / tileCount,
            props.height / tileCount,
          ];
          const randomNumber = Math.random();
          if (randomNumber > 0.5) {
            return {
              x: i * width,
              y: j * height,
              toX: i * width + width,
              toY: j * height + height,
            };
          } else {
            return {
              x: i * width,
              y: j * height + height,
              toX: i * width + width,
              toY: j * height,
            };
          }
        });
    });

  const margin = 400;

  return ({ context, width, height }) => {
    const x = lerp(margin, width - margin, 0);
    const y = lerp(margin, height - margin, 0);

    context.fillStyle = "black";
    context.fillRect(x - 10, y - 10, width, height);

    context.lineWidth = "30";
    context.strokeStyle = "red";

    tiles.map((row) => {
      row.map((rect) => {
        context.beginPath();
        context.moveTo(rect.x + x, rect.y + y);
        context.lineTo(rect.toX + x, rect.toY + y);
        context.stroke();
      });
    });
  };
};

createSketch(sketch, settings);
