import Sizer from '../sizer/Sizer.js';
import GetElement from '../utils/GetElement.js';
import ButtonSetInteractive from '../utils/ButtonSetInteractive.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Buttons extends Sizer {
    constructor(scene, config) {
        if (config === undefined) {
            config = defaultConfig;
        }
        // Create 
        super(scene, config);
        this.type = 'rexButtons';
        this.eventEmitter = GetValue(config, 'eventEmitter', this);

        // Add elements
        var background = GetValue(config, 'background', undefined);
        var buttons = GetValue(config, 'buttons', undefined);
        if (buttons && buttons.length === 0) {
            buttons = undefined;
        }

        // Space
        var buttonSpace = GetValue(config, 'space', 0);

        if (background) {
            this.addBackground(background);
        }

        if (buttons) {
            var groupName = GetValue(config, 'groupName', undefined);
            if (this.orientation === 0) {
                var buttonsAlign = GetValue(config, 'align', 'center');
                var button, proportion;
                for (var i = 0, cnt = buttons.length; i < cnt; i++) {
                    button = buttons[i];
                    // Add to sizer
                    var padding = {
                        left: (i >= 1) ? buttonSpace : 0,
                        right: 0,
                        top: 0,
                        bottom: 0
                    }
                    switch (buttonsAlign) {
                        case 'left':
                            proportion = 0;
                            break;
                        case 'right':
                            proportion = (i === 0) ? 1 : 0;
                            break;
                        default:
                            proportion = 1;
                            break;
                    }
                    this.add(button, proportion, buttonsAlign, padding, true);
                    ButtonSetInteractive.call(this, button, groupName, i);
                }
            } else {
                var button;
                for (var i = 0, cnt = buttons.length; i < cnt; i++) {
                    button = buttons[i];
                    // Add to sizer
                    var padding = {
                        left: 0,
                        right: 0,
                        top: (i >= 1) ? buttonSpace : 0,
                        bottom: 0
                    }
                    this.add(button, 0, 'center', padding, true);
                    ButtonSetInteractive.call(this, button, groupName, i);
                }
            }
        }

        this.childrenMap = {};
        this.childrenMap.background = background;
        this.childrenMap.buttons = buttons;
    }
}


var methods = {
    getElement: GetElement,
}
Object.assign(
    Buttons.prototype,
    methods
);

const defaultConfig = {};

export default Buttons;