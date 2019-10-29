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

        // Orientation
        if (!config.hasOwnProperty('orientation')) {
            config.orientation = 1; // y
        }

        // Parent
        var rootMenu = config._rootMenu;
        var parentMenu = config._parentMenu;
        var parentButton = config._parentButton;
        // Items
        var items = GetValue(config, 'items', undefined);
        // Background
        var createBackgroundCallback = GetValue(config, 'createBackgroundCallback', undefined);
        var createBackgroundCallbackScope = GetValue(config, 'createBackgroundCallbackScope', undefined);
        config.background = CreateBackground(scene, items, createBackgroundCallback, createBackgroundCallbackScope);
        // Buttons
        var createButtonCallback = GetValue(config, 'createButtonCallback', undefined);
        var createButtonCallbackScope = GetValue(config, 'createButtonCallbackScope', undefined);
        config.buttons = CreateButtons(scene, items, createButtonCallback, createButtonCallbackScope);

        super(scene, config);
        this.type = 'rexMenu';

        this.items = items;        
        this.root = (rootMenu === undefined) ? this : rootMenu;
        this.parentMenu = parentMenu;
        this.parentButton = parentButton;
        var isRootMenu = (this.root === this);
        if (isRootMenu) {
            // Bounds
            var bounds = config.bounds;
            if (bounds === undefined) {
                bounds = GetDefaultBounds(scene);
            }
            this.bounds = bounds;

            // Expand mode
            this.expandEventName = GetValue(config, 'expandEvent', 'button.click');
            // toggleOrientation mode
            this.toggleOrientation = GetValue(config, 'toggleOrientation', false);
            // Transition
            this.easeIn = GetValue(config, 'easeIn', 0);
            if (typeof (this.easeIn) === 'number') {
                this.easeIn = { duration: this.easeIn };
            }
            this.easeOut = GetValue(config, 'easeOut', 0);
            if (typeof (this.easeOut) === 'number') {
                this.easeOut = { duration: this.easeOut };
            }
            // Callbacks
            this.createBackgroundCallback = createBackgroundCallback;
            this.createBackgroundCallbackScope = createBackgroundCallbackScope;
            this.createButtonCallback = createButtonCallback;
            this.createButtonCallbackScope = createButtonCallbackScope;

            // Event flag
            this._isPassedEvent = false;
        }
        this
            .setOrigin(0)
            .layout();

        var bounds = this.root.bounds;
        // Align to parentButton
        if (isRootMenu) {
            this.expandOrientation = [
                ((this.y < bounds.centerY) ? 1 : 3), // Expand down(1)/up(3)
                ((this.x < bounds.centerX) ? 0 : 2)  // Expand right(0)/left(2)
            ];

        } else { // Sub-menu, align to parent button
            var expandOrientation = this.root.expandOrientation[parentMenu.orientation];
            switch (expandOrientation) {
                case 0: //Expand right
                    this.alignTop(parentButton.top).alignLeft(parentButton.right);
                    break;
                case 1: //Expand down
                    this.alignLeft(parentButton.left).alignTop(parentButton.bottom);
                    break;
                case 2: //Expand left
                    this.alignTop(parentButton.top).alignRight(parentButton.left);
                    break;
                case 3: //Expand up
                    this.alignLeft(parentButton.left).alignBottom(parentButton.top);
                    break;
            }
        }
        this.pushIntoBounds(bounds);

        MenuSetInteractive(this);

        // Ease in menu
        this.popUp(GetEaseConfig(this, this.root.easeIn));
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