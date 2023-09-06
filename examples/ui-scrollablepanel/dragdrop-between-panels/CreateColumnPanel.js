import { COLOR_LIGHT, COLOR_PRIMARY, COLOR_DARK } from './Const.js';
import CreateItem from './CreateItem.js';
import AddDragDropItemBehavior from './AddDragDropItemBehavior.js';

var CreateColumnPanel = function (scene, title, itemCount) {
    var panel = scene.rexUI.add.dialog({
        width: 120,

        space: { left: 10, right: 10, top: 10, bottom: 10 },

        background: scene.rexUI.add.roundRectangle({
            strokeColor: COLOR_DARK,
        }),

        title: CreateTitle(scene, title),
        content: CreateItemsBox(scene, itemCount),
    })

    // Advance : Define ColumnPanel by extending Dialog class
    panel.onDragStart = OnPanelDragStart.bind(panel);
    panel.onDragEnd = OnPanelDragEnd.bind(panel);

    return panel;
}

var CreateTitle = function (scene, text) {
    return scene.rexUI.add.label({
        background: scene.rexUI.add.roundRectangle({
            color: COLOR_LIGHT
        }),

        text: scene.add.text(0, 0, text, {
            fontSize: 18
        }),

        align: 'left',
        space: {
            left: 5, right: 5, top: 5, bottom: 5,
        },

    })
}

var CreateItemsBox = function (scene, itemCount) {
    var itemsBox = scene.rexUI.add.sizer({
        orientation: 'y',
        space: {
            left: 5, right: 5, top: 5, bottom: 5,
            item: 5
        },

        name: 'ItemsBox'
    })

    for (var i = 0; i < itemCount; i++) {
        itemsBox.add(
            CreateItem(scene, i.toString()),
            { proportion: 0, expand: true }
        )
    }

    AddDragDropItemBehavior(itemsBox);

    return itemsBox;
}

var OnPanelDragStart = function () {
    this.setDepth(1);
    this.getElement('background').setStrokeStyle(3, 0xff0000);
}

var OnPanelDragEnd = function () {
    this.setDepth(0);
    this.getElement('background').setStrokeStyle(2, COLOR_DARK);
}

export default CreateColumnPanel;