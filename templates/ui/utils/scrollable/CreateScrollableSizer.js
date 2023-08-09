import GridSizer from '../../gridsizer/GridSizer.js';
import AddChild from './AddChild.js';
import AddSlider from './AddSlider.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var CreateScrollableSizer = function (parent, config) {
    var scene = parent.scene;

    var columnProportions = [0, 1, 0],
        rowProportions = [0, 1, 0];
    var parentMinWidth = GetValue(config, 'width');
    var parentMinHeight = GetValue(config, 'height');
    if (!parentMinWidth) {
        columnProportions[1] = 0;
    }
    if (!parentMinHeight) {
        rowProportions[1] = 0;
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