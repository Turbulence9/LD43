
// example usage of door and pressurePlate:

  // var door = new Door();
  // var plate = new PressurePlate();
  // door.assignConditionObject(plate);
  // console.log(door.isOpen());
  // plate.activate();
  // door.udateConditionsMet();
  // console.log(door.isOpen());
  // plate.deactivate();
  // door.udateConditionsMet();
  // console.log(door.isOpen());

class Door {
  constructor() {
    this.name = "door";
    this.state = {
      conditionObjects: [],
      conditionsMet: false
    };
  }

  setCoordinates(xValue, yValue) {
    this.state.x = xValue;
    this.state.y = yValue;
  }

  setDimensions(width, height) {
    this.state.width = width;
    this.state.height = height;
  }

  assignConditionObject(conditionObject) {
    this.state.conditionObjects.push(conditionObject);
  }

  udateConditionsMet() {
    var newValue = true;
    for(var i = 0; i < this.state.conditionObjects.length; i++) {
      if(this.state.conditionObjects[i].isActive() === false) {
        newValue = false;
      }
    }
    this.state.conditionsMet = newValue;
  }

  isOpen() {
    this.udateConditionsMet();
    return this.state.conditionsMet;
  }
}
