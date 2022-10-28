import Label from '../../../label/Label.js';
import CreateRoundRectangle from './CreateRoundRectangle.js';
import CreateText from './CreateText.js';
import CreateImage from './CreateImage.js';


var CreateTitleLabel = function (scene, config, styles, gameObject) {
    if (!gameObject) {
        gameObject = new TitleLabel(scene, {
            ...styles,

            // Create game objects from config
            background: CreateRoundRectangle(scene, undefined, (styles.background || {})),
            text: CreateText(scene, undefined, (styles.text || {})),
            icon: CreateImage(scene, undefined, (styles.icon || {})),
        });

        scene.add.existing(gameObject);
    }

    gameObject.setTitle(config);

    return gameObject;
}

class TitleLabel extends Label {
    constructor(scene, config) {
        super(scene, config);
        this.type = 'rexTweaker.TitleLabel';
    }

    setTitle(config) {
        if (config === undefined) {
            config = {};
        }

        var text = config.text || config.title;
        this.setText(text);

        var iconGameObjct = this.childrenMap.icon;
        iconGameObjct.setTexture(config.icon, config.iconFrame);

        if (config.iconSize) {
            iconGameObjct.setDisplaySize(config.iconSize, config.iconSize);
        }

        if (config.icon === undefined) {
            this.hide(iconGameObjct);
        } else {
            this.show(iconGameObjct);
        }

        return this;
    }
}

export default CreateTitleLabel;