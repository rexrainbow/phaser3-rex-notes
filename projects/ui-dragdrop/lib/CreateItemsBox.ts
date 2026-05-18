import { COLOR_LIGHT, COLOR_MAIN, COLOR_DARK } from './Const';
import CreateItem from './CreateItem';
import AddDragDropItemBehavior from './AddDragDropItemBehavior';

var CreateItemsBox = function(scene?: any, itemCount?: any) {
    var itemsBox = scene.rexUI.add.sizer({
        orientation: 'y',
        space: {
            left: 5, right: 5, top: 5, bottom: 5,
            item: 5
        },
    })

    itemsBox.addBackground(
        scene.rexUI.add.roundRectangle({}),
        'background'
    )

    for (var i = 0; i < itemCount; i++) {
        itemsBox.add(
            CreateItem(scene, i.toString()),
            { proportion: 0, expand: true }
        )
    }

    AddDragDropItemBehavior(itemsBox);

    return itemsBox;
}

export default CreateItemsBox;