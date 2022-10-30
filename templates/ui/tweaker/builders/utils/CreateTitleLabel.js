import TitleLabel from '../../gameobjects/title/Title.js'
import CreateRoundRectangle from './CreateRoundRectangle.js';
import CreateText from './CreateText.js';
import CreateImage from './CreateImage.js';

var CreateTitleLabel = function (scene, config, style, gameObject) {
    if (!gameObject) {
        var backgroundStyle = style.background || {};
        var textStyle = style.text || {};
        var iconStyle = style.icon || {};
        gameObject = new TitleLabel(scene, {
            ...style,

            // Create game objects from config
            background: CreateRoundRectangle(scene, undefined, backgroundStyle),
            text: CreateText(scene, undefined, textStyle),
            icon: CreateImage(scene, undefined, iconStyle),
        });

        scene.add.existing(gameObject);
    }

    return gameObject;
}

export default CreateTitleLabel;