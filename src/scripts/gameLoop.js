export class GameLoop {
  constructor(update, render) {
    this.update = update;
    this.render = render;

    this.lastFrameTime = 0;
    this.accumulatedTime = 0;
    this.fps = 60;
    this.frameDuration = 1000 / this.fps;

    this.rafId = null;
    this.isRunning = false;
  }

  mainLoop = (timestamp) => {
    if (!this.isRunning) return;

    const deltaTime = timestamp - this.lastFrameTime;
    this.lastFrameTime = timestamp;

    this.accumulatedTime += deltaTime;

    while (this.accumulatedTime >= this.frameDuration) {
      this.update(this.frameDuration);
      this.accumulatedTime -= this.frameDuration;
    }

    this.render();

    this.rafId = requestAnimationFrame(this.mainLoop);
  };

  start() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.lastFrameTime = performance.now();
      this.rafId = requestAnimationFrame(this.mainLoop);
    }
  }

  stop() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
    this.isRunning = false;
  }
}
