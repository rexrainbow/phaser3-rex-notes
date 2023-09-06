import { COLOR_LIGHT, COLOR_PRIMARY, COLOR_DARK } from './Const.js';

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
            left: 10,
            right: 10,
            top: 10,
            bottom: 10,
        },

    })

    // Advance : Define Item by extending Label class
    item.onDragStart = OnItemDragStart.bind(item);
    item.onDragEnd = OnItemDragEnd.bind(item);

    return item;
}

var OnItemDragStart = function () {
    this.setDepth(1);
    this.getElement('background').setStrokeStyle(3, 0xff0000);
}

var OnItemDragEnd = function () {
    this.setDepth(0);
    this.getElement('background').setStrokeStyle();
}

export default CreateItem;