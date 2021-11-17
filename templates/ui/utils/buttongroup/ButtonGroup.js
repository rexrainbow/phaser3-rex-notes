import AddMethods from './AddMethods.js';
import FireEvent from './FireEvent.js';
import SetTypeMethods from './SetTypeMethods.js';

class ButtonGroup {
    constructor(config) {
        this.parent = config.parent;
        this.eventEmitter = config.eventEmitter;
        this.isInternalButtons = (this.eventEmitter !== this.parent);
        this.groupName = config.groupName;
        this.clickConfig = config.clickConfig;

        this.buttons = [];
    }
}

var methods = {
    fireEvent: FireEvent
}

Object.assign(
    ButtonGroup.prototype,
    AddMethods,
    SetTypeMethods,
    methods
);


export default ButtonGroup;