import Buttons from '../buttons/Buttons.js';
import CreateButtons from './CreateButtons.js';
import GetDefaultBounds from '../../../plugins/utils/defaultbounds/GetDefaultBounds.js';
import MenuSetInteractive from './MenuSetInteractive.js';
import ExpandSubMenu from './ExpandSubMenu.js';
import Collapse from './Collapse.js';
import CollapseSubMenu from './CollapseSubMenu.js';

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
        // buttons
        var items = GetValue(config, 'items', undefined);
        var callback = GetValue(config, 'createButtonCallback', undefined);
        var scope = GetValue(config, 'createButtonCallbackScope', undefined);
        config.buttons = CreateButtons(scene, items, callback, scope);
        super(scene, config);
        this.type = 'rexMenu';
        this.items = items;
        this.root = GetValue(config, 'root', this);
        if (this.root === this) {
            this.expandEventName = GetValue(config, 'expandEvent', 'button.click');
            this.easeIn = GetValue(config, 'easeIn', undefined);
            this.easeOut = GetValue(config, 'easeOut', undefined);
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
            this.createButtonCallback = callback;
            this.createButtonCallbackScope = scope;
            this.isPassedEvent = false;
        }
        this
            .setOrigin(0)
            .layout();

        // Set position to align parent
        var parent = GetValue(config, 'parent', undefined);
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
        if (this.root.easeIn) {
            this.popUp(this.root.easeIn);
        }
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

var methods = {
    expandSubMenu: ExpandSubMenu,
    collapse: Collapse,
    collapseSubMenu: CollapseSubMenu,
}

Object.assign(
    Menu.prototype,
    methods
);
export default Menu;