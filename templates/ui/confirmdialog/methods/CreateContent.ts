import CreateLabel from '../../utils/build/CreateLabel';
import CreateTextArea from '../../utils/build/CreateTextArea'

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

var CreateContent = function(scene?: any, config?: any, creators?: any) {
    var type = GetValue(config, '$type');
    if (type === undefined) {
        if (config &&
            (config.hasOwnProperty('slider') || config.hasOwnProperty('scroller'))
        ) {
            type = 'textarea';
        }
    }


    var gameObject;
    switch (type?: any) {
        case 'textarea':
            gameObject = new CreateTextArea(scene, config, creators);
            break;

        default:
            gameObject = new CreateLabel(scene, config, creators);
            break;
    }

    scene.add.existing(gameObject);
    return gameObject;
}

export default CreateContent;