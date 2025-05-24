export const InputType = {
  ARROW_UP: "ArrowUp",
  ARROW_DOWN: "ArrowDown",
  ARROW_LEFT: "ArrowLeft",
  ARROW_RIGHT: "ArrowRight",
};

export class Input {
  constructor() {
    this.heldDirections = [];

    document.addEventListener("keydown", (event) => {
      if (Object.values(InputType).includes(event.code)) {
        this.onArrowPressed(event.code);
      }
    });

    document.addEventListener("keyup", (event) => {
      if (Object.values(InputType).includes(event.code)) {
        this.onArrowReleased(event.code);
      }
    });
  }

  get direction() {
    return this.heldDirections[0];
  }

  onArrowPressed(direction) {
    if (this.heldDirections.indexOf(direction) === -1) {
      this.heldDirections.unshift(direction);
    }
  }

  onArrowReleased(direction) {
    const index = this.heldDirections.indexOf(direction);
    if (index !== -1) {
      this.heldDirections.splice(index, 1);
    }
  }
}
