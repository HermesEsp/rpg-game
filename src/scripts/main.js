import "../styles/style.css";
import { GameLoop } from "./gameLoop.js";
import { Input } from "./input.js";
import { resources } from "./resource.js";
import { Sprite } from "./sprites.js";
import { Vector2 } from "./vector2.js";

const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

const skySprite = new Sprite({
  resource: resources.images.sky,
  frameSize: new Vector2(320, 180),
});

const groundSprite = new Sprite({
  resource: resources.images.ground,
  frameSize: new Vector2(320, 180),
});

const hero = new Sprite({
  resource: resources.images.hero,
  frameSize: new Vector2(32, 32),
  hFrames: 3,
  vFrames: 8,
  frame: 1,
});

const shadow = new Sprite({
  resource: resources.images.shadow,
  frameSize: new Vector2(32, 32),
});
const heroPos = new Vector2(16 * 6, 16 * 5);
const input = new Input();

const update = () => {
  if (input.direction === "ArrowUp") {
    heroPos.y -= 1;
    hero.frame = 6; // walking up
  }
  if (input.direction === "ArrowDown") {
    heroPos.y += 1;
    hero.frame = 0; // walking down
  }
  if (input.direction === "ArrowLeft") {
    heroPos.x -= 1;
    hero.frame = 9; // walking left
  }
  if (input.direction === "ArrowRight") {
    heroPos.x += 1;
    hero.frame = 3; // walking right
  }

  if (!input.direction) {
    hero.frame = 1; // idle
  }
};

const draw = () => {
  skySprite.drawImage(ctx, 0, 0);
  groundSprite.drawImage(ctx, 0, canvas.height - groundSprite.frameSize.y);

  const heroOffset = new Vector2(-8, -21);
  const heroPosX = heroPos.x + heroOffset.x;
  const heroPosY = heroPos.y + heroOffset.y;

  shadow.drawImage(ctx, heroPosX, heroPosY);
  hero.drawImage(ctx, heroPosX, heroPosY);
};

const gameLoop = new GameLoop(update, draw);
gameLoop.start();
