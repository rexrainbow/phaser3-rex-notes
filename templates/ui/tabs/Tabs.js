import GridSizer from '../gridsizer/GridSizer.js';
import Sizer from '../sizer/Sizer.js';
import GetElement from '../utils/GetElement.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Tabs extends GridSizer {
    constructor(scene, config) {
        // Create sizer
        var x = GetValue(config, 'x', 0);
        var y = GetValue(config, 'y', 0);
        var minWidth = GetValue(config, 'width', 0);
        var minHeight = GetValue(config, 'height', 0);
        super(scene, x, y, minWidth, minHeight, 3, 3);
        scene.add.existing(this);
        this.type = 'rexTabs';

        // Add elements
        var background = GetValue(config, 'background', undefined);
        var panel = GetValue(config, 'panel', undefined);
        var leftButtons = GetValue(config, 'leftButtons', undefined);
        if (leftButtons && leftButtons.length === 0) {
            leftButtons = undefined;
        }
        var rightButtons = GetValue(config, 'rightButtons', undefined);
        if (rightButtons && rightButtons.length === 0) {
            rightButtons = undefined;
        }
        var topButtons = GetValue(config, 'topButtons', undefined);
        if (topButtons && topButtons.length === 0) {
            topButtons = undefined;
        }
        var bottomButtons = GetValue(config, 'bottomButtons', undefined);
        if (bottomButtons && bottomButtons.length === 0) {
            bottomButtons = undefined;
        }

        // Space
        var paddingLeft = GetValue(config, 'space.left', 0);
        var paddingRight = GetValue(config, 'space.right', 0);
        var paddingTop = GetValue(config, 'space.top', 0);
        var paddingBottom = GetValue(config, 'space.bottom', 0);
        var leftButtonsOffset = GetValue(config, 'space.leftButtonsOffset', 0);
        var rightButtonsOffset = GetValue(config, 'space.rightButtonsOffset', 0);
        var toptButtonsOffset = GetValue(config, 'space.topButtonsOffset', 0);
        var bottomButtonsOffset = GetValue(config, 'space.bottomButtonsOffset', 0);
        var leftButtonSpace = GetValue(config, 'space.leftButton', 0);
        var rightButtonSpace = GetValue(config, 'space.rightButton', 0);
        var topButtonSpace = GetValue(config, 'space.topButton', 0);
        var bottomButtonSpace = GetValue(config, 'space.bottomButton', 0);


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
            this.add(panel, 1, 1, undefined, padding, false);
        }

        if (leftButtons) {
            var buttonsSizer = CreateTab(this, leftButtons, 1, leftButtonSpace, 'left');
            var padding = {
                left: paddingLeft,
                top: leftButtonsOffset,
            };
            this.add(buttonsSizer, 0, 1, undefined, padding, false);
        }

        if (rightButtons) {
            var buttonsSizer = CreateTab(this, rightButtons, 1, rightButtonSpace, 'right');
            var padding = {
                right: paddingRight,
                top: rightButtonsOffset,
            };
            this.add(buttonsSizer, 2, 1, undefined, padding, false);
        }

        if (topButtons) {
            var buttonsSizer = CreateTab(this, topButtons, 0, topButtonSpace, 'top');
            var padding = {
                top: paddingTop,
                left: toptButtonsOffset,
            };
            this.add(buttonsSizer, 1, 0, undefined, padding, false);
        }

        if (bottomButtons) {
            var buttonsSizer = CreateTab(this, bottomButtons, 0, bottomButtonSpace, 'bottom');
            var padding = {
                bottom: paddingBottom,
                left: bottomButtonsOffset,
            };
            this.add(buttonsSizer, 1, 2, undefined, padding, false);
        }


        this.childrenMap = {};
        this.childrenMap.background = background;
        this.childrenMap.panel = panel;
        this.childrenMap.leftButtons = leftButtons;
        this.childrenMap.rightButtons = rightButtons;
        this.childrenMap.topButtons = topButtons;
        this.childrenMap.bottomButtons = bottomButtons;
    }

    emitButtonClick(groupName, index) {
        var button = this.getElement(groupName + 'Buttons[' + index + ']');
        if (!button) {
            return this;
        }
        this.emit('button.click', button, groupName, index);
        return this;
    }
}

var CreateTab = function (tabs, buttons, orientation, space, groupName) {
    var scene = tabs.scene;
    var buttonsSizer = new Sizer(scene, {
        orientation: orientation
    });

    var button;
    var padding = 0;
    for (var i = 0, cnt = buttons.length; i < cnt; i++) {
        button = buttons[i];
        if (i >= 1) {
            padding = {
                left: (orientation === 0) ? space : 0,
                right: 0,
                top: (orientation === 1) ? space : 0,
                bottom: 0
            }
        }

        buttonsSizer.add(buttons[i], 0, 'center', padding, true);
        // Add click callback
        button
            .setInteractive()
            .on('pointerdown', fireEvent('button.click', button, groupName, i), tabs)
            .on('pointerover', fireEvent('button.over', button, groupName, i), tabs)
            .on('pointerout', fireEvent('button.out', button, groupName, i), tabs)
    }
    return buttonsSizer;
}

var fireEvent = function (eventName, button, groupName, index) {
    return function () {
        this.emit(eventName, button, groupName, index);
    }
}

var methods = {
    getElement: GetElement,
}
Object.assign(
    Tabs.prototype,
    methods
);

export default Tabs;