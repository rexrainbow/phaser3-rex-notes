var ResetDisplayContent = function (config) {
    if (config === undefined) {
        config = {};
    } else if (typeof (config) === 'string') {
        config = {
            text: config,
        }
    }

    var text = config.text || '';
    this.setText(text);

    var iconGameObjct = this.childrenMap.icon;
    if (iconGameObjct) {
        if (config.icon === undefined) {
            this.hide(iconGameObjct);
        } else {
            this.show(iconGameObjct);
        }
        if (config.iconSize) {
            iconGameObjct.setDisplaySize(config.iconSize, config.iconSize);
        }
        this.setIconTexture(config.icon, config.iconFrame);
    }

    var actionGameObjct = this.childrenMap.action;
    if (actionGameObjct) {
        if (config.action === undefined) {
            this.hide(actionGameObjct);
        } else {
            this.show(actionGameObjct);
        }
        if (config.actionSize) {
            actionGameObjct.setDisplaySize(config.actionSize, config.actionSize);
        }
        this.setActionTexture(config.action, config.actionFrame);
    }

    return this;
}

export default ResetDisplayContent;