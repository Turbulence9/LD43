class PressurePlate {
  constructor() {
    this.state = {
      x: null,
      y: null,
      active: false
    };
  }

  create(xValue, yValue) {
    this.state.x = xValue;
    this.state.y = yValue;
  }

  activate() {
    this.state.active = true;
  }

  deactivate() {
    this.state.active = false;
  }

  isActive() {
    return this.state.active;
  }
}
