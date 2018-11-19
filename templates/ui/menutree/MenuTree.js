import Buttons from '../buttons/Buttons.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class MenuTree extends Buttons {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        // orientation
        if (!config.hasOwnProperty('orientation')) {
            config.orientation = 1;
        }
        // buttons
        var items = GetValue(config, 'items', undefined),
            item;
        var callback = GetValue(config, 'createButtonCallback', undefined);
        var scope = GetValue(config, 'createButtonCallbackScope', undefined);
        var buttons = [],
            button;
        if (items && callback) {
            for (var i = 0, cnt = items.length; i < cnt; i++) {
                item = items[i];
                if (scope) {
                    button = callback.call(scope, scene, item, i);
                } else {
                    button = callback(scene, item, i);
                }
                buttons.push(button);
            }
        }
        config.buttons = buttons;
        super(scene, config);
        this.type = 'rexMenuTree';
        this
            .setOrigin(0)
            .layout();

        // Set position to align parent
        var parent = GetValue(config, 'parent', undefined);
        if (parent) {
            if (this.orientation === 0) { // x
                this.alignLeft(parent.left).alignTop(parent.bottom);
            } else { // y
                this.alignTop(parent.top).alignLeft(parent.right);
            }
        }

        // Ease in menu
        var easeIn = GetValue(config, 'easeIn', undefined);
        if (easeIn) {
            this.popUp(easeIn);
        }
        var easeOut = GetValue(config, 'easeIn', undefined);

        this.items = items;
    }
}

export default MenuTree;