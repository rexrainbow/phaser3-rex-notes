import GridSizer from '../gridsizer/GridSizer.js';
import AddChildMethods from './AddChildMethods.js';
import RemoveChildMethods from './RemoveChildMethods.js';
import ButtonMethods from '../utils/buttons/ButtonMethods.js';
import SetType from '../utils/buttons/types/SetType.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class GridButtons extends GridSizer {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }
        var row = GetValue(config, 'row', 0);
        var col = GetValue(config, 'col', 0);
        var buttons = GetValue(config, 'buttons', undefined);
        var buttonsExpand = GetValue(config, 'expand', true);
        var buttonProportion = (buttonsExpand) ? 1 : 0;

        if (buttons !== undefined) {
            row = Math.max(row, buttons.length);
            for (var i = 0, cnt = buttons.length; i < cnt; i++) {
                col = Math.max(col, buttons[i].length);
            }
        }
        config.row = row;
        config.column = col;
        config.columnProportions = buttonProportion;
        config.rowProportions = buttonProportion;

        // Create        
        super(scene, config);
        this.type = 'rexGridButtons';
        this.eventEmitter = GetValue(config, 'eventEmitter', this);
        this.groupName = GetValue(config, 'groupName', undefined);
        this.buttons = [];

        // Add elements
        var background = GetValue(config, 'background', undefined);

        // Buttons properties
        this.buttonsExpand = buttonsExpand;
        var space = GetValue(config, 'space', undefined);
        if (typeof (space) === 'number') {
            space = { itemX: space, itemY: space };
        }
        this.clickConfig = GetValue(config, 'click', undefined);

        if (background) {
            this.addBackground(background);
        }

        if (buttons) {
            var rowButtons, button;
            for (var r = 0, rcnt = buttons.length; r < rcnt; r++) { // row
                rowButtons = buttons[r];
                for (var c = 0, ccnt = rowButtons.length; c < ccnt; c++) { // col
                    button = rowButtons[c];
                    if (button) {
                        this.addButton(button, c, r);
                    }
                }
            }
        }
        SetType.call(this, config);

        this.addChildrenMap('background', background);
        this.addChildrenMap('buttons', this.buttons);
    }
}

Object.assign(
    GridButtons.prototype,
    AddChildMethods,
    RemoveChildMethods,
    ButtonMethods
);

export default GridButtons;