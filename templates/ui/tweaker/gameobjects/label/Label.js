import LabelBase from '../../../label/Label.js';
import DeepClone from '../../../../../plugins/utils/object/DeepClone.js';
import CreateRoundRectangle from '../utils/CreateRoundRectangle.js';
import CreateText from '../utils/CreateText.js';
import CreateImage from '../utils/CreateImage.js';

class Label extends LabelBase {
    constructor(scene, config) {
        config = DeepClone(config);

        var backgroundStyle = config.background || {};
        config.background = CreateRoundRectangle(scene, undefined, backgroundStyle);

        var textStyle = config.text || {};
        config.text = CreateText(scene, undefined, textStyle);

        var iconStyle = config.icon || {};
        config.icon = CreateImage(scene, undefined, iconStyle);

        var actionStyle = config.action || {};
        config.action = CreateImage(scene, undefined, actionStyle);

        super(scene, config);
    }

    resetFromJSON(o) {
        if (o === undefined) {
            o = {};
        }

        var text = o.text || '';
        this.setText(text);

        var iconGameObjct = this.childrenMap.icon;
        iconGameObjct.setTexture(o.icon, o.iconFrame);

        if (o.iconSize) {
            iconGameObjct.setDisplaySize(o.iconSize, o.iconSize);
        }

        if (o.icon === undefined) {
            this.hide(iconGameObjct);
        } else {
            this.show(iconGameObjct);
        }

        var actionGameObjct = this.childrenMap.action;
        actionGameObjct.setTexture(o.action, o.actionFrame);

        if (o.iconSize) {
            actionGameObjct.setDisplaySize(o.actionSize, o.actionSize);
        }

        if (o.action === undefined) {
            this.hide(actionGameObjct);
        } else {
            this.show(actionGameObjct);
        }

        return this;
    }
}

export default Label;