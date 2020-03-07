import GridSizer from '../gridsizer/GridSizer.js';
import Buttons from '../buttons/Buttons.js';
import ButtonMethods from './ButtonMethods.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Tabs extends GridSizer {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }
        // Create sizer
        config.column = 3;
        config.row = 3;
        super(scene, config);
        this.type = 'rexTabs';
        this.eventEmitter = GetValue(config, 'eventEmitter', this);

        // Add elements
        var background = GetValue(config, 'background', undefined);
        var panel = GetValue(config, 'panel', undefined);
        var leftButtons = GetValue(config, 'leftButtons', undefined);
        var leftButtonsBackground = GetValue(config, 'leftButtonsBackground', undefined);
        if (leftButtons && leftButtons.length === 0) {
            leftButtons = undefined;
        }
        var leftButtonsSizer;
        var rightButtons = GetValue(config, 'rightButtons', undefined);
        var rightButtonsBackground = GetValue(config, 'rightButtonsBackground', undefined);
        if (rightButtons && rightButtons.length === 0) {
            rightButtons = undefined;
        }
        var rightButtonsSizer;
        var topButtons = GetValue(config, 'topButtons', undefined);
        var topButtonsBackground = GetValue(config, 'topButtonsBackground', undefined);
        if (topButtons && topButtons.length === 0) {
            topButtons = undefined;
        }
        var topButtonsSizer;
        var bottomButtons = GetValue(config, 'bottomButtons', undefined);
        var bottomButtonsBackground = GetValue(config, 'bottomButtonsBackground', undefined);
        if (bottomButtons && bottomButtons.length === 0) {
            bottomButtons = undefined;
        }
        var bottomButtonsSizer;
        var clickConfig = GetValue(config, 'click', undefined);

        // Space
        var paddingLeft = GetValue(config, 'space.left', 0);
        var paddingRight = GetValue(config, 'space.right', 0);
        var paddingTop = GetValue(config, 'space.top', 0);
        var paddingBottom = GetValue(config, 'space.bottom', 0);

        if (background) {
            this.addBackground(background);
        }

        if (panel) {
            var padding = {
                left: (leftButtons) ? 0 : paddingLeft,
                right: (rightButtons) ? 0 : paddingRight,
                top: (topButtons) ? 0 : paddingTop,
                bottom: (bottomButtons) ? 0 : paddingBottom
            };
            this.add(panel, 1, 1, 'center', padding, true);
        }

        if (leftButtons) {
            var leftButtonsOffset = GetValue(config, 'space.leftButtonsOffset', 0);
            var leftButtonSpace = GetValue(config, 'space.leftButton', 0);
            leftButtonsSizer = new Buttons(scene, {
                groupName: 'left',
                background: leftButtonsBackground,
                buttons: leftButtons,
                orientation: 1, // Top-Bottom
                space: leftButtonSpace,
                align: GetValue(config, 'align.leftButtons', undefined),
                click: clickConfig,
                eventEmitter: this.eventEmitter,
            });
            var padding = {
                left: paddingLeft,
                top: leftButtonsOffset,
            };
            this.add(leftButtonsSizer, 0, 1, 'top', padding, false);
        }

        if (rightButtons) {
            var rightButtonsOffset = GetValue(config, 'space.rightButtonsOffset', 0);
            var rightButtonSpace = GetValue(config, 'space.rightButton', 0);
            rightButtonsSizer = new Buttons(scene, {
                groupName: 'right',
                background: rightButtonsBackground,
                buttons: rightButtons,
                orientation: 1, // Top-Bottom
                space: rightButtonSpace,
                align: GetValue(config, 'align.rightButtons', undefined),
                click: clickConfig,
                eventEmitter: this.eventEmitter,
            });
            var padding = {
                right: paddingRight,
                top: rightButtonsOffset,
            };
            this.add(rightButtonsSizer, 2, 1, 'top', padding, false);
        }

        if (topButtons) {
            var toptButtonsOffset = GetValue(config, 'space.topButtonsOffset', 0);
            var topButtonSpace = GetValue(config, 'space.topButton', 0);
            topButtonsSizer = new Buttons(scene, {
                groupName: 'top',
                background: topButtonsBackground,
                buttons: topButtons,
                orientation: 0, // Left-Right
                space: topButtonSpace,
                align: GetValue(config, 'align.topButtons', undefined),
                click: clickConfig,
                eventEmitter: this.eventEmitter,
            });
            var padding = {
                top: paddingTop,
                left: toptButtonsOffset,
            };
            this.add(topButtonsSizer, 1, 0, 'left', padding, false);
        }

        if (bottomButtons) {
            var bottomButtonsOffset = GetValue(config, 'space.bottomButtonsOffset', 0);
            var bottomButtonSpace = GetValue(config, 'space.bottomButton', 0);
            bottomButtonsSizer = new Buttons(scene, {
                groupName: 'bottom',
                background: bottomButtonsBackground,
                buttons: bottomButtons,
                orientation: 0, // Left-Right
                space: bottomButtonSpace,
                align: GetValue(config, 'align.bottomButtons', undefined),
                click: clickConfig,
                eventEmitter: this.eventEmitter,
            });
            var padding = {
                bottom: paddingBottom,
                left: bottomButtonsOffset,
            };
            this.add(bottomButtonsSizer, 1, 2, 'left', padding, false);
        }

        this.addChildrenMap('background', background);
        this.addChildrenMap('panel', panel);
        this.addChildrenMap('leftButtons', leftButtons);
        this.addChildrenMap('rightButtons', rightButtons);
        this.addChildrenMap('topButtons', topButtons);
        this.addChildrenMap('bottomButtons', bottomButtons);
        this.addChildrenMap('leftButtonsSizer', leftButtonsSizer);
        this.addChildrenMap('rightButtonsSizer', rightButtonsSizer);
        this.addChildrenMap('topButtonsSizer', topButtonsSizer);
        this.addChildrenMap('bottomButtonsSizer', bottomButtonsSizer);
    }
}

Object.assign(
    Tabs.prototype,
    ButtonMethods
);

export default Tabs;