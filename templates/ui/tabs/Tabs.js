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
            var buttonsSizer = CreateTab(leftButtons, 1, leftButtonSpace);
            var padding = {
                left: paddingLeft,
                top: leftButtonsOffset,
            };
            this.add(buttonsSizer, 0, 1, undefined, padding, false);
        }

        if (rightButtons) {
            var buttonsSizer = CreateTab(rightButtons, 1, rightButtonSpace);
            var padding = {
                right: paddingRight,
                top: rightButtonsOffset,
            };
            this.add(buttonsSizer, 2, 1, undefined, padding, false);
        }

        if (topButtons) {
            var buttonsSizer = CreateTab(topButtons, 0, topButtonSpace);
            var padding = {
                top: paddingTop,
                left: toptButtonsOffset,
            };
            this.add(buttonsSizer, 1, 0, undefined, padding, false);
        }

        if (bottomButtons) {
            var buttonsSizer = CreateTab(bottomButtons, 0, bottomButtonSpace);
            var padding = {
                bottom: paddingBottom,
                left: bottomButtonsOffset,
            };
            this.add(buttonsSizer, 1, 2, undefined, padding, false);
        }


        this.childrenMap = {};
        this.childrenMap.background = background;
        this.childrenMap.leftButtons = leftButtons;
        this.childrenMap.rightButtons = rightButtons;
        this.childrenMap.topButtons = topButtons;
        this.childrenMap.bottomButtons = bottomButtons;
    }
}

var CreateTab = function (buttons, orientation, space) {
    var scene = buttons[0].scene;
    var buttonsSizer = new Sizer(scene, {
        orientation: orientation
    });

    var padding = 0;
    for (var i = 0, cnt = buttons.length; i < cnt; i++) {
        if (i >= 1) {
            padding = {
                left: (orientation === 0) ? space : 0,
                right: 0,
                top: (orientation === 1) ? space : 0,
                bottom: 0
            }
        }

        buttonsSizer.add(buttons[i], 0, 'center', padding, true);
    }
    return buttonsSizer;
}

export default Tabs;