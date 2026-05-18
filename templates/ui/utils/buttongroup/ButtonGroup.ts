import AddMethods from './AddMethods';
import RemoveMethods from './RemoveMethods';
import FireEvent from './FireEvent';
import ButtonsTypeMethods from './ButtonsTypeMethods';
import ButtonMethods from './ButtonMethods';

class ButtonGroup {
    buttons: any;
    buttonsType: any;
    clickConfig: any;
    eventEmitter: any;
    groupName: any;
    parent: any;

    constructor(config?: any) {
        this.parent = config.parent;
        this.eventEmitter = config.eventEmitter;
        this.groupName = config.groupName;
        this.clickConfig = config.clickConfig;

        this.buttonsType = undefined;
        this.buttons = [];
    }

    destroy() {
        this.parent = undefined;
        this.eventEmitter = undefined;
        this.clickConfig = undefined;
        this.buttons = undefined; // GameObjects will be destroyed outside
    }
}

var methods = {
    fireEvent: FireEvent
}

Object.assign(
    ButtonGroup.prototype,
    AddMethods,
    RemoveMethods,
    ButtonsTypeMethods,
    ButtonMethods,
    methods
);


export default ButtonGroup;