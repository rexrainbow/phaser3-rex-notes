import Label from '../../../label/Label.js';

class Title extends Label {
    constructor(scene, config) {
        super(scene, config);
        this.type = 'rexTweaker.Title';
    }

    setTitle(config) {
        if (config === undefined) {
            config = {};
        }

        var text = config.text || config.title || '';
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

export default Title;