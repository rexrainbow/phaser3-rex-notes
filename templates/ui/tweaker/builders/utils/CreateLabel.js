import Label from '../../../label/Label.js';
import CreateRoundRectangle from './CreateRoundRectangle.js';
import CreateText from './CreateText.js';
import CreateImage from './CreateImage.js';


var CreateLabel = function (scene, config, styles, gameObject) {
    if (!gameObject) {
        var textStyle = styles.text || {};
        var backgroundStyle = styles.background || {};
        var imageStyle = styles.icon || {};
        gameObject = new Label(scene, {
            background: CreateRoundRectangle(scene, undefined, backgroundStyle),
            text: CreateText(scene, undefined, textStyle),
            icon: CreateImage(scene, undefined, imageStyle)
        });
    }

    gameObject.setText(config.text);

    var iconGameObjct = gameObject.getElement('icon');
    if (iconGameObjct) {
        if (config.icon === undefined) {
            gameObject.hide(iconGameObjct);
        } else {
            gameObject
                .show(iconGameObjct)
                .setTexture(config.icon, config.iconFrame);
        }
    }

    return gameObject;
}

export default CreateLabel;