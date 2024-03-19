import GetNeighborObjects from './GetNeighborObjects.js';

var AddDragDropItemBehavior = function (itemsBox) {
    // itemsBox is a Sizer

    AddDropZone(itemsBox);

    var items = itemsBox.getElement('items');
    for (var i = 0, cnt = items.length; i < cnt; i++) {
        let item = items[i];
        item
            // Remove from current itemsBox
            .on('sizer.dragstart', function () {
                var neighbors = GetNeighborObjects(item);
                if (neighbors[0]) {
                    console.log('Above', neighbors[0].text);
                }
                if (neighbors[1]) {
                    console.log('Below', neighbors[1].text);
                }

                let previousItemsBox = item.getParentSizer();
                item.setData({
                    itemsBox: previousItemsBox,
                    index: previousItemsBox.getChildIndex(item)
                });
                previousItemsBox.remove(item);
            })
            // Insert back to previous itemsBox if not dropping on another itemsBox     
            .on('sizer.dragend', function (pointer, dragX, dragY, dropped) {
                if (dropped) { // Process 'drop' event
                    return;
                }

                var previousItemsBox = item.getData('itemsBox');
                previousItemsBox.insert(item.getData('index'), item, { expand: true });
                ArrangeItems(previousItemsBox);
            })
            .on('sizer.drop', function (pointer, dropZone) {
                var currentItemsBox = dropZone.getData('itemsBox'),
                    previousItemsBox = item.getData('itemsBox');

                // Item is placed to new position in current sizer
                currentItemsBox.insertAtPosition(
                    pointer.x, pointer.y,
                    item,
                    { expand: true }
                );

                ArrangeItems(previousItemsBox, currentItemsBox);
            });
    }

}

var AddDropZone = function (itemsBox) {
    // Set background as dropZone
    var background = itemsBox.getElement('background');
    background.setInteractive({ dropZone: true })
    background.setData('itemsBox', itemsBox);
}

var ArrangeItems = function (itemsBox0, itemsBox1) {
    var items = [];
    // Get all items from itemsBox0, itemsBox1)
    items.push(...itemsBox0.getElement('items'));
    if (itemsBox1 && (itemsBox0 !== itemsBox1)) {
        items.push(...itemsBox1.getElement('items'));
    }

    // Save current position
    for (var i = 0, cnt = items.length; i < cnt; i++) {
        var item = items[i];
        item.setData({ startX: item.x, startY: item.y });
    }

    // Layout from topmost ui
    itemsBox0.getTopmostSizer().layout();

    // Move item from start position to new position
    for (var i = 0, cnt = items.length; i < cnt; i++) {
        var item = items[i];
        var fromX = item.getData('startX'),
            fromY = item.getData('startY');
        if ((item.x !== fromX) || (item.y !== fromY)) {
            item.moveFrom({ x: fromX, y: fromY, speed: 300 })
        }
    }
}


export default AddDragDropItemBehavior;