import GridSizer from '../../../gridsizer/GridSizer';
import AddChild from './AddChild';
import AddSlider from './AddSlider';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

var CreateScrollableSizer = function(parent?: any, config?: any) {
    var scene = parent.scene;

    var columnProportions = [0, 1, 0],
        rowProportions = [0, 1, 0];
    var parentMinWidth = GetValue(config, 'width');
    var parentMinHeight = GetValue(config, 'height');
    if (!parentMinWidth) {
        var expandChildWidth = GetValue(config, 'child.expandWidth', true);
        if (!expandChildWidth) {
            columnProportions[1] = 0;  // Calculate parent's width by child's width
        }
    }
    if (!parentMinHeight) {
        var expandChildHeight = GetValue(config, 'child.expandHeight', true);
        if (!expandChildHeight) {
            rowProportions[1] = 0;    // Calculate parent's height by child's height
        }
    }

    var scrollableSizer = new GridSizer(scene, {
        column: 3, row: 3,
        columnProportions: columnProportions,
        rowProportions: rowProportions
    });

    AddChild(parent, scrollableSizer, config);

    switch (parent.scrollMode) {
        case 0:  // y
            AddSlider(parent, scrollableSizer, 'y', config);
            break;
        case 1:  // x
            AddSlider(parent, scrollableSizer, 'x', config);
            break;

        default: // xy
            AddSlider(parent, scrollableSizer, 'y', config);
            AddSlider(parent, scrollableSizer, 'x', config);
            break;
    }

    return scrollableSizer;
}

export default CreateScrollableSizer;