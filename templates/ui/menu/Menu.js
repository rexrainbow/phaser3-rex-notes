import Buttons from '../buttons/Buttons.js';
import Methods from './Methods.js';
import CreateBackground from './CreateBackground.js';
import CreateButtons from './CreateButtons.js';
import GetDefaultBounds from '../../../plugins/utils/defaultbounds/GetDefaultBounds.js';
import MenuSetInteractive from './MenuSetInteractive.js';
import GetEaseConfig from './GetEaseConfig.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Menu extends Buttons {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        // orientation
        if (!config.hasOwnProperty('orientation')) {
            config.orientation = 1;
        }
        // parent button
        var parent = GetValue(config, 'parent', undefined);
        // items
        var items = GetValue(config, 'items', undefined);
        // background
        var createBackgroundCallback = GetValue(config, 'createBackgroundCallback', undefined);
        var createBackgroundCallbackScope = GetValue(config, 'createBackgroundCallbackScope', undefined);
        config.background = CreateBackground(scene, items, createBackgroundCallback, createBackgroundCallbackScope);
        // buttons
        var items = GetValue(config, 'items', undefined);
        var createButtonCallback = GetValue(config, 'createButtonCallback', undefined);
        var createButtonCallbackScope = GetValue(config, 'createButtonCallbackScope', undefined);
        config.buttons = CreateButtons(scene, items, createButtonCallback, createButtonCallbackScope);
        super(scene, config);
        this.type = 'rexMenu';
        this.items = items;
        this.root = GetValue(config, 'root', this);
        if (this.root === this) {
            this.expandEventName = GetValue(config, 'expandEvent', 'button.click');
            this.easeIn = GetValue(config, 'easeIn', 0);
            if (typeof (this.easeIn) === 'number') {
                this.easeIn = { duration: this.easeIn };
            }
            this.easeOut = GetValue(config, 'easeOut', 0);
            if (typeof (this.easeOut) === 'number') {
                this.easeOut = { duration: this.easeOut };
            }
            this.bounds = GetValue(config, 'bounds', undefined);
            this.expandOrientation = GetValue(config, 'expandOrientation', undefined);
            if (this.expandOrientation === undefined) {
                var bounds = this.bounds;
                if (bounds === undefined) {
                    bounds = GetDefaultBounds(scene);
                }
                if (this.orientation === 0) { // x
                    // Expand down(1)/up(3)
                    this.expandOrientation = (this.y < bounds.centerY) ? 1 : 3;
                } else {
                    // Expand right(0)/left(2)
                    this.expandOrientation = (this.x < bounds.centerX) ? 0 : 2;
                }
            }
            this.toggleOrientation = GetValue(config, 'toggleOrientation', false);
            this.createBackgroundCallback = createBackgroundCallback;
            this.createBackgroundCallbackScope = createBackgroundCallbackScope;
            this.createButtonCallback = createButtonCallback;
            this.createButtonCallbackScope = createButtonCallbackScope;
            this.isPassedEvent = false;
        }
        this
            .setOrigin(0)
            .layout();

        // Set position to align parent
        if (parent) {
            switch (this.root.expandOrientation) {
                case 0: //Expand right
                    this.alignTop(parent.top).alignLeft(parent.right);
                    break;
                case 1: //Expand down
                    this.alignLeft(parent.left).alignTop(parent.bottom);
                    break;
                case 2: //Expand left
                    this.alignTop(parent.top).alignRight(parent.left);
                    break;
                case 3: //Expand up
                    this.alignLeft(parent.left).alignBottom(parent.top);
                    break;
            }
        }
        this.pushIntoBounds(this.root.bounds);

        MenuSetInteractive(this);

        // Ease in menu
        var easeIn = GetEaseConfig(this, this.root.easeIn);
        this.popUp(easeIn);
    }

    isInTouching(pointer) {
        if (super.isInTouching(pointer)) {
            return true;
        } else if (this.childrenMap.subMenu) {
            return this.childrenMap.subMenu.isInTouching(pointer);
        } else {
            return false;
        }
    }
}

Object.assign(
    Menu.prototype,
    Methods
);
export default Menu;