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
        config.columnProportions = [0, 0, 0];
        config.rowProportions = [0, 0, 0];

        var expandPanel = GetValue(config, 'expand.panel', false);
        if (expandPanel) {
            config.columnProportions[1] = 1;
            config.rowProportions[1] = 1;
        }

        super(scene, config);
        this.type = 'rexTabs';
        this.eventEmitter = GetValue(config, 'eventEmitter', this);

        // Add elements
        var background = GetValue(config, 'background', undefined);
        var panel = GetValue(config, 'panel', undefined);
        var leftButtons = GetValue(config, 'leftButtons', undefined);
        var leftButtonsBackground = GetValue(config, 'leftButtonsBackground', undefined);
        var leftButtonsSizer;
        var rightButtons = GetValue(config, 'rightButtons', undefined);
        var rightButtonsBackground = GetValue(config, 'rightButtonsBackground', undefined);
        var rightButtonsSizer;
        var topButtons = GetValue(config, 'topButtons', undefined);
        var topButtonsBackground = GetValue(config, 'topButtonsBackground', undefined);
        var topButtonsSizer;
        var bottomButtons = GetValue(config, 'bottomButtons', undefined);
        var bottomButtonsBackground = GetValue(config, 'bottomButtonsBackground', undefined);
        var bottomButtonsSizer;
        var clickConfig = GetValue(config, 'click', undefined);

        if (background) {
            this.addBackground(background);
        }

        if (panel) {
            this.add(panel,
                {
                    column: 1,
                    row: 1,
                    expand: expandPanel
                }
            );
        }

        if (leftButtons) {
            var leftButtonsOffset = GetValue(config, 'space.leftButtonsOffset', 0);
            var leftButtonSpace = GetValue(config, 'space.leftButton', 0);
            var leftButtonExpand = GetValue(config, 'expand.leftButtons', false);
            var leftButtonsAlign = GetValue(config, 'align.leftButtons', 'top');
            leftButtonsSizer = new Buttons(scene, {
                groupName: 'left',
                background: leftButtonsBackground,
                buttons: leftButtons,
                orientation: 'y', // Top-Bottom
                space: { item: leftButtonSpace },
                expand: leftButtonExpand,
                click: clickConfig,
                eventEmitter: this.eventEmitter,
            });
            this.add(leftButtonsSizer,
                {
                    column: 0,
                    row: 1,
                    align: leftButtonsAlign,
                    padding: { top: leftButtonsOffset, },
                    expand: leftButtonExpand
                }
            );
        }

        if (rightButtons) {
            var rightButtonsOffset = GetValue(config, 'space.rightButtonsOffset', 0);
            var rightButtonSpace = GetValue(config, 'space.rightButton', 0);
            var rightButtonExpand = GetValue(config, 'expand.rightButtons', false);
            var rightButtonsAlign = GetValue(config, 'align.rightButtons', 'top');
            rightButtonsSizer = new Buttons(scene, {
                groupName: 'right',
                background: rightButtonsBackground,
                buttons: rightButtons,
                orientation: 'y', // Top-Bottom
                space: { item: rightButtonSpace },
                expand: rightButtonExpand,
                click: clickConfig,
                eventEmitter: this.eventEmitter,
            });
            this.add(rightButtonsSizer,
                {
                    column: 2,
                    row: 1,
                    align: rightButtonsAlign,
                    padding: { top: rightButtonsOffset, },
                    expand: rightButtonExpand
                }
            );
        }

        if (topButtons) {
            var toptButtonsOffset = GetValue(config, 'space.topButtonsOffset', 0);
            var topButtonSpace = GetValue(config, 'space.topButton', 0);
            var topButtonExpand = GetValue(config, 'expand.topButtons', false);
            var topButtonsAlign = GetValue(config, 'align.topButtons', 'left');
            topButtonsSizer = new Buttons(scene, {
                groupName: 'top',
                background: topButtonsBackground,
                buttons: topButtons,
                orientation: 'x', // Left-Right
                space: { item: topButtonSpace },
                expand: topButtonExpand,
                align: GetValue(config, 'align.topButtons', undefined),
                click: clickConfig,
                eventEmitter: this.eventEmitter,
            });
            this.add(topButtonsSizer,
                {
                    column: 1,
                    row: 0,
                    align: topButtonsAlign,
                    padding: { left: toptButtonsOffset, },
                    expand: topButtonExpand
                }
            );
        }

        if (bottomButtons) {
            var bottomButtonsOffset = GetValue(config, 'space.bottomButtonsOffset', 0);
            var bottomButtonSpace = GetValue(config, 'space.bottomButton', 0);
            var bottomButtonExpand = GetValue(config, 'expand.bottomButtons', false);
            var bottomButtonsAlign = GetValue(config, 'align.bottomButtons', 'left');
            bottomButtonsSizer = new Buttons(scene, {
                groupName: 'bottom',
                background: bottomButtonsBackground,
                buttons: bottomButtons,
                orientation: 'x', // Left-Right
                space: { item: bottomButtonSpace },
                expand: bottomButtonExpand,
                align: GetValue(config, 'align.bottomButtons', undefined),
                click: clickConfig,
                eventEmitter: this.eventEmitter,
            });
            this.add(bottomButtonsSizer,
                {
                    column: 1,
                    row: 2,
                    align: bottomButtonsAlign,
                    padding: { left: bottomButtonsOffset, },
                    expand: bottomButtonExpand
                }
            );
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