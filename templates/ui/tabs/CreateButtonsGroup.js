import Sizer from '../sizer/Sizer.js';

var CreateButtonsGroup = function(groupName, buttons, orientation, space) {
    var scene = this.scene;
    var buttonsSizer = new Sizer(scene, {
        orientation: orientation
    });

    var button;
    var padding = 0;
    for (var i = 0, cnt = buttons.length; i < cnt; i++) {
        button = buttons[i];
        if (i >= 1) {
            padding = {
                left: (orientation === 0) ? space : 0,
                right: 0,
                top: (orientation === 1) ? space : 0,
                bottom: 0
            }
        }

        buttonsSizer.add(buttons[i], 0, 'center', padding, true);
        // Add click callback
        button
            .setInteractive()
            .on('pointerdown', fireEvent('button.click', button, groupName, i), this)
            .on('pointerover', fireEvent('button.over', button, groupName, i), this)
            .on('pointerout', fireEvent('button.out', button, groupName, i), this)
    }
    return buttonsSizer;
}

var fireEvent = function (eventName, button, groupName, index) {
    return function () {
        this.emit(eventName, button, groupName, index);
    }
}

export default CreateButtonsGroup;