
function getRandomColor() {
  return `#${Math.floor(Math.random() * 0xffffff).toString(16)}`
}

registerPaint("random-circles", class RandomCircles {
  paint(ctx, box, props, args) {
    const count = 60;
    const maxRadius = Math.min(box.width/2, box.height/2);
    ctx.beginPath();

    ctx.fillStyle = getRandomColor();
    ctx.fillRect(0, 0, box.width, box.height);

    console.log(args);

    for (let i = 0; i < count; i++) {
      const x = Math.random() * box.width;
      const y = Math.random() * box.height;
      const radius = Math.random() * maxRadius;

      ctx.fillStyle = getRandomColor();
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, 2 * Math.PI);
      ctx.fill();
    }
  }
});