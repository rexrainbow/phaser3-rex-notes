import Buttons from '../buttons/Buttons.js';
import CreateButtons from './CreateButtons.js';
import MenuSetInteractive from './MenuSetInteractive.js';
import ShowSubMenu from './ShowSubMenu.js';
import Hide from './Hide.js';
import HideSubMenu from './HideSubMenu.js';

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
        var items = GetValue(config, 'items', undefined);
        var callback = GetValue(config, 'createButtonCallback', undefined);
        var scope = GetValue(config, 'createButtonCallbackScope', undefined);
        config.buttons = CreateButtons(scene, items, callback, scope);
        super(scene, config);
        this.type = 'rexMenuTree';
        this.items = items;
        this.root = GetValue(config, 'root', this);
        if (this.root === this) {
            this.easeIn = GetValue(config, 'easeIn', undefined);
            this.easeOut = GetValue(config, 'easeOut', undefined);
            this.bounds = GetValue(config, 'bounds', undefined);
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
            if (this.orientation === 0) { // x
                this.alignLeft(parent.left).alignTop(parent.bottom);
            } else { // y
                this.alignTop(parent.top).alignLeft(parent.right);
            }
        }
        this.pushIntoBounds(this.root.bounds);

        MenuSetInteractive(this);

        // Ease in menu
        if (this.root.easeIn) {
            this.popUp(this.root.easeIn);
        }
    }
}

var methods = {
    showSubMenu: ShowSubMenu,
    hide: Hide,
    hideSubMenu: HideSubMenu,
}

Object.assign(
    MenuTree.prototype,
    methods
);
export default MenuTree;