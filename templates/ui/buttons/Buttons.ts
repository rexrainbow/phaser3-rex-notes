import Sizer from '../sizer/Sizer';
import AddChildMethods from './AddChildMethods';
import RemoveChildMethods from './RemoveChildMethods';
import ButtonGroup from '../utils/buttongroup/ButtonGroup';
import ButtonMethods from '../utils/buttongroup/ButtonMethods';
import ButtonStateMethods from '../utils/buttongroup/ButtonStateMethods';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

class Buttons extends Sizer {
    addBackground: any;
    addButtons: any;
    addChildrenMap: any;
    buttonGroup: any;
    buttonsAlign: any;
    buttonsExpand: any;
    ignoreDestroy: any;
    scene: any;
    type: any;

    constructor(scene?: any, config?: any) {
        if (config === undefined) {
            config = {};
        }

        var buttonSpace = config.space;
        if (typeof (buttonSpace) === 'number') {
            config.space = { item: buttonSpace };
        }

        // Create
        super(scene, config);
        this.type = 'rexButtons';
        this.buttonGroup = new ButtonGroup({
            parent: this,
            eventEmitter: GetValue(config, 'eventEmitter', this),
            groupName: GetValue(config, 'groupName', undefined),
            clickConfig: GetValue(config, 'click', undefined)
        })
            .setButtonsType(config)

        // Add elements
        var background = GetValue(config, 'background', undefined);
        var buttons = GetValue(config, 'buttons', undefined);

        // Buttons properties
        this.buttonsExpand = GetValue(config, 'expand', false);
        this.buttonsAlign = GetValue(config, 'align', undefined); // undefined/left/top: no space                

        if (background?: any) {
            this.addBackground(background);
        }

        if (buttons?: any) {
            this.addButtons(buttons);
        }

        this.addChildrenMap('background', background);
        this.addChildrenMap('buttons', this.buttonGroup.buttons);
    }

    destroy(fromScene?: any) {
        //  This Game Object has already been destroyed
        if (!this.scene || this.ignoreDestroy) {
            return;
        }

        super.destroy(fromScene);
        this.buttonGroup.destroy();
        this.buttonGroup = undefined;
    }

    get buttons() {
        return this.buttonGroup.buttons;
    }

    get groupName() {
        return this.buttonGroup.groupName;
    }

    set groupName(value) {
        this.buttonGroup.groupName = value;
    }

    get eventEmitter() {
        return this.buttonGroup.eventEmitter;
    }
}

Object.assign(
    Buttons.prototype,
    AddChildMethods,
    RemoveChildMethods,
    ButtonMethods,
    ButtonStateMethods
);

export default Buttons;