/**
 * A Canvas2D example of async loading and image processing.
 * @author Shubham More (@shubhmore1212)
 */

const canvasSketch = require("canvas-sketch");
const load = require("load-asset");

canvasSketch(async ({ update }) => {
  const image = await load("assets/canvas.ex.png");

  // Update our sketch with new settings
  update({
    dimensions: [image.width, image.height],
  });

  // Render our sketch
  return ({ context, width, height }) => {
    // Render to canvas
    context.drawImage(image, 0, 0, width, height);
  };
});
