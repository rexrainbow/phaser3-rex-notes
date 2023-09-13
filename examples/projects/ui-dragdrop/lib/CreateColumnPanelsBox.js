import { COLOR_LIGHT, COLOR_PRIMARY, COLOR_DARK } from './Const.js';
import CreateColumnPanel from './CreateColumnPanel.js';
import AddDragDropColumnPanelBehavior from './AddDragDropColumnPanelBehavior.js';

var CreateColumnPanelsBox = function (scene, itemCountArray) {
    var columnPanelsBox = scene.rexUI.add.sizer({
        orientation: 'x',
        space: {
            left: 10, right: 10, top: 10, bottom: 10
        },
    })
    // .addBackground(
    //     scene.rexUI.add.roundRectangle({
    //         strokeColor: COLOR_PRIMARY,
    //         strokeWidth: 3,
    //     }),
    //     'background'
    // )

    for (var i = 0, cnt = itemCountArray.length; i < cnt; i++) {
        var columnPanel = CreateColumnPanel(scene, `Header ${i}`, itemCountArray[i]);
        columnPanelsBox.add(
            columnPanel,
            { proportion: 0, expand: true }
        )
    }

    AddDragDropColumnPanelBehavior(columnPanelsBox);

    return columnPanelsBox;
}

export default CreateColumnPanelsBox;