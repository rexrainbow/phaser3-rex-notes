import Label from '../../../label/Label.js';
import CreateText from './CreateText.js';

var CreateLabel = function (scene, config, styles, gameObject) {
    if (!gameObject) {
        var textStyle = styles.text || {};
        gameObject = new Label(scene, {
            text: CreateText(scene, {}, textStyle),
        });        
    }

    gameObject.setText(config.text);
    gameObject.setTexture(config.icon, config.iconFrame);

    return gameObject;
}

export default CreateLabel;