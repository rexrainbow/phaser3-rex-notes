import GridSizer from '../../gridsizer/GridSizer.js';
import AddChild from './AddChild.js';
import AddSlider from './AddSlider.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var CreateScrollableSizer = function (parent, config) {
    var scene = parent.scene;

    var isScrollXY = (parent.scrollMode === 2);
    var childExpandWidth = GetValue(config, 'child.expandWidth', true);
    var childExpandHeight = GetValue(config, 'child.expandHeight', true);
    var childColProportion = (isScrollXY || childExpandWidth) ? 1 : 0;
    var childRowProportion = (isScrollXY || childExpandHeight) ? 1 : 0;
    var scrollableSizer = new GridSizer(scene, {
        column: 3, row: 3,
        columnProportions: [0, childColProportion, 0],
        rowProportions: [0, childRowProportion, 0]
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