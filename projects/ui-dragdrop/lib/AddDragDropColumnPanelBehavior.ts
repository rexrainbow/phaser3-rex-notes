import { COLOR_LIGHT, COLOR_MAIN, COLOR_DARK } from './Const';

var AddDragDropColumnPanelBehavior = function(panelsBox?: any) {
    // panelsBox is a Sizer
    var panels = panelsBox.getElement('items');
    for (var i = 0, cnt = panels.length; i < cnt; i++) {
        let panel = panels[i];
        panel
            // Remove from panelsBox
            .on('sizer.dragstart', function(pointer?: any, dragX?: any, dragY?: any) {
                panelsBox.remove(panel);
                panel.layout();     // Layout to min size
            })
            // Insert to panelsBox
            .on('sizer.dragend', function(pointer?: any, dragX?: any, dragY?: any, dropped?: any) {
                panelsBox.insertAtPosition(
                    pointer.x, pointer.y,
                    panel,
                    { expand: true }
                );
                ArrangePanels(panelsBox);
            })
    }
}

var ArrangePanels = function(panelsBox?: any) {
    var panels = panelsBox.getElement('items');

    // Save current position    
    for (var i = 0, cnt = panels.length; i < cnt; i++) {
        var panel = panels[i];
        panel.setData({ startX: panel.x, startY: panel.y });
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