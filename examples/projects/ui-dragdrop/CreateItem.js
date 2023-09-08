import { COLOR_LIGHT, COLOR_PRIMARY, COLOR_DARK } from './Const.js';
import { DefaultDepth, DragObjectDepth } from './Const.js';

var CreateItem = function (scene, text) {
    var item = scene.rexUI.add.label({
        background: scene.rexUI.add.roundRectangle({
            radius: 10,
            color: COLOR_PRIMARY
        }),
        text: scene.add.text(0, 0, text, {
            fontSize: 18
        }),

        align: 'center',
        space: {
            left: 5, right: 5, top: 5, bottom: 5,
        },

    })

    SetDraggable(item);

    return item;
}

var SetDraggable = function (item) {
    // Drag item by itself
    item
        .setDraggable({
            sensor: item,
            target: item
        })

        // Change appearance of item
        .on('sizer.dragstart', OnItemDragStart, item)
        .on('sizer.dragend', OnItemDragEnd, item)
}

var OnItemDragStart = function () {
    this.setDepth(DragObjectDepth);
    this.getElement('background').setStrokeStyle(3, 0xff0000);
}

var OnItemDragEnd = function () {
    this.setDepth(DefaultDepth);
    this.getElement('background').setStrokeStyle();
}

export default CreateItem;