import "../styles/style.css";
import { GameLoop } from "./gameLoop.js";
import { gridCells, isSpaceFree } from "./grid.js";
import { Input, InputType } from "./input.js";
import { walls } from "./levels/level.js";
import { moveTowards } from "./moveTowards.js";
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
  position: new Vector2(gridCells(6), gridCells(5)),
});

const heroDestinationPosition = hero.position.duplicate();

const shadow = new Sprite({
  resource: resources.images.shadow,
  frameSize: new Vector2(32, 32),
});
const input = new Input();

const update = () => {
  const distance = moveTowards(hero, heroDestinationPosition, 1);
  const hasArrived = distance <= 1;
  if (hasArrived) {
    tryMove();
  }
};

const tryMove = () => {
  if (!input.direction) {
    return;
  }

  let nextPosX = heroDestinationPosition.x;
  let nextPosY = heroDestinationPosition.y;
  console.log(nextPosX, nextPosY);
  const gridSize = 16;

  if (input.direction === InputType.ARROW_UP) {
    nextPosY -= gridSize;
    hero.frame = 6; // walking up
  }
  if (input.direction === InputType.ARROW_DOWN) {
    nextPosY += gridSize;
    hero.frame = 0; // walking down
  }
  if (input.direction === InputType.ARROW_LEFT) {
    nextPosX -= gridSize;
    hero.frame = 9; // walking left
  }
  if (input.direction === InputType.ARROW_RIGHT) {
    nextPosX += gridSize;
    hero.frame = 3; // walking right
  }

  // TODO: check if the next position is valid
  if (isSpaceFree(walls, nextPosX, nextPosY)) {
    heroDestinationPosition.x = nextPosX;
    heroDestinationPosition.y = nextPosY;
  }
};

const draw = () => {
  skySprite.drawImage(ctx, 0, 0);
  groundSprite.drawImage(ctx, 0, canvas.height - groundSprite.frameSize.y);

  const heroOffset = new Vector2(-8, -21);
  const heroPosX = hero.position.x + heroOffset.x;
  const heroPosY = hero.position.y + heroOffset.y;

  shadow.drawImage(ctx, heroPosX, heroPosY);
  hero.drawImage(ctx, heroPosX, heroPosY);
};

const gameLoop = new GameLoop(update, draw);
gameLoop.start();
