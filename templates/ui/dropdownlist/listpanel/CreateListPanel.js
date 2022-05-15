import Buttons from '../../buttons/Buttons.js';

var CreateListPanel = function (scene, parent) {
    var background;
    var createBackgroundCallback = parent.createBackgroundCallback;
    if (createBackgroundCallback) {
        background = createBackgroundCallback(scene);
        scene.add.existing(background);
    }

    var buttons = [];
    var createButtonCallback = parent.createButtonCallback;
    if (createButtonCallback) {
        var options = parent.options;
        for (var i = 0, cnt = options.length; i < cnt; i++) {
            var button = createButtonCallback(scene, options[i], i, options);
            scene.add.existing(button);
            buttons.push(button);
        }
    }

    var width = parent.listWidth;
    if (width === undefined) {
        if (parent.listAlignMode === 'text') {
            width = parent.getElement('text').width;
        } else {
            width = parent.width;
        }
    }
    var height = parent.listHeight;

    var listPanel = new Buttons(scene, {
        width: width, height: height,

        orientation: 'y',
        background: background,
        buttons: buttons,
    });
    scene.add.existing(listPanel);

    var onButtonOver = parent.onButtonOver;
    if (onButtonOver) {
        listPanel.on('button.over', onButtonOver);
    }

    var onButtonOut = parent.onButtonOut;
    if (onButtonOut) {
        listPanel.on('button.out', onButtonOut);
    }

    return listPanel;
}

export default CreateListPanel;