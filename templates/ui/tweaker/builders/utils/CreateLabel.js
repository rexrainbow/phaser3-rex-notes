import Label from '../../../label/Label.js';
import CreateRoundRectangle from './CreateRoundRectangle.js';
import CreateText from './CreateText.js';
import CreateImage from './CreateImage.js';


var CreateLabel = function (scene, config, styles, gameObject) {
    if (!gameObject) {
        gameObject = new Label(scene, {
            ...styles,

            // Create game objects from config
            background: CreateRoundRectangle(scene, undefined, (styles.background || {})),
            text: CreateText(scene, undefined, (styles.text || {})),
            icon: CreateImage(scene, undefined, (styles.icon || {})),
        });
    }

    gameObject.setText(config.text);

    var iconGameObjct = gameObject.getElement('icon');
    if (iconGameObjct) {
        if (config.icon === undefined) {
            gameObject.hide(iconGameObjct);
        } else {
            gameObject.show(iconGameObjct);
            iconGameObjct.setTexture(config.icon, config.iconFrame);
        }
    }

    return gameObject;
}

export default CreateLabel;