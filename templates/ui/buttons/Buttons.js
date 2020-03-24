import Sizer from '../sizer/Sizer.js';
import AddChildMethods from './AddChildMethods.js';
import RemoveChildMethods from './RemoveChildMethods.js';
import ButtonMethods from './ButtonMethods.js';
import SetType from './types/SetType.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Buttons extends Sizer {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }
        // Create 
        super(scene, config);
        this.type = 'rexButtons';
        this.eventEmitter = GetValue(config, 'eventEmitter', this);
        this.groupName = GetValue(config, 'groupName', undefined);
        this.buttons = [];

        // Add elements
        var background = GetValue(config, 'background', undefined);
        var buttons = GetValue(config, 'buttons', undefined);

        // Buttons properties
        this.buttonsExpand = GetValue(config, 'expand', false);
        this.buttonsAlign = GetValue(config, 'align', undefined); // undefined/left/top: no space
        // Button properties
        this.buttonProportion = (this.buttonsExpand) ? 1 : 0;
        this.buttonSpace = GetValue(config, 'space', 0);
        this.clickConfig = GetValue(config, 'click', undefined);

        if (background) {
            this.addBackground(background);
        }

        if (buttons) {
            this.add(buttons);
        }
        SetType.call(this, config);

        this.addChildrenMap('background', background);
        this.addChildrenMap('buttons', this.buttons);
    }
}

Object.assign(
    Buttons.prototype,
    AddChildMethods,
    RemoveChildMethods,
    ButtonMethods
);

export default Buttons;