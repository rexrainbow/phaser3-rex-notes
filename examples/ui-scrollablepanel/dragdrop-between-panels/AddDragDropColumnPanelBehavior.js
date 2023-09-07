import { COLOR_LIGHT, COLOR_PRIMARY, COLOR_DARK } from './Const.js';

var AddDragDropColumnPanelBehavior = function (panelsBox) {
    // panelsBox is a Sizer

    var panels = panelsBox.getElement('items');
    for (var i = 0, cnt = panels.length; i < cnt; i++) {
        let panel = panels[i];  // panel is a Dialog
        let header = panel.getElement('title');
        header
            .setInteractive({ draggable: true })
            .on('dragstart', function (pointer, dragX, dragY) {
                panelsBox.remove(panel);

                panel.emit('dragstart', pointer, dragX, dragY); // See CreateColumnPanel.js
            })
            .on('drag', function (pointer, dragX, dragY) {
                // On dragging
                panel.x += (dragX - header.x);
                panel.y += (dragY - header.y);
            })
            .on('dragend', function (pointer, dragX, dragY, dropped) {
                panel.emit('dragend', pointer, dragX, dragY, dropped);  // See CreateColumnPanel.js

                // Item is placed to new position in panelsBox
                panelsBox.insertAtPosition(
                    pointer.x, pointer.y,
                    panel,
                    { expand: true }
                );
                ArrangePanels(panelsBox);
            })
    }
}

var ArrangePanels = function (panelsBox) {
    var panels = panelsBox.getElement('items');

    // Save current position    
    for (var i = 0, cnt = panels.length; i < cnt; i++) {
        var panel = panels[i];
        panel.setData({
            startX: panel.x,
            startY: panel.y
        });
    }

    // Layout from topmost ui
    panelsBox.getTopmostSizer().layout();

    // Move panel from start position to new position
    for (var i = 0, cnt = panels.length; i < cnt; i++) {
        var panel = panels[i];
        var fromX = panel.getData('startX'),
            fromY = panel.getData('startY');
        if ((panel.x !== fromX) || (panel.y !== fromY)) {
            panel.moveFrom({ x: fromX, y: fromY, speed: 300 })
        }
    }
}


export default AddDragDropColumnPanelBehavior;