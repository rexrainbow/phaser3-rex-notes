import Sizer from '../sizer/Sizer.js';
import ButtonSetInteractive from '../utils/ButtonSetInteractive.js';

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
        ButtonSetInteractive.call(this, button, groupName, i);
    }
    return buttonsSizer;
}

export default CreateButtonsGroup;